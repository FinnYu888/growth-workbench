/* ============ 个人成长工作台 · 渲染引擎 ============ */
let ACTIVE = 'home';

/* ---------- utils ---------- */
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const TONES = {
  teal:['#ccfbf1','#0d9488'], red:['#fee2e2','#ef4444'], orange:['#fef3c7','#f59e0b'],
  blue:['#dbeafe','#3b82f6'], purple:['#ede9fe','#8b5cf6'], pink:['#fce7f3','#ec4899'],
  green:['#dcfce7','#22c55e'], yellow:['#fef9c3','#ca8a04'], indigo:['#e0e7ff','#6366f1'],
  cyan:['#cffafe','#0891b2'],
};
const icBox = (tone,ic,cls='') => {
  const [bg,fg] = TONES[tone]||TONES.teal;
  return `<div class="${cls}" style="background:${bg};color:${fg}">${ic}</div>`;
};
const tag = (t,tone) => {
  const [bg,fg] = TONES[tone]||TONES.teal;
  return `<span class="tagpill" style="background:${bg};color:${fg}">${t}</span>`;
};

/* ---------- SVG charts ---------- */
function svgLine(labels, values, color, unit, lineName){
  const W=520,H=205,L=34,R=18,T=32,B=30,n=values.length;
  const max=Math.max(...values)*1.18, min=0;
  const px=i=>L+i*(W-L-R)/(n-1);
  const py=v=>T+(1-(v-min)/(max-min))*(H-T-B);
  const pts=values.map((v,i)=>[px(i),py(v)]);
  let d=`M ${pts[0][0]} ${pts[0][1]}`;
  for(let i=1;i<n;i++){
    const [x0,y0]=pts[i-1],[x1,y1]=pts[i],mx=(x0+x1)/2;
    d+=` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }
  const area=d+` L ${pts[n-1][0]} ${H-B} L ${pts[0][0]} ${H-B} Z`;
  const peakI=values.indexOf(Math.max(...values));
  const dots=pts.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${i===peakI?4.5:3}" fill="#fff" stroke="${color}" stroke-width="${i===peakI?3:2}"/>`).join('');
  const grid=[0.25,0.5,0.75,1].map(f=>{
    const y=T+(1-f)*(H-T-B);
    return `<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" stroke="#e8f2ef" stroke-width="1" stroke-dasharray="3 4"/><text x="${L-7}" y="${y+3.5}" font-size="9" fill="#9ab0ac" text-anchor="end">${Math.round(max*f)}</text>`;
  }).join('');
  const xlb=labels.map((t,i)=>`<text x="${px(i)}" y="${H-10}" font-size="9.5" fill="#9ab0ac" text-anchor="middle">${t}</text>`).join('');
  const bub=`<g><rect x="${pts[peakI][0]-17}" y="${pts[peakI][1]-27}" width="34" height="19" rx="9.5" fill="${color}"/><text x="${pts[peakI][0]}" y="${pts[peakI][1]-14}" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">${values[peakI]}</text></g>`;
  const uid='g'+Math.random().toString(36).slice(2,8);
  return `<div class="chart-wrap"><svg viewBox="0 0 ${W} ${H}" style="width:100%;display:block">
    <defs><linearGradient id="${uid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${color}" stop-opacity=".28"/><stop offset="1" stop-color="${color}" stop-opacity="0"/>
    </linearGradient></defs>
    ${grid}${xlb}
    <path d="${area}" fill="url(#${uid})"/>
    <path d="${d}" fill="none" stroke="${color}" stroke-width="2.6" stroke-linecap="round"/>
    ${dots}${bub}
  </svg><div class="legend"><span><i style="background:${color}"></i>${lineName||'数值'}${unit?` ${unit}`:''}</span></div></div>`;
}

