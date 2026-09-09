

/* ─── LOADER ─── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

/* ─── CURSOR ─── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let rx = 0, ry = 0, mx = 0, my = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx+'px'; cursor.style.top = my+'px'; });
(function animRing(){
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(animRing);
})();

/* ─── PARTICLE CANVAS ─── */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let W, H, dots;
const COLORS = ['#6366f1','#ec4899','#06b6d4','#f59e0b'];
function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
function initDots(){
  dots = [];
  const n = Math.min(80, Math.floor(W*H/14000));
  for(let i=0;i<n;i++){
    dots.push({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
      r:Math.random()*2+1,
      c:COLORS[Math.floor(Math.random()*COLORS.length)]
    });
  }
}
function drawParticles(){
  ctx.clearRect(0,0,W,H);
  for(let i=0;i<dots.length;i++){
    const d = dots[i];
    d.x+=d.vx; d.y+=d.vy;
    if(d.x<0||d.x>W)d.vx*=-1;
    if(d.y<0||d.y>H)d.vy*=-1;
    ctx.beginPath();
    ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
    ctx.fillStyle=d.c+'99';
    ctx.fill();
    for(let j=i+1;j<dots.length;j++){
      const b=dots[j];
      const dist=Math.hypot(d.x-b.x,d.y-b.y);
      if(dist<120){
        ctx.beginPath();
        ctx.moveTo(d.x,d.y);ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=d.c+(Math.floor((1-dist/120)*50).toString(16).padStart(2,'0'));
        ctx.lineWidth=.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
resize(); initDots(); drawParticles();
window.addEventListener('resize',()=>{resize();initDots();});

/* ─── NAVBAR ─── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled', window.scrollY>60);
});
hamburger.addEventListener('click',()=>{
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

/* ─── INTERSECTION OBSERVER ─── */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // trigger skill bar fill
      if(e.target.classList.contains('skill-item')){
        const fill = e.target.querySelector('.skill-fill');
        if(fill) fill.style.width = fill.dataset.w + '%';
      }
    }
  });
},{threshold:.15});

document.querySelectorAll(
  '.skill-item, .chip, .tl-item, .proj-card, .edu-card, .cert-card, .contact-info-card'
).forEach(el=>io.observe(el));

/* ─── 3D CARD TILT ─── */
const card = document.getElementById('heroCard');
if(card){
  document.addEventListener('mousemove',e=>{
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (e.clientX-cx)/rect.width;
    const dy = (e.clientY-cy)/rect.height;
    card.style.transform = `rotateY(${dx*18}deg) rotateX(${-dy*18}deg) translateY(${-8}px)`;
  });
  document.addEventListener('mouseleave',()=>{
    card.style.transform = '';
  });
}

/* ─── AVATAR RIPPLE ─── */
const avatar = document.getElementById('avatar');
if(avatar){
  avatar.addEventListener('click', e => {
    const r = document.createElement('span');
    r.className='ripple';
    r.style.left = '50%'; r.style.top = '50%';
    avatar.appendChild(r);
    setTimeout(()=>r.remove(), 650);
  });
}

/* ─── STAGGER CHIP DELAYS ─── */
document.querySelectorAll('.chip').forEach((c,i)=>{
  c.style.transitionDelay = (i*0.04)+'s';
});
document.querySelectorAll('.cert-card').forEach((c,i)=>{
  c.style.transitionDelay = (i*0.08)+'s';
});
document.querySelectorAll('.contact-info-card').forEach((c,i)=>{
  c.style.transitionDelay = (i*0.07)+'s';
});
document.querySelectorAll('.proj-card').forEach((c,i)=>{
  c.style.transitionDelay = (i*0.1)+'s';
});
document.querySelectorAll('.tl-item').forEach((c,i)=>{
  c.style.transitionDelay = (i*0.1)+'s';
});