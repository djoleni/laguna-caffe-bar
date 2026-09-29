const $=id=>document.getElementById(id);
const M={
burgeri:[["Double Smash · 480 g","Junetina 160 g, burger sos, čedar, čedar sos, iceberg, crveni luk, kiseli krastavčići, brioche zemička, dip 'n fry krompirići 100 g",930],["Bacon Double Smash · 530 g","Junetina 160 g, pančeta, čedar, burger sos, iceberg, crveni luk, kiseli krastavčići, paradajz, brioche zemička, dip 'n fry krompirići 100 g",980],["Chicken · 395 g","Pileći file 200 g, majonez, iceberg, paradajz, kiseli krastavac, brioche zemička, kečap, dip 'n fry krompirići 100 g",820],["Veggie · 395 g","Vege pljeskavica 100 g, iceberg, humus, paradajz, brioche zemička, spicy veggies 100 g",720]],
wrap:[["Cezar · 320 g","Piletina 150 g, iceberg, cezar dresing, cherry paradajz, hrskava pančeta, pomfrit 100 g",740],["Giros · 430 g","Piletina 150 g, tzatziki, iceberg, paradajz, luk, pomfrit 100 g",720],["Veggie · 250 g","Humus 100 g, iceberg, paradajz, sveža paprika, spicy veggies 100 g",740]],
snacks:[["Pomfrit · 300 g","",320],["Dip 'n Fry · 300 g","",470],["Batat · 300 g","",470],["Spicy Veggies · 300 g","",320],["Onion Rings · 300 g","",470],["Black Nuggets · 250 g","",620],["Delight Cheese · 250 g","",620],["Dip 'n Fry + parmezan + pančeta · 300 g","",670],["Pomfrit + čedar sos + vlašac · 300 g","",590]],
bites:[["Brusketi","Tost hleb, pesto sos, suva pečenica, cherry paradajz, beli luk",450]],
dodaci:[["Pita hleb","1 komad",100],["Tost hleb","1 parče",30],["Jaje","1 komad",100]],
zestoka:[["Vodka",210],["Black Puschkin",230],["Smirnoff",290],["Belvedere",650],["Gin",210],["Gordon's Gin",290],["Bombay Saphire Gin",410],["Gordon's Pink Gin",330],["Havana Club Anejo Bianco",300],["Havana Club 7 Y.O",410],["Malibu",190],["Pitu",310],["Salitos",310],["Salitos Gold",330],["Johnie Walker Red",310],["Johnie Walker Black",450],["Chivas 12 Y.O",470],["Jameson",350],["Tullamore Dew",370],["Jack Daniel's Old No 7",420],["Four Roses",390],["Courvoisier V.S",420],["Courvoisier V.S.O.P",750],["Vinjak 5",330],["Souther Comfort",350],["Absinth",300]],
likeri:[["Amareto",190],["Triple Sec",190],["Blue Curacao",190],["Cream de Cassis",190],["Elderflower",190],["Grenadine",190],["Archers",190],["Limoncelo",190],["Chamboard",350],["Bailey's",300],["Kahlua",250],["Frangelico",350],["Martini Bianco",300],["Cinzano Rosso",300],["Cinzano Bianco",300],["Campari",300],["Aperol",250],["Ouzo",250],["Jagermeister",310],["Gorki List",210]]};
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
for(const k in M)$(k).innerHTML=M[k].map(r=>{const p=r[r.length-1],n=r[0],d=r.length>2?r[1]:'';return `<div class="it"><div><b>${esc(n)}</b>${d?`<span>${esc(d)}</span>`:''}</div><i class="pr">${p}</i></div>`}).join('');
const tabs=[['t1','p1'],['t2','p2']];
tabs.forEach(([t])=>$(t).onclick=()=>tabs.forEach(([a,b])=>{const on=a===t;$(a).setAttribute('aria-selected',on);$(b).hidden=!on}));
// radno vreme (Europe/Belgrade)
const days=['Nedelja','Ponedeljak','Utorak','Sreda','Četvrtak','Petak','Subota'],close=[0,0,0,0,0,1,1];
const order=[1,2,3,4,5,6,0];
const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Belgrade',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());
const g=t=>parts.find(p=>p.type===t).value;
const d=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(g('weekday')),m=(+g('hour')%24)*60+ +g('minute');
const isOpen=(m>=480)||(m<60&&close[(d+6)%7]===1)?(m>=480?m<(close[d]?1500:1440):true):false;
$('hours').innerHTML=order.map(i=>`<tr class="${i===d?'today':''}"><td>${days[i]}</td><td>08:00 – ${close[i]?'01:00':'00:00'}</td></tr>`).join('');
$('status').className='status'+(isOpen?' open':'');$('status').lastElementChild.textContent=isOpen?'Otvoreno sada':'Trenutno zatvoreno';
// događaji (podaci u js/data.js)
const MON=['JAN','FEB','MAR','APR','MAJ','JUN','JUL','AVG','SEP','OKT','NOV','DEC'];
const today=new Date().toISOString().slice(0,10);
const evCard=e=>{const d=new Date(e.date+'T12:00');return `<article class="evc${e.img?' has':''}">${e.img?`<img src="${e.img}" alt="Plakat: ${esc(e.title)}" loading="lazy">`:''}<div class="evb"><div class="dt"><b>${d.getDate()}</b><span>${MON[d.getMonth()]}</span></div><div><span class="tag">${esc(e.type||'Događaj')}</span><h3>${esc(e.title)}</h3><p>${esc(e.desc||'')}</p><small>${[e.time,e.price].filter(Boolean).map(esc).join(' · ')}</small></div></div></article>`};
const up=EVENTS.filter(e=>e.date>=today).sort((a,b)=>a.date<b.date?-1:1),past=EVENTS.filter(e=>e.date<today).sort((a,b)=>a.date<b.date?1:-1);
$('evup').innerHTML=up.length?up.map(evCard).join(''):`<div class="evempty"><b>Novi događaji uskoro</b><p>Trenutno nema zakazanih događaja. Program objavljujemo na našem Instagram profilu.</p><a class="btn pri" href="${IG}" target="_blank" rel="noopener"><svg class="ic"><use href="#i-ig"/></svg>Prati najave</a></div>`;
if(past.length){$('evpastw').hidden=false;$('evpast').innerHTML=past.slice(0,6).map(evCard).join('')}
// karijera
const ul=(t,a)=>`<div><h4>${t}</h4><ul>${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`;
$('jobs').innerHTML=JOBS.map((r,i)=>`<details class="job"><summary><span>${esc(r.title)}</span><i class="tag">${esc(r.type)}</i></summary><p>${esc(r.desc)}</p><div class="jc">${ul('Šta radiš',r.duties)}${ul('Šta tražimo',r.reqs)}</div><a href="#apply" data-p="${esc(r.title)}" class="jl">Prijavi se <svg class="ic"><use href="#i-arrow"/></svg></a></details>`).join('')||'<p class="lead">Trenutno nema otvorenih pozicija, ali uvek rado čitamo prijave.</p>';
$('pos').innerHTML=JOBS.map(r=>`<option>${esc(r.title)}</option>`).join('')+'<option>Otvorena prijava</option>';
document.querySelectorAll('.jl').forEach(a=>a.onclick=()=>{$('pos').value=a.dataset.p});
$('apply').onsubmit=e=>{e.preventDefault();const f=e.target,b=`Ime: ${f.n.value}\nTelefon: ${f.t.value}\nPozicija: ${f.p.value}\n\n${f.m.value}`;location.href=`mailto:${MAIL}?subject=${encodeURIComponent('Prijava za posao - '+f.p.value)}&body=${encodeURIComponent(b)}`};
// mobilni meni
$('burger').onclick=()=>{const o=document.body.classList.toggle('menu');$('burger').setAttribute('aria-expanded',o)};
$('nav').onclick=e=>{if(e.target.tagName==='A'){document.body.classList.remove('menu');$('burger').setAttribute('aria-expanded',false)}};
// reveal
// reveal: elementi koji uđu u kadar zajedno pojavljuju se jedan za drugim (mekano, sa kašnjenjem)
const io=new IntersectionObserver(es=>{
 es.filter(x=>x.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top||a.boundingClientRect.left-b.boundingClientRect.left)
  .forEach((x,i)=>{x.target.style.setProperty('--d',Math.min(i*90,450)+'ms');x.target.classList.add('in');io.unobserve(x.target)})
},{threshold:.1,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('section h2,.evc,.job,.apply,.cc,.gal figure,.board').forEach(n=>{n.classList.add('rv');io.observe(n)});
$('yr').textContent=new Date().getFullYear();

// ===== v3: skrol, hero, lightbox =====
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover)').matches;
// progress + header hide + parallax
const hd=document.querySelector('header'),hero=document.querySelector('.hero');let ly=0,tk=false;
const onScroll=()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;$('prog').style.transform=`scaleX(${h>0?y/h:0})`;
 hd.classList.toggle('hide',y>ly&&y>300&&!document.body.classList.contains('menu'));hd.classList.toggle('solid',y>20);ly=y;
 if(!rm&&!matchMedia('(max-width:860px)').matches){document.querySelectorAll('.gal img,.car .ph img').forEach(im=>{const r=im.parentElement.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)im.style.setProperty('--py',((r.top+r.height/2-innerHeight/2)*-.06).toFixed(1)+'px')})}
 tk=false};
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();

