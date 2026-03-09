[ridge_deal_tools (2).html](https://github.com/user-attachments/files/25854067/ridge_deal_tools.2.html)
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ridge — Deal Tools</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0d1117;--surface:#161b22;--surface2:#1c2330;--border:#2a3441;
  --accent:#e8c84a;--accent-dim:rgba(232,200,74,0.12);
  --text:#e6edf3;--muted:#7d8590;--dim:#4a5568;
  --green:#3fb950;--red:#f85149;--r:8px;
}
body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;min-height:100vh;display:flex;flex-direction:column}
header{border-bottom:1px solid var(--border);padding:0 32px;height:56px;display:flex;align-items:center;justify-content:space-between;background:var(--bg);position:sticky;top:0;z-index:100}
.logo{display:flex;align-items:center;gap:10px}
.logo-mark{width:28px;height:28px;background:var(--accent);border-radius:5px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;color:#000}
.logo-text{font-size:15px;font-weight:600}
.hdr-right{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:6px}
.dot{width:6px;height:6px;border-radius:50%;background:var(--green);display:inline-block}
main{flex:1;display:flex;flex-direction:column;align-items:center;padding:40px 24px 80px}

#home{width:100%;max-width:1060px}
.hero{text-align:center;margin-bottom:40px}
.hero h1{font-size:30px;font-weight:700;letter-spacing:-.5px;margin-bottom:10px}
.hero h1 span{color:var(--accent)}
.hero p{font-size:14px;color:var(--muted);max-width:460px;margin:0 auto;line-height:1.6}
.cards{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:24px 20px;cursor:pointer;transition:all .15s;position:relative;overflow:hidden}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--accent);opacity:0;transition:opacity .15s}
.card:hover{border-color:var(--accent);background:var(--surface2)}
.card:hover::before{opacity:1}
.c-icon{font-size:22px;margin-bottom:12px}
.c-name{font-size:14px;font-weight:700;margin-bottom:4px}
.c-sub{font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--accent);margin-bottom:10px}
.c-desc{font-size:12px;color:var(--muted);line-height:1.6}
.c-badge{display:inline-block;margin-top:12px;font-size:10px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;color:var(--accent);background:var(--accent-dim);padding:2px 8px;border-radius:4px}

.panel{width:100%;max-width:780px;display:none}
#results-panel{width:100%;max-width:960px;display:none}

