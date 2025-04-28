import { sendContactForm } from './api.js';
import iziToast from 'izitoast';

const form = document.getElementById('contact-form');

const emailInput = document.getElementById('form-email');
const validIcon = document.getElementById('email-valid-icon');

emailInput.addEventListener('input', () => {
  const pattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const email = emailInput.value.trim();

  if (pattern.test(email)) {
    validIcon.classList.add('visible');
  } else {
    validIcon.classList.remove('visible');
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = form.elements.email.value.trim();
  const comment = form.elements.message.value.trim();

  if (!email || !comment) {
    iziToast.error({
      message: 'Please fill out all fields!',
      position: 'topRight',
    });
    return;
  }

  try {
    const data = await sendContactForm({ email, comment });

    console.log('Success:', data);

    showSuccessModal(data.title, data.message);

    form.reset();
  } catch (error) {
    console.error('Error:', error);

    iziToast.error({
      title: "Something went wrong. Please try again!",
      position: "topRight",
      backgroundColor: "var(--accent-color)",
      titleColor: "var(--general-color-dark-theme)",
    });
  }
});

function showSuccessModal(title, message) {
  const modalBackdrop = document.createElement('div');
  modalBackdrop.classList.add('modal-backdrop');

  
  modalBackdrop.innerHTML = `
    <div class="modal-content">
      <button id="modal-close-btn" class="modal-close">&times;</button>
      <h2 class="modal-title">${title}</h2>
      <p class="modal-item">${message}</p>
    </div>
  `;

  document.body.appendChild(modalBackdrop);

  const closeBtn = modalBackdrop.querySelector('#modal-close-btn');
  closeBtn.addEventListener('click', () => {
    modalBackdrop.remove();
    validIcon.classList.remove('visible');
  });

  modalBackdrop.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) {
      modalBackdrop.remove();
      validIcon.classList.remove('visible');
    }
  });
}