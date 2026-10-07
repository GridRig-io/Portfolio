(()=>{
const $=(s,r=document)=>r.querySelector(s),pg=document.body.dataset.page;
const links=[['index.html','home'],['works.html','works'],['about.html','about-me'],['services.html','services'],['contact.html','contact']];
document.body.insertAdjacentHTML('afterbegin',`<div id="glow"></div><div id="rail"><i></i></div><div id="wipe"></div>
<header><div class="wrap"><a class="logo" href="index.html"><b></b>Victor.</a><button id="burger" aria-expanded="false" aria-controls="nav">menu</button>
<nav id="nav" aria-label="Main">${links.map(l=>`<a href="${l[0]}" ${l[0]==pg?'aria-current="page"':''}><span>#</span>${l[1]}</a>`).join('')}</nav></div></header>`);
$('main').insertAdjacentHTML('afterend',`<footer><div class="wrap"><div><a class="logo" href="index.html"><b></b>Victor Mbamalu</a><p>UI/UX designer and WordPress developer</p><p>mbamaluvictor1@gmail.com</p></div>
<div><p>Abuja, Nigeria</p><p><a href="tel:+2349030633416">+234 903 063 3416</a></p><p><a href="https://wa.me/2349030633416">WhatsApp</a></p></div></div><p class="copy">&copy; ${new Date().getFullYear()} Victor Chukwuebuka Mbamalu</p></footer>`);
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* nav */
$('#burger').onclick=e=>{const o=$('#nav').classList.toggle('open');e.target.setAttribute('aria-expanded',o)};
/* page wipe */
document.addEventListener('click',e=>{const a=e.target.closest('a[href$=".html"]');if(!a||a.target||rm||e.metaKey||e.ctrlKey)return;e.preventDefault();$('#wipe').classList.add('go');setTimeout(()=>location.href=a.href,460)});
addEventListener('pageshow',e=>{if(e.persisted)$('#wipe').classList.remove('go')});
/* glow + parallax + rail */
addEventListener('pointermove',e=>{const g=$('#glow');g.style.setProperty('--x',e.clientX+'px');g.style.setProperty('--y',e.clientY+'px');
if(rm)return;const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;document.querySelectorAll('.sq').forEach((s,i)=>s.style.transform=`translate(${x*(i+1)*18}px,${y*(i+1)*18}px)`)});
const rail=()=>{const m=document.documentElement.scrollHeight-innerHeight;$('#rail').style.setProperty('--p',(m>0?scrollY/m:0)*(innerHeight-7)+'px')};
addEventListener('scroll',rail,{passive:true});rail();
/* typed words */
const t=$('#type');if(t){const w=['designs interfaces','builds WordPress sites','reads the analytics','ships brand identities'];let i=0,c=0,d=0;
if(rm)t.textContent=w[0];else(function k(){const s=w[i];c+=d?-1:1;t.textContent=s.slice(0,c);let n=d?28:60;if(!d&&c==s.length){d=1;n=1600}else if(d&&!c){d=0;i=(i+1)%w.length;n=300}setTimeout(k,n)})()}
/* loader (once per session) */
const L=$('#load');if(L){let seen=0;try{seen=sessionStorage.getItem('v')}catch(e){}
if(seen||rm)L.remove();else{const lines=['> mounting layout','> loading 5 pages','> <b>victor.portfolio ready</b>'],pre=$('pre',L),bar=$('#bar i'),pc=$('#pct');let p=0;
const iv=setInterval(()=>{p+=Math.ceil(Math.random()*9);if(p>=100){p=100;clearInterval(iv);try{sessionStorage.setItem('v',1)}catch(e){}setTimeout(()=>{L.classList.add('out');setTimeout(()=>L.remove(),800)},350)}
pc.textContent=p+'%';bar.style.width=p+'%';pre.innerHTML=lines.slice(0,Math.ceil(p/34)).join('\n')},70)}}
/* contact form */
const f=$('#cf');if(f)f.onsubmit=e=>{e.preventDefault();const m=$('#msg'),d=new FormData(f);m.className='';
if(d.get('company'))return;
const n=d.get('name').trim(),em=d.get('email').trim(),b=d.get('message').trim();
if(!n||!/^\S+@\S+\.\S+$/.test(em)||b.length<10){m.className='err';m.textContent='Add your name, a valid email and a message of at least 10 characters.';return}
const sub=encodeURIComponent(`${d.get('topic')} enquiry from ${n}`),body=encodeURIComponent(`${b}\n\nFrom: ${n} (${em})`);
m.className='ok';m.textContent='Opening your email app with the message ready to send.';
location.href=`mailto:mbamaluvictor1@gmail.com?subject=${sub}&body=${body}`}
})();