function svgDual(labels, a, b, an, bn){
  const W=520,H=215,L=40,R=18,T=32,B=30,n=a.length;
  const maxA=Math.max(...a)*1.3||1, maxB=Math.max(...b)*1.25||1;
  const px=i=>L+i*(W-L-R)/(n-1);
  const mk=(vals,max)=>vals.map((v,i)=>[px(i),T+(1-v/max)*(H-T-B)]);
  const pa=mk(a,maxA),pb=mk(b,maxB);
  const path=p=>{let d=`M ${p[0][0]} ${p[0][1]}`;for(let i=1;i<n;i++){const mx=(p[i-1][0]+p[i][0])/2;d+=` C ${mx} ${p[i-1][1]}, ${mx} ${p[i][1]}, ${p[i][0]} ${p[i][1]}`;}return d;};
  const dots=p=>p.map(q=>`<circle cx="${q[0]}" cy="${q[1]}" r="2.8" fill="#fff" stroke-width="2"/>`).join('');
  const grid=[0.5,1].map(f=>{const y=T+(1-f)*(H-T-B);return `<line x1="${L}" y1="${y}" x2="${W-R}" y2="${y}" stroke="#e8f2ef" stroke-dasharray="3 4"/>`;}).join('');
  const xlb=labels.map((t,i)=>`<text x="${px(i)}" y="${H-10}" font-size="9.5" fill="#9ab0ac" text-anchor="middle">${t}</text>`).join('');
  return `<div class="chart-wrap"><svg viewBox="0 0 ${W} ${H}" style="width:100%;display:block">
    ${grid}${xlb}
    <path d="${path(pb)}" fill="none" stroke="#60a5fa" stroke-width="2.2" stroke-dasharray="1 0"/>
    <path d="${path(pa)}" fill="none" stroke="#14b8a6" stroke-width="2.6"/>
    ${dots(pb).replace(/stroke-width="2"/g,'stroke="#60a5fa" stroke-width="2"')}${dots(pa).replace(/stroke-width="2"/g,'stroke="#14b8a6" stroke-width="2"')}
  </svg><div class="legend"><span><i style="background:#14b8a6"></i>${an}</span><span><i style="background:#60a5fa"></i>${bn}</span></div></div>`;
}

function svgDonut(items, center, centerLabel){
  const R=62,C=2*Math.PI*R; let off=0;
  const seg=items.map(([n,p,c])=>{
    const len=p/100*C;
    const s=`<circle cx="80" cy="80" r="${R}" fill="none" stroke="${c}" stroke-width="21" stroke-dasharray="${Math.max(len-2,0)} ${C-Math.max(len-2,0)}" stroke-dashoffset="${-off}" transform="rotate(-90 80 80)" stroke-linecap="butt"/>`;
    off+=len; return s;
  }).join('');
  const lg=items.map(([n,p,c])=>`<div class="dl"><i style="background:${c}"></i>${n}<b>${p}%</b></div>`).join('');
  return `<div class="donutbox"><svg viewBox="0 0 160 160" style="width:158px;flex-shrink:0">${seg}
    <text x="80" y="76" text-anchor="middle" font-size="21" font-weight="800" fill="#2b3a38">${center}</text>
    <text x="80" y="95" text-anchor="middle" font-size="9.5" fill="#9ab0ac">${centerLabel}</text></svg>
    <div class="dlegend">${lg}</div></div>`;
}

function svgRing(pct,color,size=44,sw=6,label){
  const r=(size-sw)/2, C=2*Math.PI*r;
  return `<svg viewBox="0 0 ${size} ${size}" style="width:${size}px;height:${size}px">
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#eef6f4" stroke-width="${sw}"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"
      stroke-dasharray="${C*pct/100} ${C}" transform="rotate(-90 ${size/2} ${size/2})"/>
    ${label?`<text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-size="${size/4.4}" font-weight="700" fill="#2b3a38">${label}</text>`:''}
  </svg>`;
}

