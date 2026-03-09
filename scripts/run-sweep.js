#!/usr/bin/env node
/**
 * RIDGE SCOUT — Automated Sweep + Dossier Engine
 * Runs Mon/Wed/Fri at 8am via GitHub Actions
 * Reads config from data/config.json
 * Writes HTML reports to reports/
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ── Config ─────────────────────────────────────────────────────────────────
const CONFIG_PATH = path.join(__dirname, '..', 'data', 'config.json');
const REPORTS_DIR = path.join(__dirname, '..', 'reports');
const INDEX_PATH  = path.join(REPORTS_DIR, 'index.html');

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) { console.error('ERROR: ANTHROPIC_API_KEY not set'); process.exit(1); }

// Ensure reports dir exists
if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });

const RUN_DATE = new Date();
const DATE_STR = RUN_DATE.toISOString().split('T')[0]; // e.g. 2026-03-09
const TIME_STR = RUN_DATE.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York' });

// ── Claude API helper ───────────────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function callClaude(system, userPrompt, maxTokens = 4000, useSearch = true, retries = 5) {
  const tools = useSearch ? [{ type: 'web_search_20250305', name: 'web_search' }] : [];
  const body = JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: userPrompt }],
    ...(useSearch ? { tools } : {})
  });

  for (let attempt = 1; attempt <= retries; attempt++) {
    const result = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-beta': 'web-search-2025-03-05',
          'Content-Length': Buffer.byteLength(body)
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              if (parsed.error.type === 'rate_limit_error') {
                resolve({ rateLimited: true, message: parsed.error.message });
              } else {
                reject(new Error(parsed.error.message));
              }
            } else {
              const text = parsed.content
                .filter(b => b.type === 'text')
                .map(b => b.text)
                .join('\n');
              resolve({ ok: true, text });
            }
          } catch(e) { reject(e); }
        });
      });
      req.on('error', reject);
      req.write(body);
      req.end();
    });

    if (result.ok) return result.text;

    if (result.rateLimited) {
      const waitSec = attempt * 65; // 65s, 130s, 195s ... — clears the 1-min token window
      console.log(`  ⏳ Rate limited (attempt ${attempt}/${retries}). Waiting ${waitSec}s before retry...`);
      await sleep(waitSec * 1000);
    }
  }
  throw new Error('Rate limit exceeded after ' + retries + ' retries.');
}

// ── System prompts ──────────────────────────────────────────────────────────
const SCOUT_SYS = `You are SCOUT, RIDGE's dedicated deal sourcing engine. Precise, signal-driven, direct. No filler — every output is actionable.

RIDGE parameters: $10M–$70M, industrial/flex focus, Southeast US, 7.5–8.0% YOC at Year 3/4.
Drop criteria: Institutional owner | Listed in last 90 days | Under 15,000 SF | Hold under 4 years | Sale within 24 months.

Format in clean markdown. ## for major sections, ### for subsections. Tables for structured data.
At the end of your output, include a JSON block tagged exactly like this:
\`\`\`targets
[{"address":"123 Main St, Atlanta, GA","name":"Property Name","conviction":"High Conviction","signal":"reason"},...]
\`\`\`
Only include High Conviction targets with enough info to run a full dossier. Max ${config.sweep.max_targets_per_submarket} per submarket.`;

const DOSSIER_SYS = `You are SCOUT, RIDGE's full deal research engine. Produce a thorough, IC-ready Property Dossier.

RIDGE investment profile: $10M–$70M, industrial/flex, Southeast US, target 7.5–8.0% YOC at Year 3/4, 12–16% levered IRR, 5-year hold.

Format in clean markdown. ## for major sections. Tables for structured data. Be direct and specific.`;

// ── Markdown → HTML ─────────────────────────────────────────────────────────
function mdToHTML(md) {
  let h = md
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/**(.+?)**/g, '<strong>$1</strong>')
    .replace(/*(.+?)*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^---$/gm, '<hr>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>');

  // Tables
  h = h.replace(/((?:|.+|\n?)+)/g, match => {
    const rows = match.trim().split('\n').filter(r => r.trim() && !r.match(/^|[-| :]+|$/));
    if (!rows.length) return match;
    const mkRow = (r, tag) => '<tr>' + r.split('|').filter((_, i, a) => i > 0 && i < a.length - 1)
      .map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
    return '<table><thead>' + mkRow(rows[0], 'th') + '</thead><tbody>' +
      rows.slice(1).map(r => mkRow(r, 'td')).join('') + '</tbody></table>';
  });

  h = h.split('\n').map(line => {
    if (line.match(/^<[h1-6uoltbphr/]/) || !line.trim()) return line;
    return '<p>' + line + '</p>';
  }).join('\n');

  return h;
}

// ── HTML report builder ─────────────────────────────────────────────────────
function buildReportHTML(title, sweepSubmarket, sweepMD, dossiers) {
  const CSS = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--bg:#fff;--surface:#f6f8fa;--border:#d0d7de;--accent:#1a3a6b;--gold:#c8a832;--text:#1f2328;--muted:#636c76;--green:#1a7f37;--red:#cf222e;--r:8px}
    body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13pt;line-height:1.65;max-width:1100px;margin:0 auto;padding:0 24px 60px}
    @media print{body{max-width:100%;padding:0 12px} .no-print{display:none!important} @page{size:letter;margin:.6in}}
    .cover{background:var(--accent);color:#fff;padding:36px 40px 28px;margin:0 -24px 32px;border-bottom:4px solid var(--gold)}
    .cover-logo{display:flex;align-items:center;gap:12px;margin-bottom:18px}
    .logo-mark{width:34px;height:34px;background:var(--gold);border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:15px;color:#000}
    .cover h1{font-size:24px;font-weight:700;margin-bottom:6px}
    .cover .meta{font-size:12px;opacity:.7;display:flex;gap:18px;flex-wrap:wrap;margin-top:10px}
    .toc{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:20px 24px;margin-bottom:32px}
    .toc h3{font-size:12px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--muted);margin-bottom:12px}
    .toc a{display:block;font-size:13px;color:var(--accent);text-decoration:none;padding:4px 0;border-bottom:1px solid var(--border)}
    .toc a:last-child{border-bottom:none}
    .toc a:hover{text-decoration:underline}
    .section-block{margin-bottom:40px;padding-bottom:32px;border-bottom:2px solid var(--border)}
    .section-block:last-child{border-bottom:none}
    .section-label{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
    h1{font-size:20px;font-weight:700;color:var(--accent);margin:0 0 16px;border-bottom:2px solid var(--accent);padding-bottom:8px}
    h2{font-size:15px;font-weight:700;color:var(--accent);margin:22px 0 8px;border-bottom:1px solid var(--border);padding-bottom:5px}
    h3{font-size:13px;font-weight:700;color:var(--red);margin:16px 0 5px}
    h4{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin:12px 0 4px}
    p{margin:0 0 10px}ul,ol{margin:0 0 10px 18px}li{margin-bottom:3px}
    strong{font-weight:700}em{color:var(--muted)}
    code{background:#f0f0f0;border:1px solid var(--border);border-radius:3px;padding:1px 5px;font-size:11px;font-family:monospace}
    blockquote{border-left:3px solid var(--gold);padding-left:12px;margin:10px 0;color:var(--muted);font-style:italic}
    hr{border:none;border-top:1px solid var(--border);margin:18px 0}
    table{width:100%;border-collapse:collapse;margin:12px 0;font-size:11.5px}
    th{background:var(--accent);color:#fff;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;padding:8px 10px;text-align:left;border:1px solid var(--accent)}
    td{padding:7px 10px;border:1px solid var(--border);vertical-align:top}
    tr:nth-child(even) td{background:var(--surface)}
    .target-card{background:var(--surface);border:1px solid var(--border);border-left:4px solid var(--gold);border-radius:var(--r);padding:16px 20px;margin-bottom:12px}
    .target-card .tc-name{font-weight:700;font-size:14px;margin-bottom:4px}
    .target-card .tc-signal{font-size:12px;color:var(--muted)}
    .target-card .tc-badge{display:inline-block;background:var(--green);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;letter-spacing:.5px;text-transform:uppercase;margin-left:8px}
    .dossier-header{background:linear-gradient(135deg,var(--accent),#2a5298);color:#fff;padding:20px 24px;border-radius:var(--r);margin-bottom:20px}
    .dossier-header h2{color:#fff;border-color:rgba(255,255,255,.3);font-size:16px}
    .disclaimer{background:#fff8e1;border:1px solid #f0c040;border-radius:var(--r);padding:12px 16px;font-size:11px;color:#856404;margin-bottom:20px}
    .print-btn{position:fixed;bottom:24px;right:24px;background:var(--accent);color:#fff;border:none;border-radius:8px;padding:12px 20px;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.2);z-index:999}
    .print-btn:hover{background:#2a5298}
    footer{margin-top:40px;padding-top:16px;border-top:2px solid var(--border);display:flex;justify-content:space-between;font-size:10px;color:var(--muted)}
  `;

  const tocItems = [
    `<a href="#sweep">SCOUT Sweep — ${sweepSubmarket}</a>`,
    ...dossiers.map((d, i) => `<a href="#dossier-${i}">Dossier: ${d.name}</a>`)
  ].join('');

  const targetCards = dossiers.map(d =>
    `<div class="target-card">
      <div class="tc-name">${d.address} <span class="tc-badge">High Conviction</span></div>
      <div class="tc-signal">${d.signal}</div>
    </div>`
  ).join('');

  const sweepSection = `
    <div class="section-block" id="sweep">
      <div class="section-label">SCOUT Sweep</div>
      <div>${mdToHTML(sweepMD.replace(/```targets[sS]*?```/g, ''))}</div>
      ${dossiers.length ? '<h2>High Conviction Targets Selected for Dossier</h2>' + targetCards : ''}
    </div>`;

  const dossierSections = dossiers.map((d, i) => `
    <div class="section-block" id="dossier-${i}">
      <div class="section-label">Property Dossier ${i + 1} of ${dossiers.length}</div>
      <div class="dossier-header"><h2>${d.address}</h2></div>
      <div class="disclaimer">⚠️ This dossier is AI-generated for internal sourcing purposes. Verify all data independently before making investment decisions.</div>
      <div>${mdToHTML(d.markdown)}</div>
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>${CSS}</style>
</head>
<body>
<div class="cover">
  <div class="cover-logo"><div class="logo-mark">R</div><span style="font-size:18px;font-weight:700">RIDGE</span></div>
  <h1>${title}</h1>
  <div class="meta">
    <span>📅 ${DATE_STR}</span>
    <span>🕗 ${TIME_STR} ET</span>
    <span>📍 ${sweepSubmarket}</span>
    <span>📋 ${dossiers.length} High Conviction Target${dossiers.length !== 1 ? 's' : ''}</span>
  </div>
</div>
<div class="toc"><h3>Contents</h3>${tocItems}</div>
${sweepSection}
${dossierSections}
<footer>
  <span>RIDGE / SCOUT — Confidential, Internal Use Only</span>
  <span>Generated ${RUN_DATE.toLocaleString()}</span>
</footer>
<button class="print-btn no-print" onclick="window.print()">🖨️ Print / Save PDF</button>
</body>
</html>`;
}

// ── Parse targets from SCOUT output ─────────────────────────────────────────
function parseTargets(sweepOutput) {
  const match = sweepOutput.match(/```targets\n([\s\S]*?)```/);
  if (!match) return [];
  try {
    return JSON.parse(match[1]);
  } catch(e) {
    console.warn('Could not parse targets JSON:', e.message);
    return [];
  }
}

// ── Update reports index ─────────────────────────────────────────────────────
function updateReportsIndex() {
  const files = fs.readdirSync(REPORTS_DIR)
    .filter(f => f.endsWith('.html') && f !== 'index.html')
    .sort().reverse();

  const rows = files.map(f => {
    const parts = f.replace('.html','').split('_');
    const date = parts[2] || '';
    const sub = parts.slice(3).join(' ').replace(/-/g,' ');
    return `<tr><td><a href="${f}">${f}</a></td><td>${date}</td><td>${sub}</td></tr>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>RIDGE Reports</title>
<style>body{font-family:-apple-system,sans-serif;max-width:900px;margin:40px auto;padding:0 24px;background:#0d1117;color:#e6edf3}
h1{color:#e8c84a;margin-bottom:24px}.logo{display:inline-flex;align-items:center;gap:10px;margin-bottom:8px}
.lm{width:28px;height:28px;background:#e8c84a;border-radius:5px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;color:#000}
table{width:100%;border-collapse:collapse;margin-top:16px}th{background:#1c2330;color:#7d8590;font-size:11px;letter-spacing:.5px;text-transform:uppercase;padding:10px 12px;text-align:left;border-bottom:1px solid #2a3441}
td{padding:10px 12px;border-bottom:1px solid #1c2330;font-size:13px}a{color:#e8c84a;text-decoration:none}a:hover{text-decoration:underline}
.empty{color:#7d8590;padding:40px 0;text-align:center}footer{margin-top:32px;font-size:11px;color:#4a5568;text-align:center}</style>
</head><body>
<div class="logo"><div class="lm">R</div><span style="font-size:16px;font-weight:700">RIDGE</span></div>
<h1>SCOUT Reports</h1>
<table><thead><tr><th>Report File</th><th>Date</th><th>Submarket</th></tr></thead>
<tbody>${rows || '<tr><td colspan="3" class="empty">No reports yet — next run scheduled Mon/Wed/Fri at 8am ET</td></tr>'}</tbody></table>
<footer>RIDGE / SCOUT — Confidential, Internal Use Only · Auto-generated</footer>
</body></html>`;

  fs.writeFileSync(INDEX_PATH, html, 'utf8');
  console.log('Updated reports/index.html');
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const { submarkets, asset_types, deal_size, building_size, priority_signal, max_targets_per_submarket } = config.sweep;

  let allReportFiles = [];

  for (let si = 0; si < submarkets.length; si++) {
    const submarket = submarkets[si];
    if (si > 0) {
      console.log('  ⏳ Pausing 70s between submarkets to respect rate limits...');
      await sleep(70000);
    }
    console.log(`\n━━━ SCOUT SWEEP: ${submarket} (${si+1}/${submarkets.length}) ━━━`);

    // ── Step 1: Sweep ──────────────────────────────────────────────────────
    const sweepPrompt = `Run a SCOUT Submarket Sweep for RIDGE.
Target Submarket: ${submarket}
Asset Types: ${asset_types.join(', ')}
Deal Size: ${deal_size}
Building Size Filter: ${building_size}
Priority Signal: ${priority_signal}
Date: ${DATE_STR}

Execute the full 6-step research sequence:
1. Submarket calibration — vacancy, avg asking rent by class, 24-month trend
2. Property identification — buildings with elevated vacancy or stress signals
3. Ownership screening — entity, acquisition date, hold period; drop institutional owners
4. Debt signal screen — loan vintage, lender type, maturity, CMBS/bridge flags
5. Physical signal check — permit history, capex behavior
6. Rank and output — Prospect Table by signal count with conviction ratings

Output the full Prospect Table. Flag top targets with one-line rationale.
Then output the targets JSON block as instructed.`;

    let sweepOutput;
    try {
      sweepOutput = await callClaude(SCOUT_SYS, sweepPrompt, 4000, true);
      console.log(`  ✓ Sweep complete (${sweepOutput.length} chars)`);
    } catch(e) {
      console.error(`  ✗ Sweep failed: ${e.message}`);
      continue;
    }

    // ── Step 2: Parse targets ──────────────────────────────────────────────
    const targets = parseTargets(sweepOutput);
    console.log(`  → ${targets.length} High Conviction target(s) found`);

    // ── Step 3: Dossier each target ────────────────────────────────────────
    const dossiers = [];
    for (const target of targets.slice(0, max_targets_per_submarket)) {
      console.log(`  ┌ Dossier: ${target.address}`);
      const dossierPrompt = `Run a full SCOUT Property Dossier for RIDGE.

PROPERTY: ${target.address}
ASSET TYPE: ${asset_types.join(' / ')}
KNOWN INTEL: ${target.signal}
DATE: ${DATE_STR}

## 1 — Owner Intelligence
## 2 — Debt Profile
## 3 — Submarket Context & Trends
## 4 — Comparable Sales & Pricing
## 5 — Tenant & Rent Roll
## 6 — Competitive Supply Pipeline
## 7 — Physical Asset Intel
## 8 — Basis Reconstruction & Opening Angle
---
## SCOUT Summary
Overall SCOUT Signal Rating and RIDGE Recommended Next Step.`;

      try {
        const dossierMD = await callClaude(DOSSIER_SYS, dossierPrompt, 6000, true);
        dossiers.push({ ...target, name: target.name || target.address, markdown: dossierMD });
        console.log(`  └ ✓ Dossier complete (${dossierMD.length} chars)`);
      } catch(e) {
        console.error(`  └ ✗ Dossier failed: ${e.message}`);
      }
    }

    // ── Step 4: Build HTML report ──────────────────────────────────────────
    const safeSubmarket = submarket.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const filename = `RIDGE-SCOUT_${DATE_STR}_${safeSubmarket}.html`;
    const reportPath = path.join(REPORTS_DIR, filename);
    const title = `SCOUT Report — ${submarket} — ${DATE_STR}`;
    const html = buildReportHTML(title, submarket, sweepOutput, dossiers);

    fs.writeFileSync(reportPath, html, 'utf8');
    console.log(`  ✓ Report saved: reports/${filename}`);
    allReportFiles.push(filename);
  }

  // ── Step 5: Update index ──────────────────────────────────────────────────
  updateReportsIndex();

  console.log(`\n✅ RIDGE SCOUT run complete. ${allReportFiles.length} report(s) generated.`);
  console.log('Reports:', allReportFiles.join(', '));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