.ph{display:flex;align-items:flex-start;gap:12px;margin-bottom:24px}
.back{background:none;border:1px solid var(--border);color:var(--muted);border-radius:6px;padding:6px 12px;font-size:12px;cursor:pointer;transition:all .15s;white-space:nowrap;margin-top:2px}
.back:hover{border-color:var(--muted);color:var(--text)}
.pt{font-size:20px;font-weight:700}
.ps{font-size:13px;color:var(--muted);margin-top:3px;line-height:1.5}
.tag{font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--accent);margin-left:8px}
.fc{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:26px;margin-bottom:14px}
.fr{margin-bottom:16px}.fr:last-child{margin-bottom:0}
.fg{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.fg3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
label{display:block;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);margin-bottom:7px}
input,select,textarea{width:100%;background:var(--bg);border:1px solid var(--border);border-radius:6px;color:var(--text);font-size:14px;padding:9px 13px;outline:none;transition:border-color .15s;font-family:inherit}
input:focus,select:focus,textarea:focus{border-color:var(--accent)}
textarea{resize:vertical;min-height:90px}
select option{background:var(--surface)}
.upload-zone{border:1px dashed var(--border);border-radius:6px;padding:12px 16px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:border-color .15s;margin-bottom:10px}
.upload-zone:hover{border-color:var(--accent)}
.uz-label{font-size:13px;color:var(--muted)}
.uz-sub{font-size:11px;color:var(--dim);margin-top:2px}
.run-btn{width:100%;background:var(--accent);color:#000;border:none;border-radius:6px;padding:13px 24px;font-size:14px;font-weight:700;cursor:pointer;letter-spacing:.3px;transition:all .15s;display:flex;align-items:center;justify-content:center;gap:8px}
.run-btn:hover{background:#f0d060;transform:translateY(-1px)}

/* ISR editable pros/cons */
.isr-pc-row{display:flex;gap:8px;align-items:flex-start;margin-bottom:8px}
.isr-pc-row input{flex:1}
.isr-pc-row .pc-comment{flex:1.2}
.isr-del{background:none;border:1px solid var(--border);color:var(--muted);border-radius:5px;padding:4px 8px;font-size:12px;cursor:pointer;white-space:nowrap;margin-top:0;flex-shrink:0}
.isr-del:hover{border-color:var(--red);color:var(--red)}
.isr-add{background:none;border:1px dashed var(--border);color:var(--muted);border-radius:5px;padding:6px 14px;font-size:12px;cursor:pointer;width:100%;margin-top:4px;transition:all .15s}
.isr-add:hover{border-color:var(--accent);color:var(--accent)}
.pc-label-row{display:grid;grid-template-columns:1fr 1fr 36px;gap:8px;margin-bottom:4px}
.pc-col-lbl{font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--dim)}

.rh{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;gap:12px;flex-wrap:wrap}
.rm{display:flex;align-items:center;gap:10px}
.rt{font-size:14px;font-weight:600}
.ra{display:flex;gap:8px}
.abtn{background:var(--surface);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:7px 14px;font-size:12px;font-weight:500;cursor:pointer;transition:all .15s}
.abtn:hover{border-color:var(--accent);color:var(--accent)}
.abtn.accent-btn{background:var(--accent);color:#000;border-color:var(--accent);font-weight:700}
.abtn.accent-btn:hover{background:#f0d060;color:#000}
.rc{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:28px 32px}
.lw{padding:56px 32px;text-align:center}
.spinner{width:34px;height:34px;border:2px solid var(--border);border-top-color:var(--accent);border-radius:50%;animation:spin .8s linear infinite;margin:0 auto 18px}
@keyframes spin{to{transform:rotate(360deg)}}
.ll{font-size:14px;color:var(--muted);margin-bottom:20px}
.ls{text-align:left;max-width:340px;margin:0 auto}
.lstep{font-size:12px;color:var(--dim);padding:5px 0;display:flex;align-items:center;gap:8px;transition:color .3s}
.lstep.active{color:var(--accent)}.lstep.done{color:var(--green)}
.si{font-size:11px;width:14px;flex-shrink:0}

.out{line-height:1.75;font-size:14px}
.out h1{font-size:21px;font-weight:700;margin:0 0 18px;color:var(--accent)}
.out h2{font-size:15px;font-weight:700;margin:26px 0 10px;color:var(--text);border-bottom:1px solid var(--border);padding-bottom:7px}
.out h3{font-size:13px;font-weight:700;margin:18px 0 7px;color:var(--accent)}
.out h4{font-size:12px;font-weight:700;margin:14px 0 5px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px}
.out p{margin:0 0 10px}
.out ul,.out ol{margin:0 0 10px 20px}
.out li{margin-bottom:4px}
.out strong{font-weight:700}.out em{color:var(--muted)}
.out hr{border:none;border-top:1px solid var(--border);margin:22px 0}
.out table{width:100%;border-collapse:collapse;margin:14px 0;font-size:12.5px}
.out th{background:var(--surface2);color:var(--muted);font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;padding:9px 11px;text-align:left;border:1px solid var(--border)}
.out td{padding:8px 11px;border:1px solid var(--border);vertical-align:top}
.out tr:nth-child(even) td{background:rgba(255,255,255,.025)}
.out code{background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:1px 6px;font-size:12px;font-family:monospace;color:var(--accent)}
.out blockquote{border-left:3px solid var(--accent);padding-left:14px;margin:10px 0;color:var(--muted);font-style:italic}
.out .sev-high{color:var(--red);font-weight:700}
.out .sev-med{color:#f0a500;font-weight:700}
.out .sev-low{color:var(--green);font-weight:700}
/* ISR result editable overlay */
.isr-edit-bar{background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:12px 18px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;font-size:13px}
.isr-edit-hint{color:var(--muted);font-size:12px}
.isr-section{margin-bottom:20px}
.isr-pros-cons{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:14px 0}
.isr-col{background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:16px}
.isr-col-title{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px}
.isr-col-title.pro{color:var(--green)}
.isr-col-title.con{color:var(--red)}
.isr-item{margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid var(--border)}
.isr-item:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.isr-item-text{font-size:13px;font-weight:600;margin-bottom:4px}
.isr-item-comment{font-size:12px;color:var(--muted);font-style:italic}
.isr-item-comment:empty::before{content:'No comment added';color:var(--dim)}
.edit-field{background:var(--bg);border:1px solid var(--border);border-radius:4px;color:var(--text);font-size:13px;padding:5px 8px;width:100%;outline:none;font-family:inherit}
.edit-field:focus{border-color:var(--accent)}
.disclaimer-box{background:rgba(232,200,74,.08);border:1px solid rgba(232,200,74,.3);border-radius:var(--r);padding:14px 18px;margin-bottom:20px;font-size:12px;color:var(--muted);line-height:1.6}
.err{background:rgba(248,81,73,.08);border:1px solid rgba(248,81,73,.25);border-radius:var(--r);padding:18px 22px;color:var(--red);font-size:14px}
#map-frame{width:100%;height:520px;border:none;border-radius:var(--r)}
@media(max-width:900px){.cards{grid-template-columns:repeat(3,1fr)}}
@media(max-width:768px){.cards{grid-template-columns:repeat(2,1fr)}.fg{grid-template-columns:1fr}.fg3{grid-template-columns:1fr 1fr}main{padding:24px 16px 60px}}
@media(max-width:480px){.cards{grid-template-columns:1fr}.fg3{grid-template-columns:1fr}}
</style>
</head>
<body>
<header>
  <div class="logo">
    <div class="logo-mark">R</div>
    <span class="logo-text">RIDGE</span>
  </div>
  <div class="hdr-right"><span class="dot"></span> AI Tools Active</div>
</header>
<main>

  <!-- HOME -->
  <div id="home">
    <div class="hero">
      <h1>Ridge <span>Deal Tools</span></h1>
      <p>AI-powered sourcing, market research, comp analysis, and legal review — built for how Ridge works.</p>
    </div>
    <div class="cards">
      <div class="card" onclick="showPanel('sweep')">
        <div class="c-icon">🗺️</div>
        <div class="c-name">Submarket Sweep</div>
        <div class="c-sub">SCOUT</div>
        <div class="c-desc">Ranked prospect list for a target submarket. Screens debt stress, vacancy signals, and motivated ownership profiles.</div>
        <div class="c-badge">10–50 Properties</div>
      </div>
      <div class="card" onclick="showPanel('dossier')">
        <div class="c-icon">📋</div>
        <div class="c-name">Property Dossier</div>
        <div class="c-sub">SCOUT</div>
        <div class="c-desc">Full deal screen — owner intel, debt, submarket trends, comp sales, tenant analysis, supply pipeline, and outreach angle.</div>
        <div class="c-badge">8-Section Report</div>
      </div>
      <div class="card" onclick="showPanel('picasso')">
        <div class="c-icon">📍</div>
        <div class="c-name">Lease Comp Map</div>
        <div class="c-sub">Picasso</div>
        <div class="c-desc">Upload or paste comp data and get an interactive map with clickable pins, full data table, and stats summary.</div>
        <div class="c-badge">Interactive HTML</div>
      </div>
      <div class="card" onclick="showPanel('gavel')">
        <div class="c-icon">⚖️</div>
        <div class="c-name">Legal Doc Review</div>
        <div class="c-sub">The Gavel</div>
        <div class="c-desc">Upload any CRE legal doc — JV, PSA, loan, lease, PMA. Get key terms, provision checklist, risk flags, and redline suggestions.</div>
        <div class="c-badge">Not Legal Advice</div>
      </div>
      <div class="card" onclick="showPanel('isr')">
        <div class="c-icon">📊</div>
        <div class="c-name">Investment Summary</div>
        <div class="c-sub">Memo</div>
        <div class="c-desc">Generate a full IC memo — deal thesis, return metrics, pros &amp; cons with comments, risk analysis, and recommendation.</div>
        <div class="c-badge">IC-Ready + .docx</div>
      </div>
    </div>
  </div>

  <!-- SWEEP PANEL -->
  <div class="panel" id="sweep-panel">
    <div class="ph">
      <button class="back" onclick="goHome()">← Back</button>
      <div>
        <div class="pt">Submarket Sweep <span class="tag">SCOUT</span></div>
        <div class="ps">SCOUT screens for motivated sellers, debt signals, and ranked acquisition targets</div>
      </div>
    </div>
    <div class="fc">
      <div class="fg">
        <div class="fr"><label>Target Submarket *</label><input type="text" id="sw-sub" placeholder="e.g. I-85 Corridor / Gwinnett, GA"></div>
        <div class="fr"><label>Asset Type *</label>
          <select id="sw-type">
            <option value="">Select type...</option>
            <option>Industrial</option><option>Office</option>
            <option>Flex / R&D</option><option>Retail / Strip</option><option>Mixed Use</option>
          </select>
        </div>
      </div>
      <div class="fg">
        <div class="fr"><label>Deal Size Range</label>
          <select id="sw-size">
            <option>Sub $5M</option><option>$5M–$10M</option><option>$10M–$30M</option>
            <option>$10M–$50M</option><option selected>$10M–$70M</option><option>$20M–$70M</option>
          </select>
        </div>
        <div class="fr"><label>Building Size (SF)</label>
          <select id="sw-sf">
            <option value="any size">Any size</option>
            <option>Under 25,000 SF</option><option>25,000–50,000 SF</option>
            <option>50,000–100,000 SF</option><option>100,000–150,000 SF</option>
            <option>150,000–200,000 SF</option><option>Over 200,000 SF</option>
          </select>
        </div>
      </div>
      <div class="fg">
        <div class="fr"><label>Priority Signal</label>
          <select id="sw-sig">
            <option>All signals equally</option><option>Debt maturity / bridge stress</option>
            <option>CMBS watchlist</option><option>Elevated vacancy</option><option>Capex neglect</option>
          </select>
        </div>
        <div class="fr"><label>Additional Context <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">(optional)</span></label>
          <input type="text" id="sw-ctx" placeholder="Owner types, exclusions, prior intel...">
        </div>
      </div>
    </div>
    <button class="run-btn" onclick="runSweep()">🔍 Run SCOUT Sweep</button>
  </div>

  <!-- DOSSIER PANEL -->
  <div class="panel" id="dossier-panel">
    <div class="ph">
      <button class="back" onclick="goHome()">← Back</button>
      <div>
        <div class="pt">Property Dossier <span class="tag">SCOUT</span></div>
        <div class="ps">Full deal screen — owner, debt, submarket, comp sales, tenant, supply pipeline, outreach angle</div>
      </div>
    </div>
    <div class="fc">
      <div class="fr"><label>Property Address *</label><input type="text" id="dos-addr" placeholder="e.g. 3950 Steve Reynolds Blvd, Norcross, GA 30093"></div>
      <div class="fg">
        <div class="fr"><label>Asset Type</label>
          <select id="dos-type">
            <option value="">Unknown / determine from research</option>
            <option>Industrial</option><option>Office</option>
            <option>Flex / R&D</option><option>Retail</option><option>Mixed Use</option>
          </select>
        </div>
        <div class="fr"><label>Estimated SF</label><input type="text" id="dos-sf" placeholder="e.g. 85,000 or unknown"></div>
      </div>
      <div class="fr">
        <label>Upload OM or Deal Doc <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">(optional — PDF)</span></label>
        <div class="upload-zone" id="om-zone" onclick="document.getElementById('om-input').click()">
          <span style="font-size:18px">📄</span>
          <div><div class="uz-label" id="om-label">Click to upload OM, rent roll, or deal doc (PDF)</div><div class="uz-sub">Text will be extracted and fed into the dossier</div></div>
          <input type="file" id="om-input" accept=".pdf" style="display:none" onchange="handleOM(event)">
        </div>
      </div>
      <div class="fr"><label>Known Intel <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">(optional)</span></label>
        <textarea id="dos-intel" placeholder="Prior outreach, rumored debt situation, CoStar notes..."></textarea>
      </div>
    </div>
    <button class="run-btn" onclick="runDossier()">📋 Build Full Dossier</button>
  </div>

  <!-- PICASSO PANEL -->
  <div class="panel" id="picasso-panel">
    <div class="ph">
      <button class="back" onclick="goHome()">← Back</button>
      <div>
        <div class="pt">Lease Comp Map <span class="tag">Picasso</span></div>
        <div class="ps">Upload or paste comp data — get an interactive map with clickable pins, table, and stats</div>
      </div>
    </div>
    <div class="fc">
      <div class="fr"><label>Target Property Address(es) *</label>
        <textarea id="pic-targets" style="min-height:60px" placeholder="One per line&#10;e.g. 3950 Steve Reynolds Blvd, Norcross, GA"></textarea>
      </div>
      <div class="fr"><label>Submarket Name</label><input type="text" id="pic-sub" placeholder="e.g. I-85 / Gwinnett Industrial"></div>
      <div class="fr">
        <label>Comp Data * <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">— upload .xlsx or paste below</span></label>
        <div class="upload-zone" id="xlsx-zone" onclick="document.getElementById('xlsx-input').click()">
          <span style="font-size:18px">📊</span>
          <div><div class="uz-label" id="xlsx-label">Click to upload .xlsx comp file</div><div class="uz-sub">Optional — or paste data directly below</div></div>
          <input type="file" id="xlsx-input" accept=".xlsx,.xls" style="display:none" onchange="handleXlsx(event)">
        </div>
        <textarea id="pic-comps" style="min-height:120px" placeholder="Paste comp data — CoStar table, CSV, or plain text. Fields: Tenant, Address, City, SF, Term, Sign Date, Lease Type, Rent/SF, Escalation, Free Rent, TIs, Transaction Type"></textarea>
      </div>
    </div>
    <button class="run-btn" onclick="runPicasso()">🗺️ Build Comp Map</button>
  </div>

  <!-- GAVEL PANEL -->
  <div class="panel" id="gavel-panel">
    <div class="ph">
      <button class="back" onclick="goHome()">← Back</button>
      <div>
        <div class="pt">Legal Doc Review <span class="tag">The Gavel</span></div>
        <div class="ps">Key terms, provision checklist, risk flags, redline suggestions &amp; comparison against your executed doc library</div>
      </div>
    </div>
    <div style="display:flex;gap:0;margin-bottom:20px;border-bottom:1px solid var(--border)">
      <button class="gtab active" id="gtab-review" onclick="switchGavelTab('review')" style="background:none;border:none;border-bottom:2px solid var(--accent);color:var(--text);font-size:13px;font-weight:600;padding:10px 20px;cursor:pointer;margin-bottom:-1px">Review Doc</button>
      <button class="gtab" id="gtab-library" onclick="switchGavelTab('library')" style="background:none;border:none;border-bottom:2px solid transparent;color:var(--muted);font-size:13px;font-weight:600;padding:10px 20px;cursor:pointer;margin-bottom:-1px">📚 Library <span id="lib-count" style="font-size:11px;background:var(--accent-dim);color:var(--accent);padding:1px 6px;border-radius:10px;margin-left:4px">0</span></button>
    </div>
    <div id="gtab-review-content">
      <div class="fc">
        <div class="fr">
          <label>Upload Document * <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">(PDF)</span></label>
          <div class="upload-zone" id="gavel-zone" onclick="document.getElementById('gavel-input').click()">
            <span style="font-size:22px">⚖️</span>
            <div>
              <div class="uz-label" id="gavel-label">Click to upload CRE legal document (PDF)</div>
              <div class="uz-sub">JV agreement, PSA, loan doc, lease, property management agreement</div>
            </div>
            <input type="file" id="gavel-input" accept=".pdf" style="display:none" onchange="handleGavel(event)">
          </div>
        </div>
        <div class="fr">
          <label>Second Document <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">(optional — for side-by-side comparison)</span></label>
          <div class="upload-zone" id="gavel-zone2" onclick="document.getElementById('gavel-input2').click()">
            <span style="font-size:18px">📄</span>
            <div>
              <div class="uz-label" id="gavel-label2">Click to upload second document (PDF)</div>
              <div class="uz-sub">Upload a second doc to get a side-by-side comparison matrix</div>
            </div>
            <input type="file" id="gavel-input2" accept=".pdf" style="display:none" onchange="handleGavel2(event)">
          </div>
        </div>
        <div class="fg">
          <div class="fr"><label>Document Type <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">(optional)</span></label>
            <select id="gavel-type">
              <option value="">Auto-detect</option>
              <option>JV / Operating Agreement</option>
              <option>Purchase &amp; Sale Agreement (PSA)</option>
              <option>Loan / Financing Document</option>
              <option>Lease Agreement</option>
              <option>Property Management Agreement</option>
            </select>
          </div>
          <div class="fr"><label>Focus Areas <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">(optional)</span></label>
            <input type="text" id="gavel-focus" placeholder="e.g. waterfall, exit rights, default provisions">
          </div>
        </div>
        <div class="fr"><label>Context / Notes <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">(optional)</span></label>
          <textarea id="gavel-notes" style="min-height:70px" placeholder="Deal background, specific concerns, Ridge's role (buyer, lender, JV partner)..."></textarea>
        </div>
        <div class="fr" id="lib-context-row" style="display:none">
          <label>Compare Against Library Docs <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">(optional)</span></label>
          <div id="lib-selector" style="display:flex;flex-direction:column;gap:6px;max-height:160px;overflow-y:auto;background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:10px 12px;font-size:13px;color:var(--muted)">
            <span style="color:var(--dim);font-size:12px">No library docs yet</span>
          </div>
        </div>
      </div>
      <button class="run-btn" onclick="runGavel()">⚖️ Review Document</button>
    </div>
    <div id="gtab-library-content" style="display:none">
      <div class="fc">
        <div class="fr">
          <label>Add Executed Doc to Library</label>
          <div class="upload-zone" id="lib-upload-zone" onclick="document.getElementById('lib-input').click()">
            <span style="font-size:20px">📁</span>
            <div>
              <div class="uz-label" id="lib-upload-label">Click to upload an executed CRE document (PDF)</div>
              <div class="uz-sub">Stored locally for this session</div>
            </div>
            <input type="file" id="lib-input" accept=".pdf" style="display:none" onchange="handleLibUpload(event)">
          </div>
        </div>
        <div class="fg" id="lib-meta-fields" style="display:none">
          <div class="fr"><label>Document Name / Deal</label><input type="text" id="lib-name" placeholder="e.g. Brookside JV Agreement — 2023"></div>
          <div class="fr"><label>Document Type</label>
            <select id="lib-type">
              <option>JV / Operating Agreement</option>
              <option>Purchase &amp; Sale Agreement (PSA)</option>
              <option>Loan / Financing Document</option>
              <option>Lease Agreement</option>
              <option>Property Management Agreement</option>
            </select>
          </div>
          <div class="fr"><label>Notes <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">(optional)</span></label>
            <input type="text" id="lib-notes" placeholder="e.g. Executed Q3 2023, 80/20 waterfall">
          </div>
          <div class="fr" style="display:flex;align-items:flex-end">
            <button class="run-btn" style="padding:9px 20px;font-size:13px" onclick="saveToLibrary()">Save to Library</button>
          </div>
        </div>
      </div>
      <div id="lib-list" style="margin-top:4px"></div>
    </div>
  </div>

  <!-- ISR PANEL -->
  <div class="panel" id="isr-panel">
    <div class="ph">
      <button class="back" onclick="goHome()">← Back</button>
      <div>
        <div class="pt">Investment Summary Report <span class="tag">Memo</span></div>
        <div class="ps">Full IC memo — thesis, return metrics, pros &amp; cons with comments, risk analysis, and recommendation</div>
      </div>
    </div>

    <!-- Deal Overview -->
    <div class="fc">
      <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--accent);margin-bottom:16px">Deal Overview</div>
      <div class="fr"><label>Property Address / Deal Name *</label><input type="text" id="isr-addr" placeholder="e.g. 3950 Steve Reynolds Blvd, Norcross, GA — Gwinnett Industrial"></div>
      <div class="fg">
        <div class="fr"><label>Asset Type</label>
          <select id="isr-type">
            <option>Industrial</option><option>Flex / R&D</option><option>Office</option><option>Retail</option><option>Mixed Use</option>
          </select>
        </div>
        <div class="fr"><label>Building Size (SF)</label><input type="text" id="isr-sf" placeholder="e.g. 125,000" oninput="calcPSF()"></div>
      </div>
      <div class="fg">
        <div class="fr"><label>Purchase Price</label><input type="text" id="isr-price" placeholder="e.g. $24,500,000" oninput="calcPSF()"></div>
        <div class="fr"><label>Price PSF <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)" id="isr-psf-auto-lbl">(auto-calculated)</span></label><input type="text" id="isr-psf" placeholder="e.g. $196" oninput="psфManual()" style="transition:background .2s"></div>
      </div>
    </div>

    <!-- Return Metrics -->
    <div class="fc">
      <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--accent);margin-bottom:16px">Return Metrics</div>
      <div class="fg3">
        <div class="fr"><label>Levered IRR</label><input type="text" id="isr-irr" placeholder="e.g. 14.2%"></div>
        <div class="fr"><label>Equity Multiple</label><input type="text" id="isr-em" placeholder="e.g. 2.1x"></div>
        <div class="fr"><label>Hold Period</label><input type="text" id="isr-hold" placeholder="e.g. 5 years"></div>
      </div>
      <div class="fg3">
        <div class="fr"><label>Going-in Cap Rate</label><input type="text" id="isr-cap" placeholder="e.g. 6.8%"></div>
        <div class="fr"><label>Yield on Cost (Yr 3)</label><input type="text" id="isr-yoc" placeholder="e.g. 8.1%"></div>
        <div class="fr"><label>LTV</label><input type="text" id="isr-ltv" placeholder="e.g. 65%"></div>
      </div>
    </div>

    <!-- Deal Thesis -->
    <div class="fc">
      <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--accent);margin-bottom:16px">Deal Thesis &amp; Context</div>
      <div class="fr"><label>Deal Thesis / Investment Rationale <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">(optional — AI will generate if blank)</span></label>
        <textarea id="isr-thesis" style="min-height:80px" placeholder="Key value-add angle, market opportunity, why this asset, why now..."></textarea>
      </div>
      <div class="fr"><label>Upload OM or Deal Doc <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">(optional — PDF)</span></label>
        <div class="upload-zone" id="isr-om-zone" onclick="document.getElementById('isr-om-input').click()">
          <span style="font-size:18px">📄</span>
          <div><div class="uz-label" id="isr-om-label">Click to upload OM, rent roll, or deal doc (PDF)</div><div class="uz-sub">Extracted text feeds directly into the memo</div></div>
          <input type="file" id="isr-om-input" accept=".pdf" style="display:none" onchange="handleIsrOM(event)">
        </div>
      </div>
    </div>

    <!-- Pros & Cons -->
    <div class="fc">
      <div style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--accent);margin-bottom:4px">Pros &amp; Cons</div>
      <div style="font-size:12px;color:var(--muted);margin-bottom:16px">Pre-fill to guide the AI, or leave blank for fully AI-generated. You can edit after generation.</div>

      <!-- Pros -->
      <div style="margin-bottom:18px">
        <div class="pc-label-row" style="grid-template-columns:1fr 1fr 36px">
          <div class="pc-col-lbl" style="color:var(--green)">✓ Pro (point)</div>
          <div class="pc-col-lbl">Comment / annotation</div>
          <div></div>
        </div>
        <div id="pros-list"></div>
        <button class="isr-add" onclick="addPCRow('pros-list','pro')">+ Add Pro</button>
      </div>

      <!-- Cons -->
      <div>
        <div class="pc-label-row" style="grid-template-columns:1fr 1fr 36px">
          <div class="pc-col-lbl" style="color:var(--red)">✗ Con (point)</div>
          <div class="pc-col-lbl">Comment / annotation</div>
          <div></div>
        </div>
        <div id="cons-list"></div>
        <button class="isr-add" onclick="addPCRow('cons-list','con')">+ Add Con</button>
      </div>
    </div>

    <!-- Additional Notes -->
    <div class="fc">
      <div class="fr"><label>Additional Notes / Context <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">(optional)</span></label>
        <textarea id="isr-notes" style="min-height:70px" placeholder="Lender feedback, IC concerns, deal-specific nuances, Ridge's basis vs. market..."></textarea>
      </div>
    </div>

    <button class="run-btn" onclick="runISR()">📊 Generate Investment Summary</button>
  </div>

  <!-- RESULTS PANEL -->
  <div id="results-panel">
    <div class="rh">
      <div class="rm">
        <button class="back" onclick="resetToPanel()">← New Run</button>
        <div class="rt" id="res-title"></div>
      </div>
      <div class="ra">
        <button class="abtn" id="copy-btn" onclick="copyOut()">Copy Output</button>
        <button class="abtn" id="export-btn" onclick="exportOut()">Export</button>
        <button class="abtn accent-btn" id="docx-btn" onclick="exportDocx()" style="display:none">⬇ Download .docx</button>
      </div>
    </div>
    <div class="rc" id="res-content"></div>
  </div>