function svgBigRing(pct){
  const size=120,sw=12,r=(size-sw)/2,C=2*Math.PI*r;
  return `<svg viewBox="0 0 ${size} ${size}" style="width:120px;flex-shrink:0">
    <defs><linearGradient id="bg1x" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#14b8a6"/><stop offset="1" stop-color="#5eead4"/></linearGradient></defs>
    <circle cx="60" cy="60" r="${r}" fill="none" stroke="#eef6f4" stroke-width="${sw}"/>
    <circle cx="60" cy="60" r="${r}" fill="none" stroke="url(#bg1x)" stroke-width="${sw}" stroke-linecap="round"
      stroke-dasharray="${C*pct/100} ${C}" transform="rotate(-90 60 60)"/>
    <text x="60" y="57" text-anchor="middle" font-size="23" font-weight="800" fill="#2b3a38">${pct}%</text>
    <text x="60" y="76" text-anchor="middle" font-size="9.5" fill="#9ab0ac">今日完成率</text></svg>`;
}

function svgBars(labels, values){
  const max=Math.max(...values)*1.15;
  return `<div class="bars">${values.map((v,i)=>`
    <div class="bcol"><span class="bval">${v}</span>
      <i style="height:${Math.round(v/max*100)}%"></i>
      <span class="blb">${labels[i]}</span></div>`).join('')}</div>`;
}

/* ---------- components ---------- */
function cStats(stats){
  return `<div class="stats">${stats.map(s=>`
    <div class="stat"><div class="top">${icBox(s.tone,s.icon,'ic')}<span class="lb">${s.label}</span></div>
    <div class="v">${s.value}<small>${s.unit||''}</small></div>
    <div class="s">${s.sub}</div></div>`).join('')}</div>`;
}

function cProfile(p){
  return `<div class="card profile-card">
    <div class="avatar">${p.avatar}</div>
    <div class="pinfo">
      <div class="nm">${p.name} <span class="edit">✏️ 编辑</span></div>
      <div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>
      <div class="desc">${p.desc}</div>
    </div>
  </div>`;
}

function cTask(t){
  if(!t) return '';
  return `<div class="card task-card">
    <div class="task-ic">📋</div>
    <div class="task-body">
      <div class="t">${tag(t.tag,t.tagTone)}${t.title}</div>
      <div class="d">${t.desc||''}${t.reward?` · <b style="color:#f59e0b">🎁 ${t.reward}</b>`:''}</div>
    </div>
    <button class="btn ${t.btnDone?'done':''}">${t.btn}</button>
  </div>`;
}

function cBanner(b){
  if(!b) return '';
  return `<div class="banner"><div class="bi">${b.icon}</div>
    <div><div class="bt">${b.title}</div><div class="bd">${b.desc}</div></div></div>`;
}

function cList(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more||''}</span></h3>
    ${sec.items.map(it=>`
      <div class="lrow">${icBox(it.tone,it.ic,'lic')}
        <div class="lt"><div class="a">${it.tag?tag(it.tag,it.tagTone):''}${it.title}</div><div class="b">${it.meta||''}</div></div>
        ${it.right?`<div class="lr">${it.right}</div>`:it.done!==undefined?`<div class="ck ${it.done?'on':''}">✓</div>`:''}
      </div>`).join('')}</div>`;
}

function cTrend(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.unit||''}</span></h3>
    ${svgLine(sec.labels,sec.values,sec.color||'#14b8a6',sec.unit,sec.lineName)}</div>`;
}

