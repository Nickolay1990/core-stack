
import business from '../video/business.mp4';
import harvest from '../video/fresh-harvest.mp4';
import getBody from '../video/get-body.mp4';
import jewelry from '../video/jewelry.mp4';
import learning from '../video/learning.mp4';
import mimino from '../video/mimino.mp4';
import traditional from '../video/traditional.mp4';
import transform from '../video/transform-body.mp4';
import vegetables from '../video/vegetables.mp4';
import wallet from '../video/wallet.mp4';

const loadMoreBtn = document.querySelector('.load-more');
const projectsList = document.querySelector('.projects-list');

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
  transform,
  mimino,
  traditional,
  vegetables,
  wallet,
  jewelry,
  getBody,
  harvest,
  business,
  learning,
];

const listItems = Array.from(document.querySelectorAll('.projects-list .list-item'));

let visibleCount = 3;
const itemsPerClick = 3;
let isExpanded = false;

function showItems() {
  listItems.forEach((item, index) => {
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
  const targetItem = listItems[startIndex];
  if (targetItem) {
    targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function handleLoadMoreClick() {
  if (!isExpanded) {
    const previousVisibleCount = visibleCount;
    visibleCount += itemsPerClick;

    if (visibleCount >= listItems.length) {
      visibleCount = listItems.length;
      isExpanded = true;
      loadMoreBtn.textContent = 'Show less';
    }

    showItems();
    scrollToNewItem(previousVisibleCount);
  } else {
    visibleCount = 3;
    showItems();

    const firstCard = listItems[0];
    if (firstCard) {
      firstCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    loadMoreBtn.textContent = 'Load more';
    isExpanded = false;
  }
}

function renderMediaContent() {
  const isDesktop = window.matchMedia('(min-width: 1280px)').matches;

  listItems.forEach((item, index) => {
    const cardText = item.querySelector('.card-text');
    let mediaHTML = '';

    if (isDesktop) {
      mediaHTML = `
        <div class="iframe-wrapper">
          <iframe src="${iframeLinks[index]}" class="iframe-style" loading="lazy"></iframe>
          <button type="button" class="iframe-button">Show preview</button>
        </div>
      `;
    } else {
      mediaHTML = `
        <video class="video-style" src="${videoSource[index]}" autoplay loop muted playsinline preload="none"></video>
      `;
    }

    cardText.insertAdjacentHTML('beforebegin', mediaHTML);
  });

  if (isDesktop) {
    projectsList.addEventListener('click', (event) => {
      if (event.target.classList.contains('iframe-button')) {
        const iframe = event.target.previousElementSibling;
        toggleButtonIframe(iframe, event.target);
      }
    });
  }
}

function toggleButtonIframe(iframe, button) {
  const active = iframe.style.pointerEvents === 'auto';
  iframe.style.pointerEvents = active ? 'none' : 'auto';
  button.textContent = active ? 'Show preview' : 'Hide preview';
}

document.addEventListener('DOMContentLoaded', () => {
  showItems();
  loadMoreBtn.addEventListener('click', handleLoadMoreClick);
  renderMediaContent();

  const mediaQuery = window.matchMedia('(min-width: 1280px)');
  mediaQuery.addEventListener('change', () => {
    listItems.forEach(item => {
      const oldMedia = item.querySelector('.iframe-wrapper') || item.querySelector('video');
      if (oldMedia) oldMedia.remove();
    });
    renderMediaContent();
  });
});