</main>

<script>
var curMode='',curPanel='',curOutput='',curISRData=null;
var omLoaded=false,omText=null;
var isrOmLoaded=false,isrOmText=null;
var gavelLoaded=false,gavelText=null;
var gavel2Loaded=false,gavel2Text=null;
var xlsxLoaded=false;
var libPending={text:null,name:null};
var docLibrary=[];

// Init library
(function(){
  window.storage&&window.storage.get('gavel-library').then(function(r){
    if(r&&r.value){try{docLibrary=JSON.parse(r.value);}catch(e){docLibrary=[];}refreshLibraryUI();}
  }).catch(function(){docLibrary=[];});
  // Init pros/cons rows
  addPCRow('pros-list','pro');addPCRow('pros-list','pro');addPCRow('pros-list','pro');
  addPCRow('cons-list','con');addPCRow('cons-list','con');addPCRow('cons-list','con');
})();

function addPCRow(listId,type){
  var list=document.getElementById(listId);
  var div=document.createElement('div');
  div.className='isr-pc-row';
  div.innerHTML='<input type="text" placeholder="'+(type==='pro'?'e.g. Below-market basis vs. recent comps':'e.g. Single-tenant rollover risk in 18 months')+'" class="pc-point">'+
    '<input type="text" placeholder="Comment / annotation (optional)" class="pc-comment">'+
    '<button class="isr-del" onclick="this.parentElement.remove()">✕</button>';
  list.appendChild(div);
}

