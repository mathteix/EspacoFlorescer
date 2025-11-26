// =========================
// script.js - ESPAÇO FLORESCER
// Atualizado para o HTML fornecido
// =========================

/* ================
   Helpers / Safe query
   ================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* =========================
   ROLAGEM SUAVE (links de âncora)
   ========================= */
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();

    const header = $('.header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth'
    });

    // Se for link do menu mobile, fecha o menu
    if (this.classList.contains('menuLink')) {
      const nav = $('.nav');
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      nav && nav.classList.remove('active');
      mobileToggle && mobileToggle.classList.remove('active');
    }
  });
});

/* =========================
   HEADER: efeito ao rolar
   ========================= */
const header = $('.header');
const headerScrollEffect = () => {
  if (!header) return;
  if (window.scrollY > 100) {
    header.style.background = 'rgba(255,255,255,0.98)';
    header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
  } else {
    header.style.background = 'rgba(255,255,255,0.95)';
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  }
};
window.addEventListener('scroll', headerScrollEffect);
headerScrollEffect();

/* =========================
   MENU MOBILE
   ========================= */
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileToggle && nav) {
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });
}

// Fechar menu ao clicar em link
$$('.menuLink').forEach(link => {
  link.addEventListener('click', () => {
    if (nav && nav.classList.contains('active')) {
      nav.classList.remove('active');
      mobileToggle && mobileToggle.classList.remove('active');
    }
  });
});

/* =========================
   INTERSECTION OBSERVER - animações de aparecimento
   ========================= */
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
};

const inObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      entry.target.classList.add('in-view');
    }
  });
}, observerOptions);

// Seções
$$('.section').forEach(sec => {
  sec.style.opacity = '0';
  sec.style.transform = 'translateY(30px)';
  sec.style.transition = 'all 0.6s ease';
  inObserver.observe(sec);
});

// Cards/itens
const animatedSelectors = [
  '.principiosCard',
  '.oficinaItem',
  '.membroEquipe',
  '.galeriaItem'
];

animatedSelectors.forEach(sel => {
  $$(sel).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    inObserver.observe(el);
  });
});

/* =========================
   EFEITO HOVER (nav) - usando menuLink
   ========================= */
$$('.menuLink').forEach(link => {
  link.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-2px)';
    this.style.transition = 'transform 0.15s';
  });
  link.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
  });
});

/* =========================
   RIPPLE (botões: .bt)
   ========================= */
$$('.bt').forEach(button => {
  button.style.position = button.style.position || 'relative';
  button.style.overflow = 'hidden';

  button.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    this.appendChild(ripple);

    // remover após animação
    setTimeout(() => {
      ripple.remove();
    }, 650);
  });
});

/* =========================
   Injeta estilos utilitários (ripple + mobile nav helpers)
   ========================= */
(function injectStyles() {
  const css = `
  /* ripple */
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.35);
    transform: scale(0);
    animation: rippleAnim 0.6s linear;
    pointer-events: none;
    will-change: transform, opacity;
    opacity: 0.9;
  }
  @keyframes rippleAnim {
    to { transform: scale(3.8); opacity: 0; }
  }

  /* mobile nav (básico, não substitui seu styles.css) */
  @media (max-width: 768px) {
    .menuLista { display: none; }
    .nav.active { display: block; position: absolute; top: 100%; left: 0; right: 0; background: white; box-shadow: 0 5px 20px rgba(0,0,0,0.08); border-radius: 0 0 12px 12px; z-index: 50; }
    .nav.active .menuLista { display:flex; flex-direction: column; gap: 0; padding: 0.5rem 0; }
    .nav.active .menuLista li { border-bottom: 1px solid #f2f2f2; }
    .nav.active .menuLista li:last-child { border-bottom: none; }
    .nav.active .menuLista .menuLink { display:block; padding: 0.9rem 1.25rem; }
    .mobile-menu-toggle { cursor: pointer; display: inline-flex; flex-direction: column; gap: 6px; width: 32px; height: 24px; justify-content: center; }
    .mobile-menu-toggle span { display:block; height:3px; background:#333; border-radius:2px; transition: all 0.25s; }
    .mobile-menu-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .mobile-menu-toggle.active span:nth-child(2) { opacity: 0; transform: translateX(-10px); }
    .mobile-menu-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(6px, -6px); }
  }`;

  const styleTag = document.createElement('style');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);
})();

