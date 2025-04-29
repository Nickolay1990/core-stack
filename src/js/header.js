const refs = {
  changeModalBtn: document.querySelectorAll('[data-menu-handler]'),
  modal: document.querySelector('[data-menu]'),
};

refs.changeModalBtn.forEach(link => {
  link.addEventListener('click', toggleModal);
});

function toggleModal() {
  refs.modal.classList.toggle('is-open');
  document.body.classList.toggle('no-scroll');
}
