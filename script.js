/* ============================================================
   OUR LITTLE ERA — interactions
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- hero title: letters fade/blur in, one orchestrated moment ---------- */
(function heroReveal(){
  const el = document.getElementById('heroTitle');
  if(!el) return;
  const html = el.innerHTML;
  // wrap every top-level text run in a span so it can fade in, keep the <span class="name"> intact
  const temp = document.createElement('div');
  temp.innerHTML = html;

  function wrapWords(node){
    node.childNodes.forEach(child => {
      if(child.nodeType === 3 && child.textContent.trim().length){
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(word => {
          if(word.trim() === ''){ frag.appendChild(document.createTextNode(word)); return; }
          const span = document.createElement('span');
          span.className = 'charwrap';
          span.textContent = word;
          frag.appendChild(span);
        });
        child.replaceWith(frag);
      } else if(child.nodeType === 1){
        wrapWords(child);
      }
    });
  }
  wrapWords(temp);
  el.innerHTML = temp.innerHTML;

  const words = el.querySelectorAll('.charwrap');
  words.forEach((w, i) => {
    if(prefersReducedMotion){ w.style.opacity = 1; w.style.transform = 'none'; w.style.filter = 'none'; return; }
    w.style.transition = `opacity .8s cubic-bezier(.2,.7,.2,1) ${i*70}ms, transform .8s cubic-bezier(.2,.7,.2,1) ${i*70}ms, filter .8s ease ${i*70}ms`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      w.style.opacity = 1; w.style.transform = 'translateY(0)'; w.style.filter = 'blur(0)';
    }));
  });
})();

/* ---------- enter archive ---------- */
function enterArchive(){
  const archive = document.getElementById('archive');
  archive.classList.remove('hidden');
  archive.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

/* ---------- nav: smooth scroll + active state ---------- */
const navButtons = document.querySelectorAll('.archive nav button[data-target]');
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if(target) target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  });
});

const sections = [...document.querySelectorAll('.paper[id]')];
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navButtons.forEach(b => b.classList.toggle('active', b.dataset.target === entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
sections.forEach(s => navObserver.observe(s));

/* ---------- scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
revealEls.forEach(el => revealObserver.observe(el));

/* ---------- scroll progress bar ---------- */
const progressBar = document.getElementById('progress');
function updateProgress(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = (isFinite(scrolled) ? scrolled : 0) + '%';
}
document.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

/* ---------- art reveal ---------- */
function revealArt(){
  const cover = document.getElementById('artCover');
  const img = document.getElementById('artImage');
  if(img.getAttribute('src') && img.getAttribute('src').indexOf('artwork.png') === -1){
    // custom src already set, fine
  }
  cover.classList.add('hidden');
  img.classList.remove('hidden');
}

/* ---------- final letter + confetti ---------- */
function openLetter(){
  const letter = document.getElementById('letter');
  const wasHidden = letter.classList.contains('hidden');
  letter.classList.remove('hidden');
  if(!prefersReducedMotion){
    letter.style.animation = 'none';
    letter.offsetHeight; // reflow
    letter.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1), opacity .6s ease';
    letter.style.transform = 'scaleY(.05)';
    letter.style.opacity = '0';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      letter.style.transform = 'scaleY(1)';
      letter.style.opacity = '1';
    }));
  }
  if(wasHidden) fireConfetti();
}

/* lightweight, physically-simulated confetti burst (not a generic CSS keyframe fall) */
function fireConfetti(){
  if(prefersReducedMotion) return;
  const canvas = document.getElementById('confetti-canvas');
  canvas.classList.remove('hidden');
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.scale(dpr, dpr);

  const colors = ['#f3a860', '#c6a6ff', '#ec8fa3', '#f4ecdf'];
  const gravity = 0.28;
  const drag = 0.995;
  const pieces = Array.from({ length: 90 }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 120,
    y: innerHeight * 0.35,
    vx: (Math.random() - 0.5) * 12,
    vy: -Math.random() * 10 - 4,
    size: Math.random() * 7 + 4,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.3,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 1
  }));

  let frame = 0;
  function tick(){
    frame++;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    let alive = false;
    pieces.forEach(p => {
      p.vy += gravity;
      p.vx *= drag; p.vy *= drag;
      p.x += p.vx; p.y += p.vy;
      p.rot += p.vr;
      if(p.y < innerHeight + 20) alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = frame > 90 ? Math.max(0, 1 - (frame - 90) / 40) : 1;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.6);
      ctx.restore();
    });
    if(alive && frame < 140){
      requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      canvas.classList.add('hidden');
    }
  }
  requestAnimationFrame(tick);
}

/* ---------- ambient background: soft drifting fireflies ---------- */
(function ambientCanvas(){
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const count = prefersReducedMotion ? 0 : (innerWidth < 700 ? 26 : 46);
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.6 + 0.6,
    baseAlpha: Math.random() * 0.5 + 0.2,
    speed: Math.random() * 0.25 + 0.05,
    drift: Math.random() * Math.PI * 2,
    hue: Math.random() > 0.5 ? '243,168,96' : '198,166,255'
  }));

  let t = 0;
  function draw(){
    t += 0.01;
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.y -= p.speed;
      p.x += Math.sin(t + p.drift) * 0.15;
      if(p.y < -10){ p.y = h + 10; p.x = Math.random() * w; }
      const alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(t * 2 + p.drift));
      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.hue},${alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  if(count > 0) requestAnimationFrame(draw);
})();

/* ---------- cursor glow (desktop only, purely decorative) ---------- */
(function cursorGlow(){
  if(prefersReducedMotion || matchMedia('(pointer: coarse)').matches) return;
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  window.addEventListener('pointermove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();

/* ---------- vinyl spin heuristic: spin the era card the user was last hovering when focus leaves to the iframe ---------- */
let lastHoveredEra = null;
document.querySelectorAll('.era-card').forEach(card => {
  card.addEventListener('pointerenter', () => lastHoveredEra = card);
});
window.addEventListener('blur', () => {
  if(lastHoveredEra){
    document.querySelectorAll('.era-card').forEach(c => c.classList.remove('playing'));
    lastHoveredEra.classList.add('playing');
  }
});