function cDual(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">本月 ▾</span></h3>
    ${svgDual(sec.labels,sec.a,sec.b,sec.aname,sec.bname)}</div>`;
}

function cDonut(sec){
  return `<div class="card"><h3>${sec.title}</h3>${svgDonut(sec.items,sec.center,sec.centerLabel)}</div>`;
}

function cCalendar(){
  const wd=['一','二','三','四','五','六','日'];
  const marks={2:1,4:1,6:1,8:1,9:1,10:1,11:2,12:2};
  let cells=wd.map(w=>`<div class="h">${w}</div>`).join('');
  for(let i=1;i<=2;i++) cells+=`<div class="d dim">4/i</div>`.replace('i','');
  for(let d=1;d<=31;d++){
    const m=marks[d];
    cells+=`<div class="d ${m===2?'today':m?'ev':''}">${d}</div>`;
  }
  return `<div class="card"><h3>本月成长日历<span class="more">2024年5月 ▾</span></h3>
    <div class="cal">${cells}</div>
    <div class="legend" style="margin-top:10px"><span><i style="background:#14b8a6"></i>今天</span><span><i style="background:#a7f3d0"></i>已完成打卡</span></div></div>`;
}

function cGrid(){
  return `<div class="card"><h3>核心模块<span class="more">进入你的模块 →</span></h3>
    <div class="mgrid">${MODULES.map(m=>`
      <div class="mcell" data-go="${m.to}">${icBox(m.tone,m.icon,'gic')}
        <div><div class="gn">${m.name}</div><div class="gd">${m.desc}</div></div></div>`).join('')}</div></div>`;
}

function cQuick(sec){
  return `<div class="card"><h3>${sec.title}</h3>
    ${sec.items.map(it=>`
      <div class="lrow">${icBox(it.tone,it.ic,'lic')}
        <div class="lt"><div class="a">${it.label} · ${it.v}</div><div class="b">${it.d}</div></div>
        <div style="width:90px">${svgRing(it.pct,TONES[it.tone][1],40,5)}</div>
      </div>`).join('')}</div>`;
}

function cBigRing(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.note||''}</span></h3>
    <div class="bigring" style="margin-top:14px;justify-content:center;padding:6px 0">${svgBigRing(sec.pct)}</div></div>`;
}

function cMastery(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more||''}</span></h3>
    ${sec.rows.map(([ic,n,v])=>`
      <div class="mrow">${icBox('teal',ic,'mic')}<span class="mn">${n}</span>
        <div class="bar"><i style="width:${v}%"></i></div><span class="mv">${v}</span></div>`).join('')}</div>`;
}

function cTodo(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">还有 ${sec.items.filter(i=>!i.done).length} 项待完成</span></h3>
    ${sec.items.map(it=>`
      <div class="lrow">${icBox(it.tone,it.ic,'lic')}
        <div class="lt"><div class="a">${tag(it.tag,it.tagTone)}${it.title}</div><div class="b">${it.meta||''}</div></div>
        <div class="ck ${it.done?'on':''}">${it.done?'✓':''}</div></div>`).join('')}
    <button class="btn" style="margin-top:14px;width:100%">${sec.cta} →</button></div>`;
}

function cJournal(sec){
  const grads=['linear-gradient(135deg,#fecdd3,#fde68a)','linear-gradient(135deg,#bfdbfe,#a5f3fc)','linear-gradient(135deg,#ddd6fe,#fbcfe8)'];
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more}</span></h3>
    <div class="lrow" style="border:none;padding-left:0"><div class="lt"><div class="b" style="font-size:11px">${sec.date} · 周日</div>
    <div class="sumtxt" style="margin-top:6px">${sec.text}</div></div></div>
    <div class="photos">${sec.photos.map((p,i)=>`<div class="ph" style="background:${grads[i%3]}">${p}</div>`).join('')}
    <div class="ph more">${sec.more2||'+2'}</div></div></div>`;
}

function cRings4(sec){
  const cols=['#14b8a6','#60a5fa','#a78bfa','#f472b6'];
  return `<div class="card"><h3>${sec.title}<span class="more">本周 ▾</span></h3>
    <div class="rings4">${sec.items.map((it,i)=>`
      <div class="rc">${svgRing(it.pct,cols[i%4],64,7,it.pct+'%')}
        <div class="rn">${it.name}</div><div class="rv">${it.v}</div></div>`).join('')}</div></div>`;
}

function cCards(sec){
  const w=sec.cols===3?'33.3%':'49%';
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more||''}</span></h3>
    <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:12px">
    ${sec.items.map(it=>`
      <div style="width:calc(${w} - 5px);background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;cursor:pointer" onmouseover="this.style.boxShadow='var(--shadow)'" onmouseout="this.style.boxShadow='none'">
        <div style="height:82px;background:${it.grad};display:grid;place-items:center;font-size:34px;position:relative">
          ${it.emoji}<span class="tagpill" style="position:absolute;top:8px;left:8px;background:rgba(255,255,255,.85);color:${TONES[it.tone]?TONES[it.tone][1]:'#0d9488'}">${it.tag}</span></div>
        <div style="padding:10px 12px"><div style="font-size:12.5px;font-weight:700">${it.title}</div>
        <div style="font-size:10.5px;color:var(--ink3);margin-top:3px">${it.desc}</div></div>
      </div>`).join('')}</div></div>`;
}

