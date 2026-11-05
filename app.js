const WA_NUMBER="5562999999999"; // número da loja: DDI + DDD + número
const $=s=>document.querySelector(s),brl=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0});
const ls={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const pmt=(pv,i,n)=>i?pv*i/(1-Math.pow(1+i,-n)):pv/n;
const wa=t=>"https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(t);
let CARS=[{"id": 1, "n": "SUV Elétrico Lima", "t": "SUV", "cond": "Novo", "y": 2025, "km": 0, "p": 229900, "cv": 215, "a": 420, "z": "7,4", "bat": 60, "cor": "Verde-limão", "img": "img/car1.webp", "fx": ["Teto panorâmico", "Câmera 360°", "Multimídia 15 pol.", "Carregador CCS"]}, {"id": 2, "n": "SUV Cupê Elétrico Vermelho", "t": "SUV", "cond": "Novo", "y": 2025, "km": 0, "p": 259900, "cv": 245, "a": 480, "z": "6,8", "bat": 71, "cor": "Vermelho metálico", "img": "img/car2.webp", "fx": ["Design cupê", "Piloto semiautônomo", "Som premium", "Carregador CCS"]}, {"id": 3, "n": "SUV Elétrico Branco Pérola", "t": "SUV", "cond": "Seminovo", "y": 2024, "km": 12000, "p": 209900, "cv": 204, "a": 400, "z": "8,1", "bat": 59, "cor": "Branco pérola", "img": "img/car3.webp", "fx": ["7 lugares", "Teto solar", "Revisado", "Garantia de 1 ano"]}, {"id": 4, "n": "Crossover Elétrico Grafite", "t": "SUV", "cond": "Seminovo", "y": 2024, "km": 9000, "p": 239900, "cv": 223, "a": 430, "z": "7,6", "bat": 58, "cor": "Cinza grafite", "img": "img/car4.webp", "fx": ["Faróis em LED", "Painel digital", "Revisado", "Garantia de 1 ano"]}, {"id": 5, "n": "SUV Cupê Elétrico Cobre", "t": "SUV", "cond": "Novo", "y": 2025, "km": 0, "p": 349900, "cv": 313, "a": 520, "z": "5,9", "bat": 90, "cor": "Cobre metálico", "img": "img/car5.webp", "fx": ["Tração integral", "Teto panorâmico", "Assistente de voz", "Carga rápida"]}, {"id": 6, "n": "BYD Dolphin", "t": "Hatch", "cond": "Seminovo", "y": 2024, "km": 8000, "p": 139900, "cv": 95, "a": 291, "z": "12,3", "bat": 44.9, "cor": "Azul", "img": "img/car6.webp", "fx": ["Ideal para a cidade", "Central rotativa", "Revisado", "Garantia de 1 ano"]}];
const st={tipo:"Todos",q:"",max:0,ord:"",onlyFav:false,fav:new Set(ls.get("fav",[])),cmp:new Set()};
let io;function observe(){io=io||new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".reveal:not(.in)").forEach(el=>io.observe(el))}
function tilt(el){el.addEventListener("mousemove",e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;el.style.setProperty("--mx",x*100+"%");el.style.setProperty("--my",y*100+"%");el.style.transform=`perspective(800px) rotateY(${(x-.5)*10}deg) rotateX(${(.5-y)*10}deg) translateY(-4px)`});el.addEventListener("mouseleave",()=>el.style.transform="")}
addEventListener("mousemove",e=>{const g=$("#glow");g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"});

const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,n=+el.dataset.n;let i=0;const t=setInterval(()=>{i+=Math.ceil(n/50);if(i>=n){i=n;clearInterval(t)}el.textContent=i},30);co.unobserve(el)}));
document.querySelectorAll("[data-n]").forEach(el=>co.observe(el));
/* ESTOQUE */
function chips(){const ts=["Todos",...new Set(CARS.map(c=>c.t))];$("#chips").innerHTML=ts.map(t=>`<button class="chip ${t===st.tipo?"on":""}" data-t="${t}">${t}</button>`).join("")}
function list(){let l=CARS.filter(c=>(st.tipo==="Todos"||c.t===st.tipo)&&c.p<=st.max&&(!st.onlyFav||st.fav.has(c.id))&&[c.n,c.t,c.cor,c.cond,c.y].join(" ").toLowerCase().includes(st.q));
 if(st.ord==="a")l.sort((a,b)=>a.p-b.p);if(st.ord==="d")l.sort((a,b)=>b.p-a.p);if(st.ord==="r")l.sort((a,b)=>b.a-a.a);return l}
