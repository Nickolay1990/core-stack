import { sendContactForm } from './api.js';
import iziToast from 'izitoast';
import svg from '../img/sprite.svg';

const form = document.getElementById('contact-form');

const emailInput = document.getElementById('form-email');
const validIcon = document.getElementById('email-valid-icon');
const invalidSpan = document.querySelector('.invalid-input');
const textArea = document.querySelector('.form-comment');
const invalidArea = document.querySelector('.invalid-text-area');

emailInput.addEventListener('input', () => {
  const pattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const email = emailInput.value.trim();

  if (pattern.test(email)) {
    validIcon.classList.add('visible');
    invalidSpan.style.display = 'none';
  } else {
    validIcon.classList.remove('visible');
    invalidSpan.style.display = 'block';
  }
});

textArea.addEventListener('input', () => {
  if (textArea.value.trim()) {
    invalidArea.style.display = 'none';
    return;
  }
  invalidArea.style.display = 'block';
});

form.addEventListener('submit', async event => {
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
      title: 'Something went wrong. Please try again!',
      position: 'topRight',
      backgroundColor: 'red',
    });
  }
});

function showSuccessModal(title, message) {
  const modalBackdrop = document.createElement('div');
  modalBackdrop.classList.add('modal-backdrop');

  modalBackdrop.innerHTML = `
    <div class="modal-content">
      <button class="mobile-menu-close" type="button" id="modal-close-btn">
        <svg class="svg-icon-close" width="32" height="32">
          <use href="${svg}#icon-x"></use>
        </svg>
      </button>
      <h2 class="modal-title">${title}</h2>
      <p class="modal-item">${message}</p>
    </div>
  `;

  document.body.appendChild(modalBackdrop);
  blockScroll(true);

  const closeBtn = modalBackdrop.querySelector('#modal-close-btn');
  closeBtn.addEventListener('click', () => {
    modalBackdrop.remove();
    validIcon.classList.remove('visible');
    blockScroll(false);
  });

  modalBackdrop.addEventListener('click', event => {
    if (event.target === modalBackdrop) {
      modalBackdrop.remove();
      validIcon.classList.remove('visible');
      blockScroll(false);
    }
  });
  document.addEventListener('keydown', function escHandler(event) {
    console.log('2');

    if (event.key === 'Escape') {
      modalBackdrop.remove();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

function blockScroll(block) {
  const body = document.body;
  if (block) {
    body.classList.add('no-scroll');
    return;
  }
  body.classList.remove('no-scroll');
}