function cSteps5(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more||''}</span></h3>
    <div class="steps">${sec.items.map(([ic,n,d],i)=>`
      <div class="step"><div class="n">${i+1}</div><div class="si">${ic}</div>
      <div class="sn">${n}</div><div class="sd">${d}</div></div>`).join('')}</div></div>`;
}

function cAction(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">查看全部 →</span></h3>
    ${sec.items.map((it,i)=>`
      <div class="lrow"><div class="ck ${it.done?'on':''}" data-ck="${i}">${it.done?'✓':''}</div>
        <div class="lt"><div class="a" style="${it.done?'text-decoration:line-through;color:var(--ink3)':''}">${it.t}</div></div>
        <div class="lr">${it.meta}</div></div>`).join('')}</div>`;
}

function cAction2(sec){
  const grads=['#ccfbf1','#dbeafe','#ede9fe','#fce7f3'];
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more||''}</span></h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px">
    ${sec.items.map((it,i)=>`
      <div style="background:${grads[i%4]};border-radius:13px;padding:13px 14px;display:flex;gap:11px;align-items:center">
        <b style="font-size:17px;opacity:.8">${it[0]}</b>
        <div><div style="font-size:12.5px;font-weight:700">${it[1]}</div>
        <div style="font-size:10.5px;color:var(--ink2);margin-top:2px">${it[2]}</div></div>
      </div>`).join('')}</div></div>`;
}

function cSchedule(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more||''}</span></h3>
    ${sec.items.map(it=>`
      <div class="lrow"><span style="font-size:11.5px;font-weight:700;color:var(--ink2);width:42px">${it.time}</span>
      ${icBox(it.tone,it.ic,'lic')}
        <div class="lt"><div class="a">${it.title}</div><div class="b">${it.meta}</div></div>
        <div class="lr">${it.right}</div></div>`).join('')}</div>`;
}

function cWater(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.note}</span></h3>
    <div class="water"><div style="width:76px">${svgRing(sec.pct,'#38bdf8',76,8,sec.pct+'%')}</div>
    <div style="flex:1"><div style="font-size:12px;color:var(--ink2)">今日喝水 ${sec.cups} / ${sec.total} 杯</div>
    <div class="cups">${Array.from({length:sec.total},(_,i)=>`<div class="cup ${i<sec.cups?'':'empty'}"></div>`).join('')}</div></div></div></div>`;
}

function cFood(sec){
  const grads=['linear-gradient(135deg,#fef3c7,#fde68a)','linear-gradient(135deg,#bbf7d0,#86efac)','linear-gradient(135deg,#fed7aa,#fdba74)','linear-gradient(135deg,#fecdd3,#fda4af)'];
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more}</span></h3>
    ${sec.items.map((it,i)=>`
      <div class="lrow food"><div class="fic" style="background:${grads[i%4]}">${it.ic}</div>
        <div class="lt"><div class="a">${it.title}</div><div class="b">${it.meta}</div></div>
        <div class="lr">${it.right}</div></div>`).join('')}</div>`;
}