const card=c=>`<article class="card reveal" data-id="${c.id}"><div class="pic"><img src="${c.img}" alt="${c.n}" loading="lazy"><span class="badge">${c.cond} · ${c.t}</span><button class="fv ${st.fav.has(c.id)?"on":""}" data-fav="${c.id}" aria-label="Favoritar">♥</button></div><div class="info"><h3>${c.n}</h3><div class="meta">${c.y} · ${c.km?c.km.toLocaleString("pt-BR")+" km":"0 km"} · ${c.cor}</div><div class="specs"><span>${c.cv} cv</span><span>${c.a} km</span><span>0–100 ${c.z}s</span></div><div class="bat"><i style="--w:${Math.min(100,c.a/5.6)}%"></i></div><div class="row"><div><div class="price">${brl(c.p)}</div><div class="pm">a partir de ${brl(pmt(c.p*.8,.0149,48))}/mês</div></div><button class="btn mini">Detalhes</button></div><label class="cmp"><input type="checkbox" data-cmp="${c.id}" ${st.cmp.has(c.id)?"checked":""}> Comparar</label></div></article>`;
function render(){const l=list();$("#cnt").textContent=l.length+(l.length===1?" veículo":" veículos");$("#grid").innerHTML=l.length?l.map(card).join(""):'<p class="sub">Nenhum veículo com esses filtros. Que tal perguntar à nossa IA?</p>';document.querySelectorAll(".card").forEach(tilt);observe()}
$("#chips").onclick=e=>{const t=e.target.dataset.t;if(t){st.tipo=t;chips();render()}};
$("#q").oninput=e=>{st.q=e.target.value.toLowerCase().trim();render()};
$("#mx").oninput=e=>{st.max=+e.target.value;$("#mxv").textContent=brl(st.max);render()};
$("#ord").onchange=e=>{st.ord=e.target.value;render()};
$("#favt").onclick=e=>{st.onlyFav=!st.onlyFav;e.currentTarget.classList.toggle("on",st.onlyFav);render()};
$("#grid").onclick=e=>{const f=e.target.closest("[data-fav]");if(f){const id=+f.dataset.fav;st.fav.has(id)?st.fav.delete(id):st.fav.add(id);ls.set("fav",[...st.fav]);f.classList.toggle("on");return}
 if(e.target.closest(".cmp"))return;const c=e.target.closest(".card");if(c)openCar(+c.dataset.id)};
$("#grid").onchange=e=>{const id=+e.target.dataset.cmp;if(!id)return;if(e.target.checked){if(st.cmp.size>=3){e.target.checked=false;return}st.cmp.add(id)}else st.cmp.delete(id);cmpBar()};
/* MODAL */
const md=$("#md"),show=h=>{$("#mc").innerHTML=h;md.classList.add("on")},hide=()=>md.classList.remove("on");
$("#mx2").onclick=hide;md.onclick=e=>{if(e.target===md)hide()};addEventListener("keydown",e=>{if(e.key==="Escape")hide()});
function openCar(id){const c=CARS.find(x=>x.id===id);const sp=[["Potência",c.cv+" cv"],["Autonomia","~"+c.a+" km"],["0–100 km/h",c.z+" s"],["Bateria",c.bat+" kWh"],["Ano",c.y],["Km",c.km.toLocaleString("pt-BR")]];
 show(`<div class="mg"><div class="mpic"><img src="${c.img}" alt="${c.n}"></div><div><span class="badge st">${c.cond} · ${c.t}</span><h3>${c.n}</h3><p class="meta">${c.cor}</p><div class="price">${brl(c.p)}</div><div class="sp">${sp.map(([k,v])=>`<div><small>${k}</small><b>${v}</b></div>`).join("")}</div><div class="specs">${c.fx.map(x=>`<span>${x}</span>`).join("")}</div><div class="mbtn"><button class="btn" id="mSim">Simular financiamento</button><button class="btn ghost" id="mIa">Perguntar à IA</button><a class="btn ghost" target="_blank" rel="noopener" href="${wa("Olá! Quero agendar um test-drive do "+c.n+" "+c.y+".")}">Test-drive no WhatsApp</a></div></div></div>`);
 $("#mSim").onclick=()=>{hide();$("#sCar").value=c.id;setCar();$("#financiar").scrollIntoView()};
 $("#mIa").onclick=()=>{hide();openChat();ask(`Quero saber mais sobre o ${c.n} ${c.y}. Vale a pena?`)}}
