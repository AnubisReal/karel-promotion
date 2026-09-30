/* Completa el email antes de publicar. Opcionalmente añade tu WhatsApp con prefijo internacional, solo números. */
const CONTACT = { email: 'karelito034@gmail.com', whatsapp: '17132649677' };
const dialog = document.querySelector('#contact-dialog');
let selectedPlan = '';
function openContact(plan = '') {
  selectedPlan = plan;
  document.querySelector('#chosen-plan').textContent = plan ? `Me interesa el plan ${plan}.` : 'Cuéntame qué quieres promocionar.';
  document.querySelector('#form-status').textContent = '';
  dialog.showModal();
  document.body.classList.add('modal-open');
}
document.querySelectorAll('[data-plan]').forEach(button => button.addEventListener('click', () => openContact(button.dataset.plan)));
document.querySelector('#contact-open').addEventListener('click', () => openContact());
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!event.target.reportValidity()) return;
  const form = new FormData(event.target);
  const limits = { name: 100, email: 254, message: 4000 };
  for (const [field, limit] of Object.entries(limits)) {
    const value = form.get(field);
    if (typeof value !== 'string' || !value.trim() || value.length > limit) {
      document.querySelector('#form-status').textContent = 'Revisa los campos del mensaje antes de continuar.';
      return;
    }
  }
  const message = `Hola, soy ${form.get('name')}.\nEmail: ${form.get('email')}\n${selectedPlan ? `Plan: ${selectedPlan}\n` : ''}\n${form.get('message')}`;
  if (CONTACT.whatsapp) {
    window.open(`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  } else if (CONTACT.email) {
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(selectedPlan ? `Consulta: ${selectedPlan}` : 'Quiero promocionar mi negocio')}&body=${encodeURIComponent(message)}`;
  } else {
    document.querySelector('#form-status').textContent = 'El canal de contacto todavía no está disponible. Vuelve a intentarlo más adelante.';
  }
});
if (CONTACT.whatsapp) {
  document.querySelector('#contact-form button[type="submit"]').firstChild.textContent = 'Continuar en WhatsApp ';
  document.querySelector('.form-note').textContent = 'Se abrirá WhatsApp con tu mensaje preparado para enviarlo.';
}
document.querySelector('#year').textContent = new Date().getFullYear();
