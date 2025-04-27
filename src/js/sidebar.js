const sideButton = document.querySelector('.side-button');
const sidebarForm = document.querySelector('.sidebar-form');
const html = document.querySelector('html');

sideButton.addEventListener('click', opensideHandler);
sidebarForm.addEventListener('change', changeColorHandler);

function opensideHandler() {
  this.closest('.sidebar').classList.toggle('hidden-bar');
  this.textContent = this.textContent === '<' ? '>' : '<';
}

function changeColorHandler() {
  const selected = this.querySelector('input[name="color"]:checked').value;
  html.classList = '';
  html.classList.add(selected);
  localStorage.setItem('theme', selected);
}

function initTheme() {
  const theme = localStorage.getItem('theme') || 'classic';
  setTheme(theme);
  setRadio(theme);
}

function setTheme(theme) {
  html.classList.add(theme);
  localStorage.setItem('theme', theme);
}

function setRadio(theme) {
  const radio = sidebarForm.querySelector(`[value=${theme}]`);
  radio.checked = true;
}

initTheme();
