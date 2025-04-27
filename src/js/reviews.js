import Swiper from 'swiper';
import 'swiper/css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchReviews } from './api';

let swiper;

export async function initReviewsSlider() {
  const reviewsList = document.getElementById('reviews-list');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');

  try {
    const reviews = await fetchReviews();

    if (!Array.isArray(reviews) || reviews.length === 0) {
      reviewsList.innerHTML = `<li class="swiper-slide">Not found</li>`;
      return;
    }

    reviewsList.innerHTML = reviews
      .map(
        review => `
      <li class="swiper-slide">
        <p class="reviews-text">${review.review}</p>
        <div class="reviews-user">
          <img class="reviews-img" src="${review.avatar_url}" alt="${review.author}" />
          <p class="reviews-text-user">${review.author}</p>
        </div>
      </li>`
      )
      .join('');

    const prevIcon = prevButton.querySelector('use');
    const nextIcon = nextButton.querySelector('use');

    swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 32,
      grabCursor: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      simulateTouch: true,
      breakpoints: {
        360: { slidesPerView: 1 },
      },
      on: {
        afterInit: () => {
          updateNavButtons();
          setEqualHeightSlides(); // Додаємо вирівнювання висоти слайдів
        },
        slideChange: () => {
          updateNavButtons();
          setEqualHeightSlides(); // Оновлюємо висоту при зміні слайду
        },
      },
    });

    document.addEventListener('keydown', event => {
      if (!swiper) return;

      if (event.key === 'ArrowRight') {
        swiper.slideNext();
      } else if (event.key === 'ArrowLeft') {
        swiper.slidePrev();
      }
    });

    prevButton.addEventListener('click', () => {
      if (!prevButton.disabled) swiper.slidePrev();
    });

    nextButton.addEventListener('click', () => {
      if (!nextButton.disabled) swiper.slideNext();
    });

    function updateNavButtons() {
      if (!swiper) return;

      const isAtStart = swiper.isBeginning;
      const isAtEnd = swiper.isEnd;

      prevButton.disabled = isAtStart;
      nextButton.disabled = isAtEnd;

      updateButtonIcon(prevButton, prevIcon, isAtStart);
      updateButtonIcon(nextButton, nextIcon, isAtEnd);
    }

    function updateButtonIcon(button, iconElement, isDisabled) {
      if (isDisabled) {
        iconElement.setAttribute('href', '/img/sprite.svg#icon-arrow-inactive');
      } else {
        iconElement.setAttribute('href', '/img/sprite.svg#icon-arrow-default');
      }
    }

    function setEqualHeightSlides() {
      const slides = document.querySelectorAll('.swiper-slide');
      let maxHeight = 0;

      // Знаходимо найбільшу висоту для абзаців в слайдах
      slides.forEach(slide => {
        const reviewText = slide.querySelector('.reviews-text');
        if (reviewText) {
          reviewText.style.height = 'auto'; // Обнуляємо висоту
          const height = reviewText.offsetHeight;
          if (height > maxHeight) {
            maxHeight = height;
          }
        }
      });

      // Встановлюємо висоту для всіх абзаців в слайдах на рівні найвищого
      slides.forEach(slide => {
        const reviewText = slide.querySelector('.reviews-text');
        if (reviewText) {
          reviewText.style.height = `${maxHeight}px`;
        }
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load reviews!',
    });
    reviewsList.innerHTML = `<li class="swiper-slide">Not found</li>`;
    console.error('Error loading reviews:', error);
  }
}

initReviewsSlider();
