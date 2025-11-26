// Rolagem suave para links de navegação
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Efeito no cabeçalho ao rolar
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  }
})

// Alternar menu móvel
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const nav = document.querySelector(".nav")

if (mobileMenuToggle && nav) {
  mobileMenuToggle.addEventListener("click", () => {
    nav.classList.toggle("active")
    mobileMenuToggle.classList.toggle("active")
  })
}

// Intersection Observer para animações
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observar todas as seções para animações ao rolar
document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "all 0.6s ease"
  observer.observe(section)
})

// Animar cartões ao rolar
document.querySelectorAll(".valor-card, .oficina-item, .membro-equipe, .gallery-item").forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(20px)"
  card.style.transition = "all 0.6s ease"
  observer.observe(card)
})

// Adicionar efeitos de hover à navegação
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)"
  })

  link.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
  })
})

document.querySelectorAll(".btn-primary, .btn-secondary").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Adicionar CSS do efeito ripple e estilos do menu móvel
const style = document.createElement("style")
style.textContent = `
    /* Ripple / botões do projeto */
    .bt, .botaoInformacao, .botaoWhats {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Menu móvel: adapta para as classes reais do HTML/CSS do projeto */
    @media (max-width: 768px) {
        /* esconder lista por padrão em mobile */
        .menuLista {
            display: none;
        }

        .nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            border-radius: 0 0 12px 12px;
            line-height: 2; 
        }
        
        .nav.active {
            display: block;
        }
        
        .nav.active .menuLista {
            display: flex;
            flex-direction: column;
            gap: 0;
            padding: 1rem 0;
        }
        
        .nav.active .menuLista li {
            border-bottom: 1px solid #f0f0f0;
        }
        
        .nav.active .menuLista li:last-child {
            border-bottom: none;
        }
        
        .nav.active .menuLista .menuLink {
            display: block;
            padding: 1rem 2rem;
            color: var(--cinza-escuro-);
            transition: all 0.3s ease;
        }
        
        .nav.active .menuLista .menuLink:hover {
            background: #f8f9fa;
            color: var(--amarelo);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`
document.head.appendChild(style)


// Adicionar animação de carregamento
window.addEventListener("load", () => {
  document.body.style.opacity = "1"
  document.body.style.transition = "opacity 0.5s ease"
})

// Inicializar página
document.body.style.opacity = "0"

const scrollToTopBtn = document.createElement("button")
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
scrollToTopBtn.className = "scroll-to-top"
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #ED7E24, #FFAA00);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(237, 126, 36, 0.3);
`

document.body.appendChild(scrollToTopBtn)

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollToTopBtn.style.opacity = "1"
    scrollToTopBtn.style.visibility = "visible"
  } else {
    scrollToTopBtn.style.opacity = "0"
    scrollToTopBtn.style.visibility = "hidden"
  }
})

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

scrollToTopBtn.addEventListener("mouseenter", () => {
  scrollToTopBtn.style.transform = "scale(1.1)"
  scrollToTopBtn.style.boxShadow = "0 6px 20px rgba(237, 126, 36, 0.4)"
})

scrollToTopBtn.addEventListener("mouseleave", () => {
  scrollToTopBtn.style.transform = "scale(1)"
  scrollToTopBtn.style.boxShadow = "0 4px 15px rgba(237, 126, 36, 0.3)"
})

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (nav && nav.classList.contains("active")) {
      nav.classList.remove("active")
      mobileMenuToggle.classList.remove("active")
    }
  })
})

const track = document.querySelector(".carouselTrack");
const btnPrev = document.querySelector(".btnPrev");
const btnNext = document.querySelector(".btnNext");
const dotsContainer = document.querySelector(".dots");
const slides = Array.from(track.children);

let index = 0;
const total = slides.length;

// Criar dots
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);

  dot.addEventListener("click", () => goToSlide(i));
});

const dots = document.querySelectorAll(".dots button");

// Função principal
function goToSlide(i) {
  index = i;
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function updateDots() {
  dots.forEach(d => d.classList.remove("active"));
  dots[index].classList.add("active");
}

btnNext.addEventListener("click", () => {
  index = (index + 1) % total;
  goToSlide(index);
});

btnPrev.addEventListener("click", () => {
  index = (index - 1 + total) % total;
  goToSlide(index);
});

// Swipe para mobile
let startX = 0;
let isSwiping = false;

track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  isSwiping = true;
});

track.addEventListener("touchmove", e => {
  if (!isSwiping) return;
  const diff = e.touches[0].clientX - startX;

  // Sensibilidade
  if (diff > 60) {
    btnPrev.click();
    isSwiping = false;
  }
  if (diff < -60) {
    btnNext.click();
    isSwiping = false;
  }
});

track.addEventListener("touchend", () => {
  isSwiping = false;
});
