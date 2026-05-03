(function () {
  var style = document.createElement('style');
  style.textContent = [
    '.nav-contact-btn{background:var(--accent2,#4df0c8)!important;color:#0d0d0d!important;padding:0.5rem 1.2rem!important;border-radius:2rem;font-weight:500!important;transition:opacity 0.2s!important;cursor:pointer;}',
    '.nav-contact-btn:hover{opacity:0.85!important;}',
    '.contact-modal-overlay{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.65);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity 0.2s;}',
    '.contact-modal-overlay.open{opacity:1;pointer-events:all;}',
    '.contact-modal-card{background:var(--surface,#1a1a1a);border:1px solid var(--border,#2a2a2a);border-radius:1rem;padding:1.25rem 1.5rem 1.5rem;display:flex;flex-direction:column;gap:0.65rem;width:min(320px,calc(100vw - 3rem));}',
    '.contact-modal-close{align-self:flex-start;background:none;border:1px solid var(--border,#2a2a2a);border-radius:0.4rem;color:var(--muted,#888);font-size:0.72rem;font-weight:600;padding:0.22rem 0.6rem;cursor:pointer;transition:0.15s;margin-bottom:0.15rem;}',
    '.contact-modal-close:hover{background:var(--border,#2a2a2a);color:var(--text,#fff);}',
    '.contact-modal-title{font-family:var(--font-head,"Syne",sans-serif);font-weight:700;font-size:0.88rem;line-height:1.3;padding-bottom:0.65rem;border-bottom:1px solid var(--border,#2a2a2a);color:var(--text,#fff);}',
    '.contact-modal-option{display:flex;flex-direction:column;gap:0.2rem;}',
    '.contact-modal-option-label{font-size:0.7rem;letter-spacing:0.07em;text-transform:uppercase;color:var(--muted,#888);font-weight:600;display:flex;align-items:center;flex-wrap:wrap;gap:0.25rem;}',
    '.contact-modal-option-label small{text-transform:none;letter-spacing:normal;font-weight:400;}',
    '.contact-modal-option-detail{font-size:0.83rem;color:var(--text,#fff);line-height:1.5;}',
    '.contact-modal-ref{font-family:monospace;font-size:0.88rem;color:var(--accent,#c8f04d);letter-spacing:0.1em;text-transform:none;font-weight:400;}',
    '.contact-modal-btn{display:flex;align-items:center;justify-content:center;padding:0.48rem 0.75rem;border-radius:0.5rem;font-weight:600;font-size:0.78rem;text-decoration:none;border:1px solid var(--border,#2a2a2a);transition:0.15s;margin-top:0.3rem;cursor:pointer;}',
    '.contact-modal-btn-call{background:var(--surface,#1a1a1a);color:var(--text,#fff);}',
    '.contact-modal-btn-call:hover{background:var(--text,#fff);color:var(--bg,#0d0d0d);}',
    '.contact-modal-btn-email{background:var(--accent,#c8f04d);color:#000;border-color:var(--accent,#c8f04d);}',
    '.contact-modal-btn-email:hover{filter:brightness(1.08);}'
  ].join('');
  document.head.appendChild(style);

  function genCode() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 6 }, function () { return chars[Math.floor(Math.random() * chars.length)]; }).join('');
  }

  var code    = genCode();
  var subject = encodeURIComponent('General Enquiry [' + code + ']');

  // Inject Contact button into nav
  var navLinks = document.getElementById('navLinks');
  if (navLinks) {
    var li  = document.createElement('li');
    li.style.marginLeft = '-0.75rem';
    var btn = document.createElement('a');
    btn.className = 'nav-contact-btn';
    btn.textContent = 'Contact';
    btn.href = '#';
    li.appendChild(btn);
    navLinks.appendChild(li);
    btn.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
  }

  // Build modal
  var overlay = document.createElement('div');
  overlay.id = 'contactModal';
  overlay.className = 'contact-modal-overlay';
  overlay.innerHTML =
    '<div class="contact-modal-card">' +
      '<button class="contact-modal-close">← Close</button>' +
      '<div class="contact-modal-title">General Enquiry</div>' +
      '<div class="contact-modal-option">' +
        '<div class="contact-modal-option-label">📞 Call &nbsp;<small>Mon-Sat · 8am-5pm</small></div>' +
        '<div class="contact-modal-option-detail">07902 563971</div>' +
        '<a href="tel:07902563971" class="contact-modal-btn contact-modal-btn-call">Call now</a>' +
      '</div>' +
      '<div class="contact-modal-option">' +
        '<div class="contact-modal-option-label">✉️ Email &nbsp;<span class="contact-modal-ref">' + code + '</span></div>' +
        '<a href="mailto:enquiry@kyranwalker.com?subject=' + subject + '" class="contact-modal-btn contact-modal-btn-email">Email me</a>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  overlay.querySelector('.contact-modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  function openModal()  { overlay.classList.add('open'); }
  function closeModal() { overlay.classList.remove('open'); }
  window.openContactModal = openModal;
})();
