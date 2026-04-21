// ===== CyberAuth - Main JavaScript =====

// Zarrachalar animatsiyasi
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 40;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    p.style.opacity = Math.random() * 0.5;
    container.appendChild(p);
  }
}

// Hamburger menyu
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    links.classList.toggle('open');
  });
}

// Parolni ko'rsatish/yashirish
function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.type = field.type === 'password' ? 'text' : 'password';
}

// Parol kuchini tekshirish
function checkPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  return score;
}

// Parol talablarini real vaqtda tekshirish
function initPasswordValidation() {
  const passwordField = document.getElementById('password');
  if (!passwordField) return;

  const rules = {
    'rule-len': (p) => p.length >= 8,
    'rule-upper': (p) => /[A-Z]/.test(p),
    'rule-lower': (p) => /[a-z]/.test(p),
    'rule-num': (p) => /\d/.test(p),
    'rule-special': (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
  };

  const strengthFill = document.getElementById('strength-fill');
  const strengthLabel = document.getElementById('strength-label');

  passwordField.addEventListener('input', () => {
    const val = passwordField.value;

    // Talablarni yangilash
    Object.entries(rules).forEach(([id, check]) => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('valid', check(val));
    });

    // Kuch ko'rsatkichi
    if (strengthFill && strengthLabel) {
      const score = checkPasswordStrength(val);
      const pct = Math.min((score / 6) * 100, 100);
      strengthFill.style.width = pct + '%';

      if (score <= 2) {
        strengthFill.style.background = '#ff3366';
        strengthLabel.textContent = val ? 'Zaif parol' : '';
        strengthLabel.style.color = '#ff3366';
      } else if (score <= 4) {
        strengthFill.style.background = '#ffaa00';
        strengthLabel.textContent = 'O\'rtacha parol';
        strengthLabel.style.color = '#ffaa00';
      } else {
        strengthFill.style.background = '#00ff88';
        strengthLabel.textContent = 'Kuchli parol';
        strengthLabel.style.color = '#00ff88';
      }
    }
  });
}

// Flash xabarlarini avtomatik yopish
function initFlashMessages() {
  const flashes = document.querySelectorAll('.flash');
  flashes.forEach(flash => {
    setTimeout(() => {
      flash.style.opacity = '0';
      flash.style.transform = 'translateX(100%)';
      flash.style.transition = 'all 0.4s';
      setTimeout(() => flash.remove(), 400);
    }, 5000);
  });
}

// Forma yuborishda loading holati
function initFormLoading() {
  const forms = document.querySelectorAll('.auth-form');
  forms.forEach(form => {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        const text = btn.querySelector('.btn-text');
        if (text) text.textContent = 'Yuklanmoqda...';
      }
    });
  });
}

// Barcha funksiyalarni ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initHamburger();
  initPasswordValidation();
  initFlashMessages();
  initFormLoading();
});