function cmpBar(){const n=st.cmp.size;$("#cb").classList.toggle("on",n>0);$("#cbt").textContent=n+" selecionado"+(n>1?"s":"");$("#cbo").disabled=n<2}
$("#cbo").onclick=()=>{const l=CARS.filter(c=>st.cmp.has(c.id));const rows=[["Preço",c=>brl(c.p)],["Ano",c=>c.y],["Km",c=>c.km.toLocaleString("pt-BR")],["Potência",c=>c.cv+" cv"],["Autonomia",c=>c.a+" km"],["0–100",c=>c.z+" s"],["Bateria",c=>c.bat+" kWh"],["Cor",c=>c.cor]];
 show(`<h3>Comparar veículos</h3><div style="overflow-x:auto"><table class="ct"><tr><th></th>${l.map(c=>`<th><img class="ci" src="${c.img}" alt=""><br>${c.n}</th>`).join("")}</tr>${rows.map(([k,f])=>`<tr><th>${k}</th>${l.map(c=>`<td>${f(c)}</td>`).join("")}</tr>`).join("")}</table></div>`)};
$("#cbx").onclick=()=>{st.cmp.clear();document.querySelectorAll("[data-cmp]").forEach(i=>i.checked=false);cmpBar()};
/* ECONOMIA */
function eco(){const km=+$("#eK").value,g=+$("#eG").value,gas=km/12*g,el=km/6*.95;$("#eKv").textContent=km.toLocaleString("pt-BR")+" km";$("#eGv").textContent=g.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
 $("#cG").textContent=brl(gas)+"/mês";$("#cE").textContent=brl(el)+"/mês";$("#bE").style.width=el/gas*100+"%";$("#eS").textContent="Economia de "+brl(gas-el)+"/mês · "+brl((gas-el)*12)+"/ano"}
$("#eK").oninput=eco;$("#eG").oninput=eco;
/* SIMULADOR */
function setCar(){const c=CARS.find(x=>x.id==$("#sCar").value);if(c)$("#sV").value=c.p;calc()}
function calc(){const v=+$("#sV").value,ep=+$("#sE").value,n=+$("#sP").value,t=+$("#sT").value,i=t/100,ent=v*ep/100,fin=v-ent,pm=pmt(fin,i,n),tot=pm*n,jur=tot-fin,all=ent+tot;
 $("#vV").textContent=brl(v);$("#vE").textContent=ep+"% ("+brl(ent)+")";$("#vP").textContent=n+"x";$("#vT").textContent=t.toFixed(2).replace(".",",")+"%";
 $("#out").textContent=brl(pm);$("#rE").textContent=brl(ent);$("#rF").textContent=brl(fin);$("#rJ").textContent=brl(jur);$("#rT").textContent=brl(all);
 const a=ent/all*100,b=(ent+fin)/all*100;$("#don").style.background=`conic-gradient(#555b6b 0 ${a}%,var(--accent) ${a}% ${b}%,#f59e0b ${b}% 100%)`;
 $("#opts").innerHTML=[12,24,36,48,60,72].map(k=>`<button class="op ${k===n?"on":""}" data-n="${k}">${k}x<b>${brl(pmt(fin,i,k))}</b></button>`).join("");return{v,ep,n,pm,t}}
