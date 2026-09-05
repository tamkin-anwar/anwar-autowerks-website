const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const vehicle = document.getElementById('vehicle').value;
  const message = document.getElementById('message').value;
  const email = document.getElementById('email').value;

  const subject = encodeURIComponent(`Inquiry: ${vehicle}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nVehicle: ${vehicle}\n\n${message}`
  );

  window.location.href = `mailto:info@anwarautowerks.com?subject=${subject}&body=${body}`;
  status.textContent = 'Opening your email client to send this inquiry…';
});