function cRecipe(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">查看食谱 →</span></h3>
    <div style="display:flex;gap:14px;margin-top:12px;align-items:stretch">
      <div style="width:118px;border-radius:13px;background:${sec.grad};display:grid;place-items:center;font-size:44px;flex-shrink:0">${sec.emoji}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:800">${sec.title2||sec.title}</div>
        <div style="margin-top:6px">${sec.tags.map((t,i)=>tag(t,['green','orange','pink'][i%3])).join('')}</div>
        <div style="font-size:11.5px;color:var(--ink2);margin-top:7px;line-height:1.7">${sec.desc}</div>
        <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center">
          <b style="font-size:12px;color:#ef4444">${sec.kcal}</b><button class="btn" style="padding:6px 16px">查看做法 →</button></div>
      </div></div></div>`;
}

function cVcard(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more||''}</span></h3>
    <div class="vcard" style="margin-top:12px;background:${sec.grad}">
      <div class="play">▶</div>
      <div class="vinfo">${sec.emoji} ${sec.vtitle} · ${sec.vdesc}</div></div>
    <div style="margin-top:10px">${sec.tags.map((t,i)=>tag(t,['teal','blue','pink'][i%3])).join('')}</div>
    <div class="vmeta">${sec.meta.map(m=>`<span>${m}</span>`).join('')}</div>
    <button class="btn" style="margin-top:12px;width:100%">▶ ${sec.btn}</button></div>`;
}

function cStat4(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more}</span></h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px">
    ${sec.items.map(it=>`
      <div style="background:#f7fcfa;border:1px solid var(--line);border-radius:13px;padding:12px 13px">
        <div style="display:flex;align-items:center;gap:7px">${icBox(it.tone,it.ic,'lic')}<span style="font-size:11px;color:var(--ink2)">${it.label}</span></div>
        <div style="font-size:17px;font-weight:800;margin-top:8px">${it.v}<small style="font-size:10.5px;font-weight:600;color:var(--ink3)">${it.unit||''}</small></div>
        <div style="font-size:10.5px;color:var(--ink3);margin-top:4px">${it.d}</div></div>`).join('')}</div></div>`;
}

function cTimer(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more||''}</span></h3>
    <div class="timer"><div class="ringbox" id="timerRing">${timerSvg(0,sec.work)}
      <div class="tval"><b id="timerVal">25:00</b><span>专注绘画 · 剩余</span></div></div>
      <div class="tbtns"><button class="btn" id="timerBtn">▶ 开始专注</button>
      <button class="btn ghost" id="timerReset">↺ 重置</button></div>
      <div style="font-size:11px;color:var(--ink3);margin-top:10px">番茄钟：专注 ${sec.work} 分钟 · 休息 ${sec.rest} 分钟</div>
    </div></div>`;
}
function timerSvg(secLeft,total){
  const pct=1-secLeft/(total*60), size=168, sw=12, r=(size-sw)/2, C=2*Math.PI*r;
  return `<svg viewBox="0 0 ${size} ${size}" style="width:168px">
    <circle cx="84" cy="84" r="${r}" fill="none" stroke="#eef6f4" stroke-width="${sw}"/>
    <circle id="timerArc" cx="84" cy="84" r="${r}" fill="none" stroke="#14b8a6" stroke-width="${sw}" stroke-linecap="round"
      stroke-dasharray="${C*pct} ${C}" transform="rotate(-90 84 84)" style="transition:stroke-dasharray .5s"/></svg>`;
}

