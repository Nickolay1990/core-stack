//прокрутка
const scrollUp = document.querySelector('.scroll__up');
const scrollPath = document.querySelector('.scroll__up-svg-path');
const pathLength = scrollPath.getTotalLength();
const offset = 200;

scrollPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollPath.style.strokeDashoffset = pathLength;

const getTop = () => window.scrollY || document.documentElement.scrollTop;

const updateDashoffset = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const dashoffset = pathLength - (getTop() * pathLength) / height;
  scrollPath.style.strokeDashoffset = dashoffset;
};

window.addEventListener('scroll', () => {
  updateDashoffset();
  if (getTop() > offset) {
    scrollUp.classList.add('scroll__up-active');
  } else {
    scrollUp.classList.remove('scroll__up-active');
  }
});

scrollUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
// surprise
function setupSurpriseIcon() {
  const surpriseIcon = document.querySelector('.icon-surprise');
  surpriseIcon.addEventListener('click', function () {
    surpriseIcon.classList.add('animate');

    setTimeout(function () {
      surpriseIcon.classList.remove('animate');
      openModal();
    }, 500);
  });
}

function openModal() {
  const modal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  modal.classList.add('show');
  videoFrame.src = 'https://www.youtube.com/embed/v4Wy7gRGgeA?autoplay=1';
}

function closeModal() {
  const modal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  modal.classList.remove('show');
  setTimeout(function () {
    modal.style.display = 'none';
    videoFrame.src = '';
  }, 500);
}

function setupModal() {
  const closeBtn = document.querySelector('.close');
  const modal = document.getElementById('videoModal');

  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      closeModal();
    }
  });

  const observer = new MutationObserver(function () {
    if (modal.classList.contains('show')) {
      modal.style.display = 'block';
    }
  });

  observer.observe(modal, { attributes: true });
}

// Ініціалізація всіх скриптів
function init() {
  setupSurpriseIcon();
  setupModal();
}

document.addEventListener('DOMContentLoaded', init);
