/* =========================================
   app.js — Matheus Paranhos · IFB TDS
   Interações: navbar, reveal, skills,
   blog filter, contato, foto de perfil
   ========================================= */

/* ── Menu mobile ── */
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('open');
}

/* ── Scroll reveal ── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  els.forEach(el => observer.observe(el));
}

/* ── Barras de habilidade (curriculo.html) ── */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const w = e.target.getAttribute('data-width');
          e.target.style.width = w + '%';
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  fills.forEach(f => observer.observe(f));
}

/* ── Upload de foto de perfil ── */
function initPhotoUpload() {
  const input = document.getElementById('photoInput');
  const wrap  = document.getElementById('photoWrap');
  if (!input || !wrap) return;

  input.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      wrap.innerHTML = `<img src="${e.target.result}" alt="Foto de perfil">`;
    };
    reader.readAsDataURL(file);
  });
}

/* ── Blog: expandir post ── */
function openPost(btn) {
  const full = btn.nextElementSibling;
  const isOpen = full.style.display === 'block';

  full.style.display = isOpen ? 'none' : 'block';
  btn.textContent    = isOpen ? 'Ler mais' : 'Fechar';
}

/* ── Blog: filtro por categoria ── */
function filterPosts(category, clickedBtn) {
  const posts   = document.querySelectorAll('.blog-post');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(b => b.classList.remove('active'));
  clickedBtn.classList.add('active');

  posts.forEach(post => {
    const show = category === 'all' || post.dataset.category === category;
    post.style.display = show ? 'flex' : 'none';
  });
}

/* ── Contato: validação e feedback ── */
function enviarMensagem() {
  const nome     = document.getElementById('nome')?.value.trim();
  const email    = document.getElementById('email')?.value.trim();
  const assunto  = document.getElementById('assunto')?.value.trim();
  const mensagem = document.getElementById('mensagem')?.value.trim();
  const feedback = document.getElementById('form-feedback');

  if (!feedback) return;

  if (!nome || !email || !assunto || !mensagem) {
    feedback.textContent = '⚠ Preencha todos os campos antes de enviar.';
    feedback.className   = 'form-feedback error';
    feedback.style.display = 'block';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedback.textContent = '⚠ Digite um e-mail válido.';
    feedback.className   = 'form-feedback error';
    feedback.style.display = 'block';
    return;
  }

  feedback.textContent = `✓ Mensagem enviada, ${nome}! Responderei em breve.`;
  feedback.className   = 'form-feedback success';
  feedback.style.display = 'block';

  // Limpar campos
  ['nome','email','assunto','mensagem'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

/* ── Código destaque: mostrar/ocultar snippet ── */
function toggleCode(id) {
  const el  = document.getElementById(id);
  const btn = document.getElementById('btn-' + id);
  if (!el || !btn) return;

  const isOpen = el.style.display === 'block';
  el.style.display  = isOpen ? 'none' : 'block';
  btn.textContent   = isOpen ? '{ } Ver código' : '{ } Ocultar código';
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initSkillBars();
  initPhotoUpload();
});