function getPCData(listId){
  var rows=document.querySelectorAll('#'+listId+' .isr-pc-row');
  var out=[];
  rows.forEach(function(r){
    var pt=r.querySelector('.pc-point').value.trim();
    var cm=r.querySelector('.pc-comment').value.trim();
    if(pt) out.push({point:pt,comment:cm});
  });
  return out;
}

function saveLibraryToStorage(){
  var toStore=docLibrary.map(function(d){return {id:d.id,name:d.name,type:d.type,notes:d.notes,date:d.date,text:d.text.slice(0,8000)};});
  window.storage&&window.storage.set('gavel-library',JSON.stringify(toStore)).catch(function(){});
}

function switchGavelTab(tab){
  document.getElementById('gtab-review-content').style.display=tab==='review'?'block':'none';
  document.getElementById('gtab-library-content').style.display=tab==='library'?'block':'none';
  document.getElementById('gtab-review').style.borderBottomColor=tab==='review'?'var(--accent)':'transparent';
  document.getElementById('gtab-review').style.color=tab==='review'?'var(--text)':'var(--muted)';
  document.getElementById('gtab-library').style.borderBottomColor=tab==='library'?'var(--accent)':'transparent';
  document.getElementById('gtab-library').style.color=tab==='library'?'var(--text)':'var(--muted)';
}

function handleLibUpload(event){
  var file=event.target.files[0];if(!file)return;
  var lbl=document.getElementById('lib-upload-label'),zone=document.getElementById('lib-upload-zone');
  lbl.textContent='Extracting text from '+file.name+'...';lbl.style.color='var(--muted)';
  extractPDF(file,function(text,pages){
    libPending={text:text,fileName:file.name};
    lbl.style.color='var(--green)';lbl.textContent='✓ '+file.name+' — '+pages+' pages extracted.';
    zone.style.borderColor='var(--green)';
    document.getElementById('lib-name').value=file.name.replace(/\.pdf$/i,'');
    document.getElementById('lib-meta-fields').style.display='grid';
  },function(){lbl.style.color='var(--red)';lbl.textContent='Error reading PDF — try again';});
}

function saveToLibrary(){
  if(!libPending.text){alert('Please upload a document first.');return;}
  var name=document.getElementById('lib-name').value.trim()||libPending.fileName||'Untitled';
  var type=document.getElementById('lib-type').value;
  var notes=document.getElementById('lib-notes').value.trim();
  var entry={id:Date.now(),name:name,type:type,notes:notes,date:new Date().toLocaleDateString(),text:libPending.text};
  docLibrary.push(entry);saveLibraryToStorage();refreshLibraryUI();
  libPending={text:null,fileName:null};
  document.getElementById('lib-meta-fields').style.display='none';
  document.getElementById('lib-upload-label').textContent='Click to upload an executed CRE document (PDF)';
  document.getElementById('lib-upload-label').style.color='var(--muted)';
  document.getElementById('lib-upload-zone').style.borderColor='';
  document.getElementById('lib-name').value='';document.getElementById('lib-notes').value='';
  document.getElementById('lib-input').value='';
  alert('✓ "'+name+'" saved to library.');
}

function deleteLibDoc(id){
  if(!confirm('Remove this document from the library?'))return;
  docLibrary=docLibrary.filter(function(d){return d.id!==id;});saveLibraryToStorage();refreshLibraryUI();
}