// aktivni link u navigaciji
const secs=[...document.querySelectorAll('main section[id]')],links=[...document.querySelectorAll('nav a')];
secs.forEach(s=>new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+s.id))}),{rootMargin:'-45% 0px -50% 0px'}).observe(s));
// lightbox
const zs=[...document.querySelectorAll('.gal img,.amb img,.evc img,.car .ph img')];
const lb=document.createElement('div');lb.className='lb';lb.hidden=true;lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.innerHTML='<button class="lx" aria-label="Zatvori">×</button><button class="lp" aria-label="Prethodna">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="lnx" aria-label="Sledeća">›</button>';document.body.appendChild(lb);
let zi=0,lf=null;const li=lb.querySelector('img'),lc=lb.querySelector('figcaption');
const show=i=>{zi=(i+zs.length)%zs.length;const im=zs[zi];li.src=im.currentSrc||im.src;li.alt=im.alt;const f=im.closest('figure');lc.textContent=(f&&f.querySelector('figcaption')?f.querySelector('figcaption').textContent:im.alt)||''};
const openLb=i=>{lf=document.activeElement;show(i);lb.hidden=false;requestAnimationFrame(()=>lb.classList.add('on'));document.body.style.overflow='hidden';lb.querySelector('.lx').focus()};
const closeLb=()=>{lb.classList.remove('on');document.body.style.overflow='';setTimeout(()=>{lb.hidden=true},250);lf&&lf.focus()};
zs.forEach((im,i)=>{im.classList.add('zm');im.tabIndex=0;im.setAttribute('role','button');im.onclick=()=>openLb(i);im.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLb(i)}}});
lb.onclick=e=>{if(e.target===lb||e.target.classList.contains('lx'))closeLb();else if(e.target.classList.contains('lp'))show(zi-1);else if(e.target.classList.contains("lnx"))show(zi+1)};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')show(zi-1);if(e.key==='ArrowRight')show(zi+1)});
let tx=0;lb.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});lb.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)show(zi+(dx<0?1:-1))});



