const button = document
  .querySelector('.side-button')
  .addEventListener('click', opensideHandler);

function opensideHandler() {
  this.closest('.sidebar').classList.toggle('hidden-bar');
  this.textContent = this.textContent === '<' ? '>' : '<';
}

const sidebarForm = document.querySelector('.sidebar-form');

sidebarForm.addEventListener('change', changeColorHandler);

function changeColorHandler() {
  const selected = this.querySelector('input[name="color"]:checked').value;
  document.querySelector('html').classList = '';
  document.querySelector('html').classList.add(selected);
}