function refreshLibraryUI(){
  var count=docLibrary.length;
  document.getElementById('lib-count').textContent=count;
  var listEl=document.getElementById('lib-list');
  if(!count){listEl.innerHTML='<div style="color:var(--dim);font-size:13px;text-align:center;padding:24px 0">No documents in library yet</div>';}
  else{listEl.innerHTML=docLibrary.map(function(d){return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:14px 16px;margin-bottom:10px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px"><div><div style="font-size:13px;font-weight:600;margin-bottom:3px">'+d.name+'</div><div style="font-size:11px;color:var(--accent);text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px">'+d.type+'</div>'+(d.notes?'<div style="font-size:12px;color:var(--muted)">'+d.notes+'</div>':'')+'<div style="font-size:11px;color:var(--dim);margin-top:4px">Added '+d.date+'</div></div><button onclick="deleteLibDoc('+d.id+')" style="background:none;border:1px solid var(--border);color:var(--muted);border-radius:5px;padding:4px 10px;font-size:11px;cursor:pointer;white-space:nowrap;flex-shrink:0">Remove</button></div>';}).join('');}
  var selEl=document.getElementById('lib-selector'),rowEl=document.getElementById('lib-context-row');
  if(!count){rowEl.style.display='none';}
  else{rowEl.style.display='block';selEl.innerHTML=docLibrary.map(function(d){return '<label style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:4px 0"><input type="checkbox" class="lib-check" data-id="'+d.id+'" style="width:auto;accent-color:var(--accent)"><span><strong style="font-size:13px">'+d.name+'</strong> <span style="color:var(--accent);font-size:11px">'+d.type+'</span>'+(d.notes?' <span style="color:var(--dim);font-size:11px">— '+d.notes+'</span>':'')+'</span></label>';}).join('');}
}

var SCOUT_SYS='You are SCOUT, RIDGE\'s dedicated deal sourcing engine. Precise, signal-driven, direct. No filler — every output is actionable.\n\nRIDGE parameters: $10M–$70M, industrial/flex focus, Southeast US, 7.5–8.0% YOC at Year 3/4.\nDrop criteria: Institutional owner | Listed in last 90 days | Under 15,000 SF | Hold under 4 years | Sale within 24 months.\n\nFormat in clean markdown. ## for major sections, ### for subsections. Tables for structured data.';

var PICASSO_SYS='You are Picasso, RIDGE\'s lease comp mapping engine. Produce a complete, self-contained interactive HTML file. No placeholders. Fully functional when opened in a browser.\n\nRequired:\n1. Leaflet.js map (CDN) with OpenStreetMap tiles\n2. Target pins: red #C8102E, labeled T1/T2/etc., popups with address and details\n3. Comp pins: navy #1A3A6B, labeled 1/2/3/etc., popups with all comp fields\n4. Legend bottom-right\n5. Below map: styled data table — all comp fields, alternating rows (#EEF2F8/white), target rows light red (#FDECEA)\n6. Stats bar: Avg Rent/SF, Avg Term, Avg Escalation, Avg SF, Comp Count\n7. Navy header with submarket name and date\n8. Navy footer: "Confidential – Internal Use Only"\n9. Print button (hidden on print)\n\nGeocode using your knowledge of US addresses. If uncertain, use city-center coords and note in popup.\nReturn ONLY the complete HTML. Start with <!DOCTYPE html>, end with </html>. No explanation, no markdown fences.';

var GAVEL_SYS='You are The Gavel, a CRE legal document analyst for RIDGE. Your job is to read CRE legal documents, extract key terms, flag risks, check for standard provisions, and produce a thorough structured report.\n\nYou are NOT providing legal advice. Every report must begin with the disclaimer.\n\nFor EACH risk flag provide: RISK title, SEVERITY (High/Medium/Low), SECTION reference, ISSUE in plain language, MARKET COMPARISON, SUGGESTED REDLINE.\n\nSeverity indicators: use **[HIGH]**, **[MEDIUM]**, **[LOW]**.\n\nFormat in clean markdown. ## for major sections. Tables for key terms and checklists. Use ✅ ⚠️ ❌ 🔇 for provision checklist items.\n\nALWAYS start with the disclaimer block.';

var ISR_SYS='You are RIDGE\'s Investment Memo AI. Produce a thorough, IC-ready Investment Summary Report. Be direct, precise, and opinionated — this is a decision document, not a marketing piece.\n\nRIDGE investment profile: $10M–$70M, industrial/flex, Southeast US, target 7.5–8.0% YOC at Year 3/4, 12–16% levered IRR, 5-year hold.\n\nOutput format: clean markdown only.\n## for major section headers\n### for subsections\nTables for return metrics and comparisons\nUse ✅ for positives, ⚠️ for watch items, ❌ for red flags in Risk section\n\nDo NOT use filler language. Every sentence must add information or judgment.\nIf data is missing, flag it explicitly as [DATA NEEDED] and explain why it matters.';

function goHome(){
  document.getElementById('home').style.display='block';
  ['sweep-panel','dossier-panel','picasso-panel','gavel-panel','isr-panel'].forEach(function(id){document.getElementById(id).style.display='none';});
  document.getElementById('results-panel').style.display='none';
}

function showPanel(mode){
  document.getElementById('home').style.display='none';
  document.getElementById('results-panel').style.display='none';
  ['sweep-panel','dossier-panel','picasso-panel','gavel-panel','isr-panel'].forEach(function(id){document.getElementById(id).style.display='none';});
  curPanel=mode;
  document.getElementById(mode+'-panel').style.display='block';
}

function resetToPanel(){
  document.getElementById('results-panel').style.display='none';
  document.getElementById(curPanel+'-panel').style.display='block';
}

function showResults(){
  ['sweep-panel','dossier-panel','picasso-panel','gavel-panel','isr-panel'].forEach(function(id){document.getElementById(id).style.display='none';});
  document.getElementById('results-panel').style.display='block';
}

function extractPDF(file,cb,errCb){
  loadPDFJS().then(function(lib){
    file.arrayBuffer().then(function(buf){
      lib.getDocument({data:buf}).promise.then(function(pdf){
        var pages=Math.min(pdf.numPages,40),texts=[],i=1;
        function next(){
          if(i>pages){cb(texts.join('\n').trim(),pdf.numPages);return;}
          pdf.getPage(i).then(function(pg){
            pg.getTextContent().then(function(c){
              texts.push(c.items.map(function(it){return it.str;}).join(' '));i++;next();
            });
          });
        }
        next();
      });
    });
  }).catch(errCb||function(){});
}

function handleOM(event){
  var file=event.target.files[0];if(!file)return;
  var lbl=document.getElementById('om-label'),zone=document.getElementById('om-zone');
  lbl.textContent='Extracting text from '+file.name+'...';lbl.style.color='var(--muted)';
  extractPDF(file,function(text,pages){omText=text;omLoaded=true;lbl.style.color='var(--green)';lbl.textContent='✓ '+file.name+' — '+pages+' pages extracted';zone.style.borderColor='var(--green)';},
  function(){lbl.style.color='var(--red)';lbl.textContent='Error reading PDF — try again';});
}

function handleIsrOM(event){
  var file=event.target.files[0];if(!file)return;
  var lbl=document.getElementById('isr-om-label'),zone=document.getElementById('isr-om-zone');
  lbl.textContent='Extracting text from '+file.name+'...';lbl.style.color='var(--muted)';
  extractPDF(file,function(text,pages){isrOmText=text;isrOmLoaded=true;lbl.style.color='var(--green)';lbl.textContent='✓ '+file.name+' — '+pages+' pages extracted';zone.style.borderColor='var(--green)';},
  function(){lbl.style.color='var(--red)';lbl.textContent='Error reading PDF — try again';});
}

function handleGavel(event){
  var file=event.target.files[0];if(!file)return;
  var lbl=document.getElementById('gavel-label'),zone=document.getElementById('gavel-zone');
  lbl.textContent='Extracting text from '+file.name+'...';lbl.style.color='var(--muted)';
  extractPDF(file,function(text,pages){gavelText=text;gavelLoaded=true;lbl.style.color='var(--green)';lbl.textContent='✓ '+file.name+' — '+pages+' pages extracted';zone.style.borderColor='var(--green)';},
  function(){lbl.style.color='var(--red)';lbl.textContent='Error reading PDF — try again';});
}

function handleGavel2(event){
  var file=event.target.files[0];if(!file)return;
  var lbl=document.getElementById('gavel-label2'),zone=document.getElementById('gavel-zone2');
  lbl.textContent='Extracting text from '+file.name+'...';
  extractPDF(file,function(text,pages){gavel2Text=text;gavel2Loaded=true;lbl.style.color='var(--green)';lbl.textContent='✓ '+file.name+' — '+pages+' pages extracted';zone.style.borderColor='var(--green)';},
  function(){lbl.style.color='var(--red)';lbl.textContent='Error reading PDF — try again';});
}

function loadPDFJS(){
  return new Promise(function(res,rej){
    if(window.pdfjsLib){res(window.pdfjsLib);return;}
    var s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    s.onload=function(){window.pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';res(window.pdfjsLib);};
    s.onerror=rej;document.head.appendChild(s);
  });
}

function handleXlsx(event){
  var file=event.target.files[0];if(!file)return;
  var lbl=document.getElementById('xlsx-label'),zone=document.getElementById('xlsx-zone');
  lbl.textContent='Reading '+file.name+'...';
  loadXLSX().then(function(XLSX){
    file.arrayBuffer().then(function(buf){
      var wb=XLSX.read(buf,{type:'array'}),ws=wb.Sheets[wb.SheetNames[0]];
      document.getElementById('pic-comps').value=XLSX.utils.sheet_to_csv(ws);
      xlsxLoaded=true;lbl.style.color='var(--green)';lbl.textContent='✓ '+file.name+' loaded';zone.style.borderColor='var(--green)';
    });
  }).catch(function(){lbl.style.color='var(--red)';lbl.textContent='Error — try pasting manually';});
}

function loadXLSX(){
  return new Promise(function(res,rej){
    if(window.XLSX){res(window.XLSX);return;}
    var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    s.onload=function(){res(window.XLSX);};s.onerror=rej;document.head.appendChild(s);
  });
}

function showLoading(steps,lbl){
  document.getElementById('res-content').innerHTML=
    '<div class="lw"><div class="spinner"></div><div class="ll">'+lbl+'</div><div class="ls">'+
    steps.map(function(s,i){return '<div class="lstep" id="ls'+i+'"><span class="si">○</span>'+s+'</div>';}).join('')+'</div></div>';
  var i=0,iv=setInterval(function(){
    if(i>0){var p=document.getElementById('ls'+(i-1));if(p){p.className='lstep done';p.querySelector('.si').textContent='✓';}}
    var c=document.getElementById('ls'+i);if(c){c.className='lstep active';c.querySelector('.si').textContent='›';}
    i++;if(i>=steps.length)clearInterval(iv);
  },900);
  return iv;
}

function mdToHTML(md){
  var h=md
    .replace(/^#### (.+)$/gm,'<h4>$1</h4>').replace(/^### (.+)$/gm,'<h3>$1</h3>')
    .replace(/^## (.+)$/gm,'<h2>$1</h2>').replace(/^# (.+)$/gm,'<h1>$1</h1>')
    .replace(/\*\*\[HIGH\]\*\*/g,'<span class="sev-high">[HIGH]</span>')
    .replace(/\*\*\[MEDIUM\]\*\*/g,'<span class="sev-med">[MEDIUM]</span>')
    .replace(/\*\*\[LOW\]\*\*/g,'<span class="sev-low">[LOW]</span>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`([^`]+)`/g,'<code>$1</code>').replace(/^---$/gm,'<hr>')
    .replace(/^> (.+)$/gm,'<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm,'<li>$1</li>').replace(/(<li>.*<\/li>\n?)+/g,function(m){return '<ul>'+m+'</ul>';});
  h=h.replace(/(\|.+\|\n)+/g,function(match){
    var rows=match.trim().split('\n').filter(function(r){return r.trim()&&!r.match(/^\|[-| :]+\|$/);});
    if(!rows.length)return match;
    function mkRow(r,tag){return '<tr>'+r.split('|').filter(function(_,i,a){return i>0&&i<a.length-1;}).map(function(c){return '<'+tag+'>'+c.trim()+'</'+tag+'>';}).join('')+'</tr>';}
    return '<table><thead>'+mkRow(rows[0],'th')+'</thead><tbody>'+rows.slice(1).map(function(r){return mkRow(r,'td');}).join('')+'</tbody></table>';
  });
  h=h.split('\n').map(function(line){
    if(line.match(/^<[h1-6uoltbphr]/)||line.match(/^<\//)||!line.trim())return line;
    return '<p>'+line+'</p>';
  }).join('\n');
  return h;
}

function callClaude(system,content,useSearch,maxTok){
  var body={model:'claude-sonnet-4-20250514',max_tokens:maxTok||4000,system:system,messages:[{role:'user',content:content}]};
  if(useSearch)body.tools=[{type:'web_search_20250305',name:'web_search'}];
  return fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    .then(function(r){return r.json().then(function(d){
      if(!r.ok)throw new Error(d.error&&d.error.message||'API error');
      return d.content.filter(function(b){return b.type==='text';}).map(function(b){return b.text;}).join('\n');
    });});
}

function runSweep(){
  var sub=document.getElementById('sw-sub').value.trim(),type=document.getElementById('sw-type').value;
  if(!sub||!type){alert('Please enter submarket and asset type.');return;}
  curMode='scout';curPanel='sweep';showResults();
  document.getElementById('res-title').textContent='SCOUT Sweep — '+sub;
  document.getElementById('export-btn').textContent='Export HTML';
  document.getElementById('copy-btn').style.display='';
  document.getElementById('docx-btn').style.display='none';
  var steps=['Calibrating submarket benchmarks...','Identifying candidate properties...','Screening ownership profiles...','Running debt signal analysis...','Checking physical asset signals...','Ranking by conviction level...'];
  var iv=showLoading(steps,'SCOUT is running your sweep...');
  var p='Run a SCOUT Submarket Sweep for RIDGE.\nTarget Submarket: '+sub+'\nAsset Type: '+type+
    '\nDeal Size: '+document.getElementById('sw-size').value+
    '\nBuilding Size Filter: '+document.getElementById('sw-sf').value+
    '\nPriority Signal: '+document.getElementById('sw-sig').value+
    (document.getElementById('sw-ctx').value?'\nContext: '+document.getElementById('sw-ctx').value:'')+
    '\n\nExecute the full 6-step research sequence:\n1. Submarket calibration — vacancy, avg asking rent by class, 24-month trend\n2. Property identification — buildings with elevated vacancy or stress signals matching the SF filter\n3. Ownership screening — entity, acquisition date, hold period; drop institutional owners\n4. Debt signal screen — loan vintage, lender type, maturity, CMBS/bridge flags\n5. Physical signal check — permit history, capex behavior\n6. Rank and output — Prospect Table by signal count with conviction ratings (High Conviction / Needs More Data / Watch List)\n\nOutput the full Prospect Table then flag top 3 with one-line rationale each. Flag every inference and data gap.';
  callClaude(SCOUT_SYS,p,true,4000).then(function(out){clearInterval(iv);curOutput=out;document.getElementById('res-content').innerHTML='<div class="out">'+mdToHTML(out)+'</div>';})
  .catch(function(e){clearInterval(iv);document.getElementById('res-content').innerHTML='<div class="err">SCOUT error: '+e.message+'</div>';});
}

function runDossier(){
  var addr=document.getElementById('dos-addr').value.trim();
  if(!addr){alert('Please enter a property address.');return;}
  curMode='scout';curPanel='dossier';showResults();
  document.getElementById('res-title').textContent='Dossier — '+addr;
  document.getElementById('export-btn').textContent='Print / Save PDF';
  document.getElementById('copy-btn').style.display='';
  document.getElementById('docx-btn').style.display='none';
  var steps=['Pulling owner & deed records...','Running debt signal analysis...','Pulling submarket trends...','Sourcing comparable sales...','Analyzing tenant & rent roll...','Checking supply pipeline...','Assembling basis & outreach angle...'];
  var iv=showLoading(steps,'SCOUT is building the full dossier...');
  var p='Run a full SCOUT Property Dossier for RIDGE.\n\nPROPERTY: '+addr+'\n'+
    (document.getElementById('dos-type').value?'ASSET TYPE: '+document.getElementById('dos-type').value+'\n':'')+
    (document.getElementById('dos-sf').value?'EST. SF: '+document.getElementById('dos-sf').value+'\n':'')+
    (document.getElementById('dos-intel').value?'KNOWN INTEL: '+document.getElementById('dos-intel').value+'\n':'')+
    (omLoaded&&omText?'\nOM / DEAL DOCUMENT:\n"""\n'+omText.slice(0,12000)+(omText.length>12000?'\n[truncated]':'')+'\n"""\n':'')+
    '\n## 1 — Owner Intelligence\n## 2 — Debt Profile\n## 3 — Submarket Context & Trends\n## 4 — Comparable Sales & Pricing\n## 5 — Tenant & Rent Roll\n## 6 — Competitive Supply Pipeline\n## 7 — Physical Asset Intel\n## 8 — Basis Reconstruction & Opening Angle\n---\n## SCOUT Summary\nOverall SCOUT Signal Rating and RIDGE Recommended Next Step.';
  callClaude(SCOUT_SYS,p,true,6000).then(function(out){clearInterval(iv);curOutput=out;document.getElementById('res-content').innerHTML='<div class="out">'+mdToHTML(out)+'</div>';})
  .catch(function(e){clearInterval(iv);document.getElementById('res-content').innerHTML='<div class="err">SCOUT error: '+e.message+'</div>';});
}

function runPicasso(){
  var targets=document.getElementById('pic-targets').value.trim(),comps=document.getElementById('pic-comps').value.trim();
  if(!targets||!comps){alert('Please enter target address(es) and comp data.');return;}
  curMode='picasso';curPanel='picasso';showResults();
  var sub=document.getElementById('pic-sub').value.trim()||'Lease Comp Map';
  document.getElementById('res-title').textContent='Picasso — '+sub;
  document.getElementById('export-btn').textContent='Export Map HTML';
  document.getElementById('copy-btn').style.display='none';
  document.getElementById('docx-btn').style.display='none';
  var steps=['Parsing comp data...','Geocoding all properties...','Building map layers...','Generating data table...','Assembling HTML output...'];
  var iv=showLoading(steps,'Picasso is building your map...');
  var p='Build a lease comp map for RIDGE.\nSubmarket: '+sub+'\nDate: '+new Date().toLocaleDateString('en-US',{month:'long',year:'numeric'})+'\nTARGET PROPERTIES:\n'+targets+'\nCOMP DATA:\n'+comps+'\n\nParse all comp data, geocode every property, and produce the complete self-contained HTML file. Return only the HTML.';
  callClaude(PICASSO_SYS,p,false,4000).then(function(out){
    clearInterval(iv);curOutput=out;
    var html=out.replace(/^```html?\n?/,'').replace(/\n?```$/,'').trim();
    var url=URL.createObjectURL(new Blob([html],{type:'text/html'}));
    document.getElementById('res-content').innerHTML='<iframe id="map-frame" src="'+url+'"></iframe><div style="margin-top:10px;font-size:12px;color:var(--muted)">Use <strong>Export Map HTML</strong> to download a standalone file.</div>';
  }).catch(function(e){clearInterval(iv);document.getElementById('res-content').innerHTML='<div class="err">Picasso error: '+e.message+'</div>';});
}

function runGavel(){
  if(!gavelLoaded){alert('Please upload a document first.');return;}
  curMode='gavel';curPanel='gavel';showResults();
  document.getElementById('res-title').textContent='The Gavel — Document Review';
  document.getElementById('export-btn').textContent='Print / Save PDF';
  document.getElementById('copy-btn').style.display='';
  document.getElementById('docx-btn').style.display='none';
  var steps=['Classifying document type...','Extracting key terms...','Running provision checklist...','Analyzing economic risks...','Analyzing control & exit risks...','Writing executive summary...'];
  var iv=showLoading(steps,'The Gavel is reviewing your document...');
  var selectedDocs=[];
  document.querySelectorAll('.lib-check:checked').forEach(function(cb){
    var id=parseInt(cb.getAttribute('data-id'));
    var doc=docLibrary.find(function(d){return d.id===id;});
    if(doc)selectedDocs.push(doc);
  });
  var libContext='';
  if(selectedDocs.length){
    libContext='\n\nEXECUTED DOCUMENT LIBRARY:\n'+selectedDocs.map(function(d,i){
      return '\nLIBRARY DOC '+(i+1)+': '+d.name+'\nType: '+d.type+(d.notes?'\nNotes: '+d.notes:'')+'\nText:\n"""\n'+d.text.slice(0,6000)+(d.text.length>6000?'\n[truncated]':'')+'\n"""';
    }).join('\n');
  }
  var p='Review the following CRE legal document for RIDGE.\n\n'+
    (document.getElementById('gavel-type').value?'Document Type: '+document.getElementById('gavel-type').value+'\n':'')+
    (document.getElementById('gavel-focus').value?'Focus Areas: '+document.getElementById('gavel-focus').value+'\n':'')+
    (document.getElementById('gavel-notes').value?'Context: '+document.getElementById('gavel-notes').value+'\n':'')+
    '\nDOCUMENT TEXT:\n"""\n'+gavelText.slice(0,14000)+(gavelText.length>14000?'\n[truncated]':'')+'\n"""'+
    (gavel2Loaded&&gavel2Text?'\n\nDOCUMENT 2 (comparison):\n"""\n'+gavel2Text.slice(0,10000)+(gavel2Text.length>10000?'\n[truncated]':'')+'\n"""':'')+
    libContext+
    '\n\nProduce the full report: Disclaimer, Executive Summary, Document Identification, Key Terms Summary, Provision Checklist, Risk Analysis'+(selectedDocs.length?', Library Comparison':'')+
    (gavel2Loaded?', Side-by-Side Comparison':'')+', Defined Terms Glossary.';
  callClaude(GAVEL_SYS,p,false,6000).then(function(out){
    clearInterval(iv);curOutput=out;
    document.getElementById('res-content').innerHTML=
      '<div class="disclaimer-box">⚠️ <strong>Not Legal Advice.</strong> This review is AI-generated for informational purposes only. Consult qualified legal counsel before making decisions based on this analysis.</div>'+
      '<div class="out">'+mdToHTML(out)+'</div>';
  }).catch(function(e){clearInterval(iv);document.getElementById('res-content').innerHTML='<div class="err">Gavel error: '+e.message+'</div>';});
}

// ── ISR ──────────────────────────────────────────────────────────────────────
function runISR(){
  var addr=document.getElementById('isr-addr').value.trim();
  if(!addr){alert('Please enter a property address or deal name.');return;}
  curMode='isr';curPanel='isr';showResults();
  document.getElementById('res-title').textContent='Investment Summary — '+addr;
  document.getElementById('export-btn').textContent='Print / Save PDF';
  document.getElementById('copy-btn').style.display='';
  document.getElementById('docx-btn').style.display='';

  var steps=['Analyzing deal thesis...','Benchmarking return metrics...','Running market context...','Generating risk analysis...','Drafting recommendation...','Assembling memo...'];
  var iv=showLoading(steps,'Building your Investment Summary Report...');

  var pros=getPCData('pros-list');
  var cons=getPCData('cons-list');

  // Capture inputs for docx later
  curISRData={
    addr:addr,
    type:document.getElementById('isr-type').value,
    sf:document.getElementById('isr-sf').value,
    price:document.getElementById('isr-price').value,
    psf:document.getElementById('isr-psf').value,
    irr:document.getElementById('isr-irr').value,
    em:document.getElementById('isr-em').value,
    hold:document.getElementById('isr-hold').value,
    cap:document.getElementById('isr-cap').value,
    yoc:document.getElementById('isr-yoc').value,
    ltv:document.getElementById('isr-ltv').value,
    thesis:document.getElementById('isr-thesis').value,
    notes:document.getElementById('isr-notes').value,
    pros:pros,
    cons:cons
  };

  var metrics='';
  if(curISRData.irr||curISRData.em||curISRData.cap||curISRData.yoc||curISRData.ltv||curISRData.price){
    metrics='\n\nReturn Metrics Provided:';
    if(curISRData.price) metrics+='\n- Purchase Price: '+curISRData.price;
    if(curISRData.psf) metrics+='\n- Price PSF: '+curISRData.psf;
    if(curISRData.sf) metrics+='\n- Building SF: '+curISRData.sf;
    if(curISRData.irr) metrics+='\n- Levered IRR: '+curISRData.irr;
    if(curISRData.em) metrics+='\n- Equity Multiple: '+curISRData.em;
    if(curISRData.hold) metrics+='\n- Hold Period: '+curISRData.hold;
    if(curISRData.cap) metrics+='\n- Going-in Cap Rate: '+curISRData.cap;
    if(curISRData.yoc) metrics+='\n- Yield on Cost (Yr 3): '+curISRData.yoc;
    if(curISRData.ltv) metrics+='\n- LTV: '+curISRData.ltv;
  }

  var pcContext='';
  if(pros.length){
    pcContext+='\n\nUser-Provided Pros (incorporate these into the Pros section, enhance with analysis):\n'+pros.map(function(p,i){return (i+1)+'. '+p.point+(p.comment?' [Comment: '+p.comment+']':'');}).join('\n');
  }
  if(cons.length){
    pcContext+='\n\nUser-Provided Cons (incorporate these into the Cons section, enhance with analysis):\n'+cons.map(function(c,i){return (i+1)+'. '+c.point+(c.comment?' [Comment: '+c.comment+']':'');}).join('\n');
  }

  var p='Generate a complete Investment Summary Report for RIDGE IC review.\n\nDEAL: '+addr+
    '\nASSET TYPE: '+curISRData.type+
    metrics+
    (curISRData.thesis?'\n\nDEAL THESIS / RATIONALE:\n'+curISRData.thesis:'')+
    (isrOmLoaded&&isrOmText?'\n\nOM / DEAL DOCUMENT EXTRACT:\n"""\n'+isrOmText.slice(0,12000)+(isrOmText.length>12000?'\n[truncated]':'')+'\n"""':'')+
    pcContext+
    (curISRData.notes?'\n\nADDITIONAL CONTEXT:\n'+curISRData.notes:'')+
    '\n\nProduce the full memo in this EXACT order:\n\n## Deal Thesis & Overview\nInvestment rationale, asset description, why this deal fits RIDGE\'s profile. Be direct and specific. 2–4 paragraphs.\n\n## Return Metrics\nTable with all provided metrics vs. RIDGE targets. Flag gaps with [DATA NEEDED]. Include a brief commentary on how returns stack up against RIDGE\'s 7.5–8.0% YOC / 12–16% IRR targets.\n\n## Market / Submarket Context\nSubmarket fundamentals, demand drivers, vacancy trends, supply pipeline. How does submarket positioning affect the thesis?\n\n## Pros (3)\nExactly 3 pros. For each: **Bold Title** — then 2–3 sentences of supporting analysis. If user-provided pros exist, incorporate and enhance them. If not, generate the strongest case.\n\n## Cons (3)\nExactly 3 cons. Same format. Be honest — if something is a real risk, say so.\n\n## Risk Analysis\nTable: Risk | Severity (High/Medium/Low) | Mitigation. Cover deal execution, market, financing, tenant, and exit risks. Use ✅ ⚠️ ❌ indicators.\n\n## IC Recommendation\nClear, direct recommendation: PROCEED / PROCEED WITH CONDITIONS / PASS. State the single most important reason for the recommendation. List 2–3 key conditions or next steps if applicable. No hedging.';

  callClaude(ISR_SYS,p,true,5000).then(function(out){
    clearInterval(iv);
    curOutput=out;
    // Store generated text in curISRData for docx
    curISRData.generatedText=out;
    renderISRResult(out);
  }).catch(function(e){
    clearInterval(iv);
    document.getElementById('res-content').innerHTML='<div class="err">ISR error: '+e.message+'</div>';
  });
}

function renderISRResult(md){
  var editBar='<div class="isr-edit-bar">'+
    '<span style="font-size:13px;font-weight:600">Investment Summary Report</span>'+
    '<span class="isr-edit-hint">💡 Edit pros, cons, and comments directly below, then download .docx</span>'+
  '</div>';
  document.getElementById('res-content').innerHTML=editBar+'<div class="out" id="isr-out">'+buildISRHtml(md)+'</div>';
}

function buildISRHtml(md){
  // Render as standard markdown HTML but intercept Pros/Cons sections for editable UI
  var sections=md.split(/^## /m);
  var html='';
  sections.forEach(function(sec){
    if(!sec.trim())return;
    var lines=sec.split('\n');
    var title=lines[0].trim();
    var body=lines.slice(1).join('\n');
    if(title.match(/^Pros/i)){
      html+='<h2>Pros</h2>'+buildEditablePC(body,'pros','pro');
    } else if(title.match(/^Cons/i)){
      html+='<h2>Cons</h2>'+buildEditablePC(body,'cons','con');
    } else {
      html+='<h2>'+title+'</h2>'+mdToHTML(body);
    }
  });
  return html;
}

function buildEditablePC(body,listId,type){
  // Parse out the 3 items from markdown body
  var color=type==='pro'?'var(--green)':'var(--red)';
  var icon=type==='pro'?'✓':'✗';
  // Parse bold titles + body text: **Title** — description
  var items=[];
  var re=/\*\*(.+?)\*\*\s*[—-]\s*(.+?)(?=\n\*\*|\n##|\n---|\n\n##|$)/gs;
  var m;
  while((m=re.exec(body))!==null){
    items.push({title:m[1].trim(),body:m[2].trim().replace(/\n/g,' ')});
  }
  // fallback: parse numbered list or bullet list
  if(!items.length){
    var lines=body.split('\n').filter(function(l){return l.trim();});
    lines.forEach(function(l){
      l=l.replace(/^[\d\.\-\*]+\s*/,'').trim();
      if(l) items.push({title:l,body:''});
    });
  }

  var html='<div style="margin:14px 0" id="isr-edit-'+listId+'">';
  items.forEach(function(item,i){
    // Find matching user comment if any
    var userComment='';
    if(curISRData){
      var src=type==='pro'?curISRData.pros:curISRData.cons;
      if(src&&src[i]) userComment=src[i].comment||'';
    }
    html+='<div class="isr-item" id="isr-item-'+listId+'-'+i+'">'+
      '<div style="display:flex;align-items:baseline;gap:6px;margin-bottom:6px">'+
        '<span style="color:'+color+';font-weight:900;font-size:15px;flex-shrink:0">'+icon+'</span>'+
        '<input class="edit-field" value="'+escAttr(item.title)+'" id="isr-pt-'+listId+'-'+i+'" placeholder="Point...">'+
      '</div>'+
      '<div style="margin-left:22px;font-size:13px;color:var(--muted);margin-bottom:8px;line-height:1.6" id="isr-pb-'+listId+'-'+i+'">'+escHtml(item.body)+'</div>'+
      '<div style="margin-left:22px;display:flex;align-items:center;gap:6px">'+
        '<span style="font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--dim);white-space:nowrap">Comment:</span>'+
        '<input class="edit-field" value="'+escAttr(userComment)+'" id="isr-cm-'+listId+'-'+i+'" placeholder="Add your annotation or comment...">'+
      '</div>'+
    '</div>';
  });
  html+='</div>';
  return html;
}

function escAttr(s){return (s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');}
function escHtml(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function getEditedPCData(listId,count){
  var items=[];
  for(var i=0;i<count;i++){
    var pt=document.getElementById('isr-pt-'+listId+'-'+i);
    var cm=document.getElementById('isr-cm-'+listId+'-'+i);
    var pb=document.getElementById('isr-pb-'+listId+'-'+i);
    if(pt) items.push({
      title:pt.value||'',
      body:pb?pb.textContent||'':'',
      comment:cm?cm.value||'':''
    });
  }
  return items;
}

// ── DOCX EXPORT ──────────────────────────────────────────────────────────────
function exportDocx(){
  loadDocxLib().then(function(docx){
    buildISRDocx(docx);
  }).catch(function(e){alert('Error loading docx library: '+e.message);});
}

function loadDocxLib(){
  return new Promise(function(res,rej){
    if(window.docx){res(window.docx);return;}
    var s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/docx/8.5.0/docx.umd.min.js';
    s.onload=function(){res(window.docx);};s.onerror=rej;document.head.appendChild(s);
  });
}

function buildISRDocx(docx){
  var D=docx;
  var data=curISRData||{};
  var addr=data.addr||'Investment Summary';
  var date=new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});

  // Collect edited pros/cons
  var pros=[],cons=[];
  for(var i=0;i<3;i++){
    var pp=document.getElementById('isr-pt-pros-'+i);
    var pb=document.getElementById('isr-pb-pros-'+i);
    var pc=document.getElementById('isr-cm-pros-'+i);
    if(pp) pros.push({title:pp.value,body:pb?pb.textContent:'',comment:pc?pc.value:''});
    var cp=document.getElementById('isr-pt-cons-'+i);
    var cb2=document.getElementById('isr-pb-cons-'+i);
    var cc=document.getElementById('isr-cm-cons-'+i);
    if(cp) cons.push({title:cp.value,body:cb2?cb2.textContent:'',comment:cc?cc.value:''});
  }

  var accent='1A3A6B'; // RIDGE navy
  var gold='C8A832';
  var bdr={style:D.BorderStyle.SINGLE,size:1,color:'DDDDDD'};
  var borders={top:bdr,bottom:bdr,left:bdr,right:bdr};
  var cellM={top:100,bottom:100,left:140,right:140};
  var TW=9360; // table width DXA

  function hdr(text,lvl){
    return new D.Paragraph({
      heading:lvl||D.HeadingLevel.HEADING_2,
      children:[new D.TextRun({text:text,bold:true,font:'Arial',color:lvl===D.HeadingLevel.HEADING_1?'000000':accent})]
    });
  }

  function para(text,opts){
    opts=opts||{};
    return new D.Paragraph({
      spacing:{after:120},
      children:[new D.TextRun({text:text,font:'Arial',size:22,color:opts.color||'1a1a1a',bold:opts.bold,italics:opts.italic})]
    });
  }

  function spacer(){return new D.Paragraph({children:[new D.TextRun('')],spacing:{after:80}});}

  function metricRow(label,val,ridge){
    return new D.TableRow({children:[
      new D.TableCell({borders,margins:cellM,width:{size:3200,type:D.WidthType.DXA},shading:{fill:'F0F4FA',type:D.ShadingType.CLEAR},
        children:[new D.Paragraph({children:[new D.TextRun({text:label,bold:true,font:'Arial',size:20})]})]
      }),
      new D.TableCell({borders,margins:cellM,width:{size:3080,type:D.WidthType.DXA},
        children:[new D.Paragraph({children:[new D.TextRun({text:val||'—',font:'Arial',size:20})]})]
      }),
      new D.TableCell({borders,margins:cellM,width:{size:3080,type:D.WidthType.DXA},shading:{fill:'F7F9FC',type:D.ShadingType.CLEAR},
        children:[new D.Paragraph({children:[new D.TextRun({text:ridge||'',font:'Arial',size:20,color:'666666'})]})]
      })
    ]});
  }

  function pcBlock(items,type){
    var children=[];
    items.forEach(function(item){
      if(!item.title)return;
      // Title row
      children.push(new D.Paragraph({
        spacing:{before:140,after:60},
        children:[
          new D.TextRun({text:(type==='pro'?'✓ ':'✗ '),bold:true,color:type==='pro'?'2E7D32':'C62828',font:'Arial',size:22}),
          new D.TextRun({text:item.title,bold:true,font:'Arial',size:22,color:'1a1a1a'})
        ]
      }));
      if(item.body){
        children.push(new D.Paragraph({
          indent:{left:280},
          spacing:{after:60},
          children:[new D.TextRun({text:item.body,font:'Arial',size:20,color:'444444'})]
        }));
      }
      if(item.comment){
        children.push(new D.Paragraph({
          indent:{left:280},
          spacing:{after:100},
          children:[
            new D.TextRun({text:'Comment: ',bold:true,font:'Arial',size:19,color:'888888'}),
            new D.TextRun({text:item.comment,font:'Arial',size:19,color:'555555',italics:true})
          ]
        }));
      }
    });
    return children;
  }

  // Parse remaining sections from generated text
  function extractSection(md,sectionName){
    if(!md) return '';
    var re=new RegExp('##\\s+'+sectionName+'[^\\n]*\\n([\\s\\S]*?)(?=\\n##\\s|$)','i');
    var m=md.match(re);
    return m?m[1].trim():'';
  }

  var gt=data.generatedText||'';
  var thesisText=extractSection(gt,'Deal Thesis');
  var marketText=extractSection(gt,'Market');
  var riskText=extractSection(gt,'Risk');
  var recText=extractSection(gt,'IC Recommendation');

  function textBlock(md){
    if(!md) return [para('No content generated.')];
    var paras=[];
    md.split('\n').forEach(function(line){
      line=line.trim();
      if(!line)return;
      var clean=line.replace(/\*\*/g,'').replace(/\*/g,'').replace(/^#+\s*/,'').replace(/^[-•]\s*/,'');
      paras.push(para(clean));
    });
    return paras.length?paras:[para(md)];
  }

  // Cover page paragraph
  var coverChildren=[
    new D.Paragraph({
      spacing:{after:40},
      children:[new D.TextRun({text:'RIDGE',bold:true,font:'Arial',size:52,color:'FFFFFF'})]
    }),
    new D.Paragraph({
      spacing:{after:20},
      children:[new D.TextRun({text:'INVESTMENT SUMMARY REPORT',bold:true,font:'Arial',size:24,color:gold,characterSpacing:60})]
    }),
    spacer(),
    new D.Paragraph({
      spacing:{after:12},
      children:[new D.TextRun({text:addr,bold:true,font:'Arial',size:36,color:'FFFFFF'})]
    }),
    new D.Paragraph({
      spacing:{after:8},
      children:[new D.TextRun({text:data.type+(data.sf?' | '+data.sf+' SF':''),font:'Arial',size:22,color:'AAAAAA'})]
    }),
    spacer(),
    new D.Paragraph({
      children:[new D.TextRun({text:'Generated '+date+' | Confidential — Internal Use Only',font:'Arial',size:18,color:'777777'})]
    })
  ];

  var doc=new D.Document({
    styles:{
      default:{document:{run:{font:'Arial',size:22}}},
      paragraphStyles:[
        {id:'Heading1',name:'Heading 1',basedOn:'Normal',next:'Normal',quickFormat:true,
          run:{size:32,bold:true,font:'Arial',color:accent},
          paragraph:{spacing:{before:300,after:160},outlineLevel:0}},
        {id:'Heading2',name:'Heading 2',basedOn:'Normal',next:'Normal',quickFormat:true,
          run:{size:26,bold:true,font:'Arial',color:accent},
          paragraph:{spacing:{before:240,after:120},outlineLevel:1}}
      ]
    },
    sections:[{
      properties:{
        page:{
          size:{width:12240,height:15840},
          margin:{top:1440,right:1440,bottom:1440,left:1440}
        }
      },
      children:[
        // Cover block
        new D.Paragraph({
          shading:{fill:'0d1117',type:D.ShadingType.CLEAR},
          spacing:{before:0,after:0},
          border:{bottom:{style:D.BorderStyle.SINGLE,size:6,color:gold,space:1}},
          children:[new D.TextRun({text:'',font:'Arial'})]
        }),
        ...coverChildren,
        new D.Paragraph({children:[new D.PageBreak()]}),

        // Return Metrics
        hdr('Return Metrics',D.HeadingLevel.HEADING_1),
        new D.Table({
          width:{size:TW,type:D.WidthType.DXA},
          columnWidths:[3200,3080,3080],
          rows:[
            new D.TableRow({tableHeader:true,children:[
              new D.TableCell({borders,margins:cellM,width:{size:3200,type:D.WidthType.DXA},shading:{fill:accent,type:D.ShadingType.CLEAR},
                children:[new D.Paragraph({children:[new D.TextRun({text:'Metric',bold:true,font:'Arial',size:20,color:'FFFFFF'})]})]
              }),
              new D.TableCell({borders,margins:cellM,width:{size:3080,type:D.WidthType.DXA},shading:{fill:accent,type:D.ShadingType.CLEAR},
                children:[new D.Paragraph({children:[new D.TextRun({text:'This Deal',bold:true,font:'Arial',size:20,color:'FFFFFF'})]})]
              }),
              new D.TableCell({borders,margins:cellM,width:{size:3080,type:D.WidthType.DXA},shading:{fill:accent,type:D.ShadingType.CLEAR},
                children:[new D.Paragraph({children:[new D.TextRun({text:'RIDGE Target',bold:true,font:'Arial',size:20,color:'FFFFFF'})]})]
              })
            ]}),
            metricRow('Purchase Price',data.price,''),
            metricRow('Price PSF',data.psf,''),
            metricRow('Building SF',data.sf,''),
            metricRow('Levered IRR',data.irr,'12–16%'),
            metricRow('Equity Multiple',data.em,'≥ 2.0x'),
            metricRow('Hold Period',data.hold,'5 years'),
            metricRow('Going-in Cap Rate',data.cap,''),
            metricRow('Yield on Cost (Yr 3)',data.yoc,'7.5–8.0%'),
            metricRow('LTV',data.ltv,'≤ 65%')
          ]
        }),
        spacer(),

        // Deal Thesis
        hdr('Deal Thesis & Overview',D.HeadingLevel.HEADING_1),
        ...textBlock(thesisText||(data.thesis?data.thesis:'')),
        spacer(),

        // Market Context
        hdr('Market / Submarket Context',D.HeadingLevel.HEADING_1),
        ...textBlock(marketText),
        spacer(),

        // Pros
        hdr('Pros',D.HeadingLevel.HEADING_1),
        ...pcBlock(pros,'pro'),
        spacer(),

        // Cons
        hdr('Cons',D.HeadingLevel.HEADING_1),
        ...pcBlock(cons,'con'),
        spacer(),

        // Risk Analysis
        hdr('Risk Analysis',D.HeadingLevel.HEADING_1),
        ...textBlock(riskText),
        spacer(),

        // Recommendation
        hdr('IC Recommendation',D.HeadingLevel.HEADING_1),
        ...textBlock(recText),
        spacer(),

        // Footer note
        new D.Paragraph({
          spacing:{before:400},
          border:{top:{style:D.BorderStyle.SINGLE,size:1,color:'DDDDDD',space:1}},
          children:[new D.TextRun({text:'RIDGE — Confidential, Internal Use Only. Generated '+date+'.',font:'Arial',size:18,color:'999999'})]
        })
      ]
    }]
  });

  D.Packer.toBlob(doc).then(function(blob){
    var a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download=(addr.replace(/[^a-z0-9]/gi,'_').slice(0,40)||'Investment_Summary')+'_RIDGE.docx';
    a.click();
  });
}

var psfUserEdited=false;
function psфManual(){psfUserEdited=true;var lbl=document.getElementById('isr-psf-auto-lbl');if(lbl)lbl.textContent='(manual)';}
function calcPSF(){
  psfUserEdited=false;
  var priceRaw=document.getElementById('isr-price').value.replace(/[$,\s]/g,'');
  var sfRaw=document.getElementById('isr-sf').value.replace(/[,\s]/g,'');
  var price=parseFloat(priceRaw),sf=parseFloat(sfRaw);
  var psfEl=document.getElementById('isr-psf'),lbl=document.getElementById('isr-psf-auto-lbl');
  if(price>0&&sf>0){
    var psf=Math.round(price/sf);
    psfEl.value='$'+psf.toLocaleString();
    psfEl.style.background='rgba(232,200,74,0.08)';
    psfEl.style.borderColor='var(--accent)';
    if(lbl)lbl.textContent='(auto-calculated)';
  } else {
    if(!psfUserEdited){psfEl.value='';psfEl.style.background='';psfEl.style.borderColor='';}
    if(lbl)lbl.textContent='(auto-calculated)';
  }
}
function copyOut(){
  navigator.clipboard.writeText(curOutput).then(function(){
    var b=document.getElementById('copy-btn');b.textContent='Copied!';
    setTimeout(function(){b.textContent='Copy Output';},2000);
  });
}

function exportOut(){
  if(curMode==='picasso'){
    var html=curOutput.replace(/^```html?\n?/,'').replace(/\n?```$/,'').trim();
    var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([html],{type:'text/html'}));
    a.download=(document.getElementById('pic-sub').value.trim().replace(/[^a-z0-9]/gi,'_')||'Lease_Comp_Map')+'_Picasso.html';a.click();
  } else {
    var content=document.getElementById('res-content').innerHTML;
    var title=document.getElementById('res-title').textContent;
    var toolLabel=curMode==='gavel'?'The Gavel':curMode==='isr'?'Memo':'RIDGE / SCOUT';
    var pw='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Ridge — '+title+'</title><style>'+
      '@page{size:letter;margin:.75in}*{box-sizing:border-box;margin:0;padding:0}'+
      'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#fff;color:#1a1a1a;font-size:11pt;line-height:1.65}'+
      '.cover{background:#0d1117;color:#e6edf3;padding:36pt 40pt 28pt;margin-bottom:28pt}'+
      '.cm{background:#e8c84a;color:#000;font-weight:900;font-size:13pt;padding:5pt 9pt;border-radius:5pt}'+
      '.isr-edit-bar{display:none}'+
      'input.edit-field{border:none;background:transparent;color:#1a1a1a;font-size:inherit;font-weight:inherit;padding:0;width:auto}'+
      '.out h1{font-size:15pt;font-weight:700;color:#1a3a6b;margin:0 0 14pt;border-bottom:2pt solid #1a3a6b;padding-bottom:6pt}'+
      '.out h2{font-size:12pt;font-weight:700;color:#1a3a6b;margin:20pt 0 8pt;border-bottom:1pt solid #dde3ed;padding-bottom:5pt}'+
      '.out h3{font-size:10.5pt;font-weight:700;color:#c8102e;margin:14pt 0 5pt}'+
      '.out p{margin:0 0 8pt}.out ul{margin:0 0 8pt 16pt}.out li{margin-bottom:3pt}'+
      '.out strong{font-weight:700}.out em{color:#555}'+
      '.out hr{border:none;border-top:1pt solid #dde3ed;margin:16pt 0}'+
      '.out table{width:100%;border-collapse:collapse;margin:10pt 0;font-size:9.5pt}'+
      '.out th{background:#1a3a6b;color:#fff;font-size:8.5pt;font-weight:700;text-transform:uppercase;padding:7pt 9pt;text-align:left;border:1pt solid #1a3a6b}'+
      '.out td{padding:6pt 9pt;border:1pt solid #dde3ed;vertical-align:top}.out tr:nth-child(even) td{background:#f4f6fa}'+
      '.isr-item{margin-bottom:14pt;padding-bottom:14pt;border-bottom:1pt solid #eee}'+
      '.edit-field{border:none;background:transparent;color:inherit;padding:0;font:inherit;width:100%}'+
      'footer{margin-top:28pt;padding-top:10pt;border-top:1pt solid #dde3ed;font-size:8pt;color:#999;display:flex;justify-content:space-between}'+
      '@media print{body{print-color-adjust:exact;-webkit-print-color-adjust:exact}}'+
      '</style></head><body>'+content+
      '<footer><span>RIDGE / '+toolLabel+' — Confidential, Internal Use Only</span><span>'+new Date().toLocaleDateString()+'</span></footer>'+
      '</body></html>';
    var w=window.open('','_blank');w.document.write(pw);w.document.close();
    w.onload=function(){w.focus();w.print();};
  }
}
</script>
</body>
</html>