function cTarot(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more}</span></h3>
    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
      ${sec.tabs.map((t,i)=>`<button class="btn ${i===0?'':'ghost'}" style="padding:6px 15px;font-size:11.5px">${t}</button>`).join('')}</div>
    <div class="div-input">✏️ <span style="flex:1">${sec.placeholder}</span><span class="cnt">0/100</span></div>
    <div class="tarot-row" id="tarotRow">
      ${[1,2,3].map(i=>`<div class="tarot-card" data-tc="${i}"><span class="tc-n">卡牌 ${i}</span><span class="moon">🌙</span></div>`).join('')}
    </div>
    <button class="btn div-btn" id="tarotBtn">🔀 辅助塔罗牌</button></div>`;
}
function cCardMeaning(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more}</span></h3>
    <div style="display:flex;gap:14px;margin-top:12px">
      <div style="width:92px;height:148px;border-radius:11px;flex-shrink:0;background:linear-gradient(160deg,#fff7ed,#ffedd5);border:2px solid #fdba74;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#9a3412">
        <span style="font-size:10px;opacity:.7">${sec.num}</span><span style="font-size:34px">⚖️</span><b style="font-size:13px">${sec.name}</b></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:800">${sec.name}</div>
        <div style="margin-top:5px">${sec.tags.map((t,i)=>tag(t,['green','blue','purple'][i%3])).join('')}</div>
        <div style="font-size:11.5px;color:var(--ink2);margin-top:8px;line-height:1.75">${sec.text}</div></div></div></div>`;
}