["sE","sP","sT"].forEach(id=>$("#"+id).oninput=calc);$("#sV").oninput=()=>{$("#sCar").value="0";calc()};$("#sCar").onchange=setCar;
$("#opts").onclick=e=>{const b=e.target.closest(".op");if(b){$("#sP").value=b.dataset.n;calc()}};
$("#simAsk").onclick=()=>{const s=calc();openChat();ask(`Simulei um veículo de ${brl(s.v)}, entrada de ${s.ep}% em ${s.n}x (parcela ~${brl(s.pm)}). Quais carros do estoque cabem nisso?`)};
$("#simWa").onclick=()=>{const s=calc();window.open(wa(`Olá! Fiz uma simulação no site: veículo de ${brl(s.v)}, entrada de ${s.ep}%, ${s.n}x de ~${brl(s.pm)} (taxa ${s.t}% a.m.). Pode me enviar uma proposta?`),"_blank","noopener")};
/* CHAT IA */
const hist=[];let sampleFn,busy=false;
const sysPrompt=()=>"Você é o consultor virtual da AutoPrime Electric, concessionária de veículos elétricos (Brasil). Responda SEMPRE em português do Brasil, de forma simpática, curta (máx. 5 linhas) e vendedora, sem inventar dados. Use somente o estoque abaixo. Taxa de exemplo de financiamento: 1,49% ao mês. Quando fizer sentido, convide o cliente a continuar com um consultor humano pelo WhatsApp (botão no topo do chat). Se perguntarem algo fora de veículos, volte gentilmente ao assunto.\nESTOQUE: "+JSON.stringify(CARS.map(c=>({modelo:c.n,tipo:c.t,condicao:c.cond,ano:c.y,km:c.km,preco:c.p,cv:c.cv,autonomia_km:c.a,zero_a_cem_s:c.z,cor:c.cor})));
async function llm(){
 if(window.claude&&claude.use){if(sampleFn===undefined)sampleFn=await claude.use("sample");
  if(sampleFn){const conv=hist.slice(-8).map(h=>(h.r==="u"?"Cliente: ":"Consultor: ")+h.t).join("\n");return(await sampleFn(sysPrompt()+"\n\nCONVERSA:\n"+conv+"\n\nResponda a última mensagem do cliente como Consultor:",{cache:false,modelTier:"quick"})).text}}
 const r=await fetch("/api/chat",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({messages:hist.slice(-10).map(h=>({role:h.r==="u"?"user":"assistant",content:h.t}))})});
 if(!r.ok)throw 0;const d=await r.json();if(!d.text)throw 0;return d.text}
function local(q){q=q.toLowerCase();const m=q.match(/(\d+)\s*(mil|k)/),mx=m?+m[1]*1000:null;
 if(/autonomia|rodar|km por/.test(q)){const b=[...CARS].sort((x,y)=>y.a-x.a)[0];return`Maior autonomia: ${b.n} (~${b.a} km). Quer simular o financiamento?`}
 if(/financ|parcela/.test(q)&&!m)return"Use o simulador aqui no site ou me diga um valor, ex.: “até 200 mil”. Posso chamar um consultor no WhatsApp! 😊";
 const l=CARS.filter(c=>(!mx||c.p<=mx)&&(!/suv/.test(q)||c.t==="SUV")&&(!/hatch/.test(q)||c.t==="Hatch"));
 if(!l.length)return"Não achei um carro com esse perfil agora. Quer ajustar o orçamento ou o tipo?";
 return"Encontrei estas opções:\n"+l.slice(0,3).map(c=>`• ${c.n} ${c.y} — ${brl(c.p)}`).join("\n")+"\nQuer simular o financiamento de alguma?"}
function add(t,cls){const d=document.createElement("div");d.className="m "+cls;d.textContent=t;$("#msgs").appendChild(d);$("#msgs").scrollTop=1e9;return d}
async function ask(q){if(busy||!q.trim())return;busy=true;add(q,"u");hist.push({r:"u",t:q});const w=add("","b");w.innerHTML='<span class="dots"><span></span><span></span><span></span></span>';let ans;
 try{ans=await llm()}catch(e){ans=local(q)}w.textContent=ans;hist.push({r:"a",t:ans});busy=false;$("#msgs").scrollTop=1e9}
