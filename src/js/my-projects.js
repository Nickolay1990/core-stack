const loadMoreBtn = document.querySelector('.load-more');
const projectItems = document.querySelectorAll('.list-item');

const iframeLinks = [
  'https://power-pulse.f.goit.study/welcome/',
  'https://dmytostas.github.io/mimino/',
  'https://vyshyvanka-vibes.f.goit.study/',
  'https://goitstudentsworks.github.io/106_html-css_Siriulas/',
  'https://wallet-goit-fsv.netlify.app/',
  'https://chegojewelry.com/en',
  'https://energy-flow.f.goit.study/',
  'https://z9877969.github.io/fruits_landing/',
  'https://tate-t.github.io/StarlightStudio/',
  'https://tkachenkokaterina.github.io/english-excellence/',
];

const videoSource = [
  './video/transform-body.mp4',
  './video/mimino.mp4',
  './video/traditional.mp4',
  './video/vegetables.mp4',
  './video/wallet.mp4',
  './video/jewelry.mp4',
  './video/get-body.mp4',
  './video/fresh-harvest.mp4',
  './video/business.mp4',
  './video/learning.mp4',
];

let visibleCount = 3;
const itemsPerClick = 3;
let isExpanded = false;

function showItems() {
  projectItems.forEach(function (item, index) {
    if (index < visibleCount) {
      item.classList.add('show');
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
      item.classList.remove('show');
    }
  });
}

function scrollToNewItem(startIndex) {
  const targetItem = projectItems[startIndex];
  if (targetItem) {
    targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function handleLoadMoreClick() {
  if (!isExpanded) {
    const previousVisibleCount = visibleCount;
    visibleCount += itemsPerClick;

    if (visibleCount >= projectItems.length) {
      visibleCount = projectItems.length;
      isExpanded = true;
      loadMoreBtn.textContent = 'Show less';
    }

    showItems();
    scrollToNewItem(previousVisibleCount);
  } else {
    visibleCount = 3;
    showItems();

    const firstCard = projectItems[0];
    if (firstCard) {
      firstCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    loadMoreBtn.textContent = 'Load more';
    isExpanded = false;
  }
}

function loadIframesOnDesktop() {
  if (window.innerWidth >= 1280) {
    projectItems.forEach((item, index) => {
      const cardText = item.querySelector('.card-text');
      const video = item.querySelector('video');
      const iframe = item.querySelector('iframe');
      if (iframe) {
        iframe.remove();
      }
      if (video) {
        video.remove();
      }
      if (iframeLinks[index]) {
        const iframe = document.createElement('iframe');
        iframe.src = iframeLinks[index];
        iframe.className = 'iframe-style';
        iframe.loading = 'lazy';
        item.insertBefore(iframe, cardText);
      }
    });
  } else {
    projectItems.forEach((item, index) => {
      const cardText = item.querySelector('.card-text');
      const iframe = item.querySelector('iframe');
      const video = item.querySelector('video');
      if (video) {
        video.remove();
      }
      if (iframe) {
        iframe.remove();
      }
      if (videoSource[index]) {
        const video = document.createElement('video');
        video.className = 'video-style';
        video.src = videoSource[index];
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.preload = 'none';

        item.insertBefore(video, cardText);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  showItems();
  loadMoreBtn.addEventListener('click', handleLoadMoreClick);
  loadIframesOnDesktop();
  window.addEventListener('resize', loadIframesOnDesktop);
});