function cStock(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more}</span></h3>
    ${sec.items.map(it=>`
      <div class="mrow">${icBox(it.tone,it.ic,'mic')}<span class="mn" style="width:64px">${it.name}</span>
        <span style="font-size:11px;color:var(--ink2);width:52px">${it.v}</span>
        <div class="bar"><i style="width:${it.pct}%;${it.pct<30?'background:linear-gradient(90deg,#f87171,#fca5a5)':''}"></i></div>
        <span class="mv" style="width:auto;font-size:10.5px;font-weight:600;color:${it.pct<30?'#ef4444':it.pct<50?'#f59e0b':'#10b981'}">${it.st}</span></div>`).join('')}</div>`;
}

function cBars(sec){
  return `<div class="card"><h3>${sec.title}<span class="more">${sec.more} ▾</span></h3>${svgBars(sec.labels,sec.values)}</div>`;
}

/* ---------- bottom ---------- */
function cBottom(pg){
  return `<div class="bottom2">
    <div class="card"><h3>📊 本周小结</h3>
      <div class="sumrow"><div class="sumtxt">${pg.summary}</div>
        <svg viewBox="0 0 90 64" style="width:86px;flex-shrink:0">
          <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2dd4bf"/><stop offset="1" stop-color="#99f6e4"/></linearGradient></defs>
          ${[26,38,30,48,42,56].map((h,i)=>`<rect x="${4+i*14}" y="${58-h}" width="9" height="${h}" rx="4" fill="url(#sg)"/>`).join('')}
          <path d="M 8 44 C 24 36, 34 40, 44 30 C 56 20, 66 22, 80 10" fill="none" stroke="#0d9488" stroke-width="2" stroke-linecap="round"/>
          <circle cx="80" cy="10" r="3.4" fill="#fff" stroke="#0d9488" stroke-width="2"/></svg></div></div>
    <div class="card"><h3>💬 今日一句</h3>
      <div class="quote" style="margin-top:12px"><span class="qi">“</span>
        <div><div class="qt">${pg.quote}</div>
        <div class="qd">—— 每天一句，送给认真生活的你</div></div></div>
      <div class="quote-art"></div></div></div>`;
}

/* ---------- page render ---------- */
function renderPage(pg){
  const secMap={
    trend:cTrend,donut:cDonut,list:cList,calendar:cCalendar,grid:cGrid,quick:cQuick,bigring:cBigRing,
    mastery:cMastery,todo:cTodo,journal:cJournal,rings4:cRings4,cards:cCards,steps5:cSteps5,action:cAction,
    action2:cAction2,schedule:cSchedule,water:cWater,food:cFood,recipe:cRecipe,vcard:cVcard,stat4:cStat4,
    timer:cTimer,tarot:cTarot,cardMeaning:cCardMeaning,stock:cStock,bars:cBars,dual:cDual,
  };
  let html=`
  <div class="topbar">
    <div class="page-head"><h1>${pg.title}</h1><div class="sub">${pg.sub}</div></div>
    <div class="search"><span class="dot">🔍</span>搜索内容、任务或笔记...</div>
    <div class="datechip">📅 ${DATE}</div>
    <div class="bell">🔔</div>
  </div>
  ${cStats(pg.stats)}
  ${pg.profile?cProfile(pg.profile):''}
  ${cTask(pg.task)}
  ${cBanner(pg.banner)}
  <div class="row">`;
  pg.sections.forEach(sec=>{
    const fn=secMap[sec.type];
    if(!fn) return;
    html+=fn(sec);
  });
  html+=`</div>`+cBottom(pg);
  return html;
}

/* ---------- sidebar ---------- */
function renderSidebar(){
  document.getElementById('sidebar').innerHTML=`
    <div class="logo"><div class="logo-mark"><i></i><i></i><i></i><i></i></div>
    <div class="logo-name">个人成长工作台</div></div>
    ${NAV.map(n=>`<div class="nav-item ${n.id===ACTIVE?'active':''}" data-nav="${n.id}">
      <span class="ic">${n.icon}</span>${n.name}</div>`).join('')}`;
}

/* ---------- interactions ---------- */
function bindEvents(){
  // nav
  document.querySelectorAll('[data-nav]').forEach(el=>el.onclick=()=>switchPage(el.dataset.nav));
  // module grid go
  document.querySelectorAll('[data-go]').forEach(el=>el.onclick=()=>switchPage(el.dataset.go));
  // checkbox toggle
  document.querySelectorAll('[data-ck]').forEach(el=>el.onclick=()=>{
    el.classList.toggle('on');
    const a=el.nextElementSibling;
    if(el.classList.contains('on')){el.textContent='✓';a.style.textDecoration='line-through';a.style.color='var(--ink3)';}
    else{el.textContent='';a.style.textDecoration='none';a.style.color='';}
  });
  bindTarot(); bindTimer();
}

function bindTarot(){
  const deck=[['节制','⚖️'],['星星','🌟'],['月亮','🌙'],['太阳','☀️'],['力量','🦁'],['魔术师','🎩']];
  document.querySelectorAll('[data-tc]').forEach(el=>el.onclick=()=>{
    if(el.classList.contains('flip')) return;
    const [n,e]=deck[Math.floor(Math.random()*deck.length)];
    el.classList.add('flip');
    el.innerHTML=`<span class="tc-n" style="color:#9a3412">${n}</span><span style="font-size:34px">${e}</span><b style="font-size:13px;margin-top:4px">${n}</b>`;
  });
  const btn=document.getElementById('tarotBtn');
  if(btn) btn.onclick=()=>document.querySelectorAll('[data-tc]').forEach(el=>el.click());
}

let timerInt=null;
function bindTimer(){
  const btn=document.getElementById('timerBtn'), rst=document.getElementById('timerReset'), val=document.getElementById('timerVal');
  if(!btn) return;
  let left=25*60;
  const draw=()=>{val.textContent=`${String(Math.floor(left/60)).padStart(2,'0')}:${String(left%60).padStart(2,'0')}`;
    const arc=document.getElementById('timerArc'), total=25*60, size=168, sw=12, r=(size-sw)/2, C=2*Math.PI*r;
    arc.setAttribute('stroke-dasharray',`${C*(1-left/total)} ${C}`);};
  btn.onclick=()=>{
    if(timerInt){clearInterval(timerInt);timerInt=null;btn.textContent='▶ 继续';return;}
    btn.textContent='⏸ 暂停';
    timerInt=setInterval(()=>{left--;draw();if(left<=0){clearInterval(timerInt);timerInt=null;btn.textContent='✔ 完成';}},1000);
  };
  rst.onclick=()=>{clearInterval(timerInt);timerInt=null;left=25*60;draw();btn.textContent='▶ 开始专注';};
}

function switchPage(id){
  ACTIVE=id;
  const pg=PAGES.find(p=>p.id===id)||PAGES[0];
  renderSidebar();
  const main=document.getElementById('main');
  main.innerHTML=renderPage(pg);
  main.style.animation='none'; void main.offsetWidth;
  bindEvents();
  window.scrollTo({top:0});
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded',()=>{switchPage('home');});
