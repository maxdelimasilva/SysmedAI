// ============================================
// SYSMED IA - INTERATIVIDADE MODERNA
// ============================================

// Estado da aplicação
const state = {
  menuOpen: false,
  scrollPosition: 0,
};

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initializeMenuToggle();
  initializeScrollAnimations();
  initializeFormValidation();
  initializePerformanceOptimizations();
  addBasicMenuHTML();
});

// ============================================
// MENU RESPONSIVO
// ============================================
function addBasicMenuHTML() {
  const navbar = document.querySelector('.nav-links');
  if (!navbar) return;

  // Adicionar botão de menu móvel
  const nav = document.querySelector('.nav-content');
  if (!document.querySelector('.menu-toggle')) {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    nav.appendChild(menuToggle);
  }
}

function initializeMenuToggle() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!menuToggle) return;

  menuToggle.addEventListener('click', () => {
    state.menuOpen = !state.menuOpen;
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Fechar menu ao clicar em um link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      state.menuOpen = false;
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      if (state.menuOpen) {
        state.menuOpen = false;
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    }
  });
}

// ============================================
// ANIMAÇÕES AO SCROLL
// ============================================
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar cards
  document.querySelectorAll('.card, .plan, .benefit-card').forEach(el => {
    observer.observe(el);
  });

  // Animação de scroll suave para navbar
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ============================================
// VALIDAÇÃO DE FORMULÁRIO
// ============================================
function initializeFormValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    // Validação simples
    if (!name || !email || !message) {
      showNotification('Por favor, preencha todos os campos.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showNotification('Por favor, insira um email válido.', 'error');
      return;
    }

    // Simular envio
    const button = form.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Enviando...';
    button.disabled = true;

    setTimeout(() => {
      showNotification('Mensagem enviada com sucesso! 🎉', 'success');
      form.reset();
      button.textContent = originalText;
      button.disabled = false;
    }, 1500);
  });

  // Validação em tempo real
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
  });
}

function validateField(field) {
  const isValid = field.value.trim() !== '';
  
  if (isValid && field.type === 'email') {
    return isValidEmail(field.value);
  }
  
  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
  // Remover notificação anterior se existir
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.setAttribute('role', 'alert');
  
  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  // Remover após 4 segundos
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// ============================================
// OTIMIZAÇÕES DE PERFORMANCE
// ============================================
function initializePerformanceOptimizations() {
  // Lazy loading de imagens
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Throttle do scroll para melhor performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        state.scrollPosition = window.scrollY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ============================================
// ANIMAÇÕES AOS BOTÕES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// ============================================
// SUPORTE A PREFIXOS CSS
// ============================================
function getPrefixedProperty(property) {
  const prefixes = ['webkit', 'moz', 'ms', 'o'];
  const style = document.documentElement.style;

  if (property in style) return property;

  for (let i = 0; i < prefixes.length; i++) {
    const prefixedProperty = prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1);
    if (prefixedProperty in style) {
      return prefixedProperty;
    }
  }

  return property;
}

// ============================================
// ACESSIBILIDADE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Melhorar navegação por teclado
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]'
  );

  focusableElements.forEach(element => {
    element.addEventListener('focus', (e) => {
      e.target.style.outline = '2px solid var(--primary)';
      e.target.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', (e) => {
      e.target.style.outline = 'none';
    });
  });

  // Adicionar suporte a navegação por teclado no menu
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    const links = navLinks.querySelectorAll('a');
    
    links.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && index < links.length - 1) {
          links[index + 1].focus();
        } else if (e.key === 'ArrowLeft' && index > 0) {
          links[index - 1].focus();
        }
      });
    });
  }
});

// ============================================
// UTILITÁRIOS
// ============================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================
// DARK MODE (Opcional)
// ============================================
function initializeDarkModeToggle() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  if (prefersDark.matches) {
    document.documentElement.classList.add('dark-mode');
  }

  prefersDark.addListener((e) => {
    if (e.matches) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  });
}

// Inicializar dark mode se suportado
initializeDarkModeToggle();

// ============================================
// MONITORAMENTO DE PERFORMANCE
// ============================================
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log(`⏱️ Tempo de carregamento: ${loadTime}ms`);
  });
}
