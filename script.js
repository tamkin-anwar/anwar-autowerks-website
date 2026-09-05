const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const fallback = document.getElementById('form-fallback');
const fallbackBody = document.getElementById('form-fallback-body');
const copyBtn = document.getElementById('form-copy');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const vehicle = document.getElementById('vehicle').value;
  const message = document.getElementById('message').value;
  const email = document.getElementById('email').value;

  const subject = `Inquiry: ${vehicle}`;
  const bodyText = `Name: ${name}\nEmail: ${email}\nVehicle: ${vehicle}\n\n${message}`;
  const mailtoUrl = `mailto:info@anwarautowerks.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

  status.textContent = 'Opening your email client...';
  fallback.hidden = true;

  const openedAt = Date.now();
  window.location.href = mailtoUrl;

  // If no mail client took over within ~1.5s, this tab is still the
  // active, visible document. That's the signal mailto: silently failed
  // (no default mail app configured), so hand the visitor a fallback
  // instead of leaving them stuck on a button that appeared to do nothing.
  setTimeout(() => {
    const stillHere = document.visibilityState === 'visible' && document.hasFocus();
    if (stillHere && Date.now() - openedAt >= 1400) {
      status.textContent = "Couldn't open a mail app automatically.";
      fallbackBody.textContent = `To: info@anwarautowerks.com\nSubject: ${subject}\n\n${bodyText}`;
      fallback.hidden = false;
    } else {
      status.textContent = 'Opening your email client...';
    }
  }, 1500);
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(fallbackBody.textContent);
    copyBtn.textContent = 'Copied';
    setTimeout(() => { copyBtn.textContent = 'Copy message'; }, 2000);
  } catch (err) {
    copyBtn.textContent = 'Select the text above to copy';
  }
});
