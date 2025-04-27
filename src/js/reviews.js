// Імпортуємо бібліотеки і стилі
import Swiper from 'swiper';
import 'swiper/css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchReviews } from './api';

let swiper;

// Основна функція ініціалізації
export async function initReviewsSlider() {
  const reviewsList = document.getElementById('reviews-list');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const prevIcon = prevButton.querySelector('use');
  const nextIcon = nextButton.querySelector('use');

  try {
    const reviews = await fetchReviews();

    if (!Array.isArray(reviews) || reviews.length === 0) {
      showNotFound(reviewsList);
      return;
    }

    renderReviews(reviewsList, reviews);
    initializeSwiper(prevButton, nextButton, prevIcon, nextIcon);
    setupNavigation(prevButton, nextButton);
  } catch (error) {
    handleError(reviewsList, error);
  }
}

// Рендеримо відгуки
function renderReviews(list, reviews) {
  list.innerHTML = reviews
    .map(
      ({ review, avatar_url, author }) => `
      <li class="swiper-slide">
        <p class="reviews-text">${review}</p>
        <div class="reviews-user">
          <img class="reviews-img" src="${avatar_url}" alt="${author}" />
          <p class="reviews-text-user">${author}</p>
        </div>
      </li>`
    )
    .join('');
}

// Ініціалізуємо Swiper
function initializeSwiper(prevButton, nextButton, prevIcon, nextIcon) {
  swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 32,
    grabCursor: true,
    keyboard: { enabled: true, onlyInViewport: true },
    simulateTouch: true,
    breakpoints: {
      360: { slidesPerView: 1 },
      1280: { slidesPerView: 2 },
    },
    on: {
      afterInit: () => {
        updateNavButtons(prevButton, nextButton, prevIcon, nextIcon);
        setEqualHeightSlides();
      },
      slideChange: () => {
        updateNavButtons(prevButton, nextButton, prevIcon, nextIcon);
        setEqualHeightSlides();
      },
    },
  });
}

// Налаштовуємо навігацію
function setupNavigation(prevButton, nextButton) {
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') slideTo('next');
    if (event.key === 'ArrowLeft') slideTo('prev');
  });

  prevButton.addEventListener('click', () => slideTo('prev'));
  nextButton.addEventListener('click', () => slideTo('next'));
}

function slideTo(direction) {
  if (!swiper) return;
  direction === 'next' ? swiper.slideNext() : swiper.slidePrev();
}

// Оновлюємо стан кнопок і іконок
function updateNavButtons(prevButton, nextButton, prevIcon, nextIcon) {
  if (!swiper) return;

  prevButton.disabled = swiper.isBeginning;
  nextButton.disabled = swiper.isEnd;
  updateIcon(prevIcon, swiper.isBeginning);
  updateIcon(nextIcon, swiper.isEnd);
}

function updateIcon(icon, isDisabled) {
  icon.classList.toggle('icon-active', !isDisabled);
  icon.classList.toggle('icon-inactive', isDisabled);
}

// Вирівнюємо висоту слайдів
function setEqualHeightSlides() {
  const slides = document.querySelectorAll('.swiper-slide');
  let maxHeight = 0;

  slides.forEach(slide => {
    const text = slide.querySelector('.reviews-text');
    if (text) {
      text.style.height = 'auto';
      maxHeight = Math.max(maxHeight, text.offsetHeight);
    }
  });

  slides.forEach(slide => {
    const text = slide.querySelector('.reviews-text');
    if (text) text.style.height = `${maxHeight}px`;
  });
}

// Показати помилку
function handleError(list, error) {
  showError('Failed to load reviews!');
  showNotFound(list);
  console.error('Error loading reviews:', error);
}

// Допоміжні функції
function showError(message) {
  iziToast.error({ title: 'Error', message });
}

function showNotFound(list) {
  list.innerHTML = '<li class="swiper-slide">Not found</li>';
}

// Викликаємо одразу
initReviewsSlider();
