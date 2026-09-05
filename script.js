const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const fallback = document.getElementById('form-fallback');
const fallbackBody = document.getElementById('form-fallback-body');
const copyBtn = document.getElementById('form-copy');
const submitBtn = form.querySelector('button[type="submit"]');

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/sales@anwarautowerks.com';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const vehicle = document.getElementById('vehicle').value;
  const message = document.getElementById('message').value;

  fallback.hidden = true;
  status.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name,
        email,
        vehicle,
        message,
        _subject: `Inquiry: ${vehicle}`,
        _template: 'table',
      }),
    });

    if (!response.ok) throw new Error('Form endpoint returned an error');

    status.textContent = "Sent. We'll get back to you shortly.";
    form.reset();
  } catch (err) {
    status.textContent = "Couldn't send that automatically.";
    fallbackBody.textContent = `To: sales@anwarautowerks.com\nSubject: Inquiry: ${vehicle}\n\nName: ${name}\nEmail: ${email}\nVehicle: ${vehicle}\n\n${message}`;
    fallback.hidden = false;
  } finally {
    submitBtn.disabled = false;
  }
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