// ===== v5: polish =====
$('s-food').dataset.n=M.burgeri.length+M.wrap.length+M.snacks.length+M.bites.length;
$('s-drink').dataset.n=M.zestoka.length+M.likeri.length;
const cio=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;cio.disconnect();
 x.target.querySelectorAll('b').forEach(b=>{const n=+b.dataset.n;if(rm){b.textContent=n;return}const t0=performance.now();const f=t=>{const p=Math.min((t-t0)/1400,1);b.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)})}),{threshold:.4});
cio.observe($('stats'));
document.querySelectorAll('.stats div').forEach(n=>{n.classList.add('rv');io.observe(n)});
// spotlight na karticama
document.querySelectorAll('.cc,.evc,.board,.stats div,.apply').forEach(n=>{n.classList.add('spot');n.addEventListener('pointermove',e=>{const r=n.getBoundingClientRect();n.style.setProperty('--sx',e.clientX-r.left+'px');n.style.setProperty('--sy',e.clientY-r.top+'px')})});
// nazad na vrh
const tt=$('totop');addEventListener('scroll',()=>tt.classList.toggle('on',scrollY>700),{passive:true});tt.onclick=()=>scrollTo({top:0,behavior:'smooth'});

// marquee: dovoljno dugačak niz da se petlja nikad ne vidi
document.querySelectorAll('.marquee>div').forEach(t=>{const s=[...t.children].slice(0,t.children.length/2),set=document.createElement('div');
 s.forEach(n=>set.appendChild(n.cloneNode(true)));
 t.innerHTML='';const one=document.createElement('div');one.style.display='flex';t.appendChild(one);
 s.forEach(n=>one.appendChild(n.cloneNode(true)));const w=one.scrollWidth||600;
 const k=Math.max(1,Math.ceil(2600/w));t.innerHTML='';
 for(let i=0;i<k*2;i++)s.forEach(n=>t.appendChild(n.cloneNode(true)))});

// ===== v9: hero pozadina =====
// Mehurići: deterministički raspored (bez praćenja kursora). Animira ih CSS preko transform/opacity.
(()=>{
 const box=$('bub');
 if(box&&!rm){
  const n=matchMedia('(max-width:860px)').matches?9:16;let seed=7;const r=()=>(seed=seed*16807%2147483647)/2147483647;
  for(let i=0;i<n;i++){
   const size=Math.round(8+Math.pow(r(),1.8)*40),el=document.createElement('i');
   el.style.cssText=`--x:${(r()*96+2).toFixed(1)}%;--s:${size}px;--t:${(34-size*.35+r()*6).toFixed(1)}s;--dl:${(-r()*34).toFixed(1)}s;--w:${(4+r()*4).toFixed(1)}s;--sw:${Math.round(8+r()*18)}px;--o:${(.35+r()*.4).toFixed(2)}`;
   el.innerHTML='<b></b>';box.appendChild(el)}
 }
 // pauziraj animacije kad hero nije vidljiv
 new IntersectionObserver(([e])=>hero.classList.toggle('off',!e.isIntersecting)).observe(hero);
})();

// sakrij #hash iz adrese (meni, dugmad i "Prijavi se" linkovi i dalje glatko skrolaju)
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]');
  if(!a)return;
  const id=a.getAttribute('href').slice(1);
  const t=id?document.getElementById(id):document.body;
  if(!t)return;
  e.preventDefault();
  t.scrollIntoView({behavior:rm?'auto':'smooth'});
  history.replaceState(null,'',location.pathname+location.search);
});
// ako neko dođe na link koji već ima #hash, ukloni ga posle skoka
if(location.hash)history.replaceState(null,'',location.pathname+location.search);