/* =========================
   INITIAL FADE-IN (page load)
   ========================= */
document.body.style.opacity = '0';
window.addEventListener('load', () => {
  document.body.style.transition = 'opacity 0.45s ease';
  document.body.style.opacity = '1';
});

/* =========================
   SCROLL-TO-TOP (botão criado dinamicamente)
   ========================= */
(function addScrollTopBtn() {
  const btn = document.createElement('button');
  btn.className = 'scroll-to-top';
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  btn.setAttribute('aria-label', 'Voltar ao topo');

  Object.assign(btn.style, {
    position: 'fixed',
    right: '20px',
    bottom: '80px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: 'none',
    boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
    background: 'linear-gradient(135deg,#ED7E24,#FFAA00)',
    color: '#fff',
    fontSize: '1.05rem',
    cursor: 'pointer',
    zIndex: 999,
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.25s ease'
  });

  document.body.appendChild(btn);

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      btn.style.opacity = '1';
      btn.style.visibility = 'visible';
    } else {
      btn.style.opacity = '0';
      btn.style.visibility = 'hidden';
    }
  };
  window.addEventListener('scroll', toggleVisibility);
  toggleVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.08)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });
})();

/* =========================
   CARROSSEL: Quem Somos
   Estrutura esperada no HTML:
   <div class="carousel">
     <button class="btnPrev">...</button>
     <div class="carouselTrack">
       <div class="slide">...</div>
       ...
     </div>
     <button class="btnNext">...</button>
     <div class="dots"></div>
   </div>
   ========================= */
(function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carouselTrack');
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const btnPrev = carousel.querySelector('.btnPrev');
  const btnNext = carousel.querySelector('.btnNext');
  const dotsContainer = carousel.querySelector('.dots');

  if (!track || slides.length === 0 || !dotsContainer) return;

  // garante CSS: track em flex e cada slide 100%
  track.style.display = track.style.display || 'flex';
  slides.forEach(slide => {
    slide.style.flex = '0 0 100%';
  });
  track.style.transition = track.style.transition || 'transform 0.45s ease';

  // criar dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'carousel-dot';
    d.setAttribute('aria-label', `Ir para slide ${i + 1}`);
    if (i === 0) d.classList.add('active');
    d.dataset.index = i;
    dotsContainer.appendChild(d);
    d.addEventListener('click', () => goToSlide(i));
  });

  let index = 0;
  const total = slides.length;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    // dots
    const dots = Array.from(dotsContainer.children);
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  function goToSlide(i) {
    index = (i + total) % total;
    update();
  }

  btnNext && btnNext.addEventListener('click', () => goToSlide(index + 1));
  btnPrev && btnPrev.addEventListener('click', () => goToSlide(index - 1));

  // swipe (touch)
  let startX = 0;
  let isTouching = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isTouching = true;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isTouching) return;
    // opcional: implementar drag visual (não necessário)
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isTouching) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    const threshold = 50;
    if (diff > threshold) {
      goToSlide(index + 1);
    } else if (diff < -threshold) {
      goToSlide(index - 1);
    }
    isTouching = false;
  });

  // ajuste em resize para manter proporcionalidade (por segurança)
  window.addEventListener('resize', () => {
    // forçamos reposicionamento
    update();
  });

  // inicializa
  update();
})();

/* =========================
   Pequenas correções/guards adicionais
   ========================= */
// Se houver links com target="_blank" e classes específicas, nada é alterado.
// Este script tenta nunca lançar erro se algum elemento estiver ausente.