function openChat(){$("#chat").classList.add("open");$("#hint").classList.remove("on");if(!$("#msgs").children.length)add("Olá! 👋 Sou o consultor virtual da AutoPrime Electric, movido por IA. Conte o que procura (tipo, orçamento, uso) e eu indico o carro ideal e simulo o financiamento.","b");$("#inp").focus()}
$("#wa").onclick=()=>$("#chat").classList.contains("open")?$("#chat").classList.remove("open"):openChat();
["navchat","heroChat"].forEach(id=>$("#"+id).onclick=e=>{e.preventDefault();openChat()});
$("#send").onclick=()=>{const v=$("#inp").value;$("#inp").value="";ask(v)};$("#inp").onkeydown=e=>{if(e.key==="Enter")$("#send").click()};
$("#qs").innerHTML=["Elétrico até 250 mil","Qual tem maior autonomia?","Quero um SUV","Como funciona o financiamento?"].map(q=>`<button>${q}</button>`).join("");
$("#qs").onclick=e=>{if(e.target.tagName==="BUTTON")ask(e.target.textContent)};
$("#toWa").onclick=()=>{const cli=hist.filter(h=>h.r==="u").map(h=>h.t).slice(-3).join(" | ");window.open(wa("Olá, AutoPrime! Vim pelo site e conversei com a IA."+(cli?" Interesse: "+cli:"")),"_blank","noopener")};
$("#waBtn2").onclick=()=>window.open(wa("Olá, AutoPrime! Vim pelo site e quero falar com um consultor."),"_blank","noopener");
setTimeout(()=>{if(!$("#chat").classList.contains("open"))$("#hint").classList.add("on")},4000);setTimeout(()=>$("#hint").classList.remove("on"),11000);
/* INIT */
function init(){chips();const ps=CARS.map(c=>c.p),mn=Math.min(...ps),mxp=Math.max(...ps);$("#mx").min=mn;$("#mx").max=mxp;$("#mx").value=mxp;st.max=mxp;$("#mxv").textContent=brl(mxp);
 $("#sCar").innerHTML='<option value="0">Outro valor</option>'+CARS.map(c=>`<option value="${c.id}">${c.n} — ${brl(c.p)}</option>`).join("");$("#sCar").value=CARS[0].id;setCar();eco();render()}
init();
fetch("stock.json",{cache:"no-store"}).then(r=>r.ok?r.json():Promise.reject()).then(d=>{if(Array.isArray(d)&&d.length){CARS=d;init()}}).catch(()=>{});
const cv=$("#fx"),cx=cv.getContext("2d");let P=[];function rs(){cv.width=innerWidth;cv.height=innerHeight;P=Array.from({length:Math.min(70,innerWidth/18|0)},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))}
rs();addEventListener("resize",rs);
(function f(){cx.clearRect(0,0,cv.width,cv.height);P.forEach((p,i)=>{p.x=(p.x+p.vx+cv.width)%cv.width;p.y=(p.y+p.vy+cv.height)%cv.height;cx.fillStyle="rgba(180,190,210,.5)";cx.fillRect(p.x,p.y,1.5,1.5);for(let j=i+1;j<P.length;j++){const q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<120){cx.strokeStyle="rgba(125,249,224,"+(.14*(1-d/120))+")";cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}});requestAnimationFrame(f)})();
const W=["na sua garagem.","ao seu alcance.","em silêncio.","100% elétrico."];let wi=0,ci=0,dl=false;(function ty(){const w=W[wi];ci+=dl?-1:1;$("#typed").textContent=w.slice(0,ci);let t=dl?35:75;if(!dl&&ci===w.length){dl=true;t=1500}else if(dl&&ci===0){dl=false;wi=(wi+1)%W.length;t=300}setTimeout(ty,t)})();
addEventListener("scroll",()=>{$("#prog").style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+"%"});
addEventListener("mousemove",e=>{$("#cur").style.transform=`translate(${e.clientX}px,${e.clientY}px)`});
const fr=$("#frame");document.querySelector(".hero").addEventListener("mousemove",e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;fr.style.transform=`perspective(900px) rotateY(${x*10}deg) rotateX(${-y*8}deg)`});
