/* =========================================================
   SEÑOR DE LA GUERRA — script.js
   JavaScript vanilla — interacción visual, animación y modales
   de inicio de sesión / registro (front-end, sin backend real).
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Header que se reduce al hacer scroll ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Menú móvil ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 3. Scroll reveal con IntersectionObserver ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), index % 6 * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ---------- 4. Contadores animados (bitácora de operaciones) ---------- */
  const counters = document.querySelectorAll('.counter');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* ---------- 5. Scroll suave para anclas internas ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  /* =========================================================
     6. MODALES: Iniciar sesión / Registrarse
     Usa el elemento nativo <dialog>: maneja ESC y el top-layer
     por sí solo; aquí solo orquestamos apertura, cierre,
     click en el backdrop y envío de formulario simulado.
     ========================================================= */
  const dialogs = document.querySelectorAll('dialog.modal');

  const openModal = (id) => {
    const dialog = document.getElementById(id);
    if (!dialog) return;
    // cierra cualquier otro modal abierto antes de abrir el nuevo
    dialogs.forEach(d => { if (d !== dialog && d.open) d.close(); });
    dialog.showModal();
  };

  const closeModal = (dialog) => {
    dialog.close();
    const form = dialog.querySelector('form');
    const feedback = dialog.querySelector('[data-feedback]');
    if (form) form.reset();
    if (feedback) feedback.textContent = '';
  };

  // Botones que abren un modal (nav: Iniciar sesión / Registrarse)
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modalOpen));
  });

  // Botones de cierre (la "x")
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('dialog')));
  });

  // Enlaces para saltar entre login y registro
  document.querySelectorAll('[data-modal-switch]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = btn.closest('dialog');
      const targetId = btn.dataset.modalSwitch;
      if (current) closeModal(current);
      openModal(targetId);
    });
  });

  // Cerrar al hacer click en el backdrop (fuera del contenido del form)
  dialogs.forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) closeModal(dialog);
    });
  });

  // Envío simulado de los formularios (sin backend: solo feedback visual)
  const handleFakeSubmit = (form, successMessage) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = form.querySelector('[data-feedback]');
      const submitBtn = form.querySelector('.modal__submit');

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      if (feedback) feedback.textContent = 'Verificando datos...';

      // Simulación de proceso — aquí se conectaría un backend real
      setTimeout(() => {
        if (feedback) feedback.textContent = successMessage;
        if (submitBtn) submitBtn.disabled = false;
        setTimeout(() => closeModal(form.closest('dialog')), 1100);
      }, 700);
    });
  };

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) handleFakeSubmit(loginForm, 'Bienvenido de vuelta al frente.');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      const pass = registerForm.querySelector('#registerPassword').value;
      const pass2 = registerForm.querySelector('#registerPassword2').value;
      const feedback = registerForm.querySelector('[data-feedback]');
      if (pass !== pass2) {
        e.preventDefault();
        if (feedback) feedback.textContent = 'Las contraseñas no coinciden.';
        return;
      }
    });
    handleFakeSubmit(registerForm, 'Alistamiento completo. Cuenta creada.');
  }

});
