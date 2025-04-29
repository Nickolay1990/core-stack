const refs = {
  changeModalBtn: document.querySelectorAll('[data-menu-handler]'),
  modal: document.querySelector('[data-menu]'),
  footerLinks: document.querySelectorAll('[data-scrol-down]'),
};

console.log(refs.footerLinks);

refs.changeModalBtn.forEach(link => {
  link.addEventListener('click', toggleModal);
});

refs.footerLinks.forEach(link => {
  link.addEventListener('click', scrolDown);
});

function toggleModal() {
  refs.modal.classList.toggle('is-open');
  document.body.classList.toggle('no-scroll');
}

function scrolDown(event) {
  event.preventDefault();
  const section = document.querySelector('#contacts');
  const sectionBottom = section.offsetTop + section.offsetHeight;

  window.scrollTo({
    top: sectionBottom - window.innerHeight,
  });

  if (this.closest('.mobile-order-link')) {
    toggleModal();
  }
}
