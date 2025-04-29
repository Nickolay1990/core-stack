const refs = {
  openModalBtn: document.querySelector('[data-menu-open]'),

  closeModalBtn: document.querySelector('[data-menu-close]'),

  modal: document.querySelector('[data-menu]'),
  closeModalLinks: document.querySelectorAll('.mobile-nav-link, .mobile-order-link')
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

refs.closeModalLinks.forEach(link => {
  link.addEventListener('click', toggleModal);
});

function toggleModal() {
  refs.modal.classList.toggle('is-open');
  document.body.classList.toggle('no-scroll');
}
