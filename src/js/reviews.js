import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let swiper;

async function initReviewsSlider() {
  const reviewsList = document.getElementById('reviews-list');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');

  try {
    const { data: reviews } = await axios.get(
      'https://portfolio-js.b.goit.study/api/reviews'
    );

    if (!Array.isArray(reviews) || reviews.length === 0) {
      reviewsList.innerHTML = `<li class="swiper-slide">Not found</li>`;
      return;
    }

    reviewsList.innerHTML = reviews
      .map(
        review => `
      <li class="swiper-slide">
        <p>${review.review}</p>
        <img src="${review.avatar_url}" alt="${review.author}" />
        <p><strong>${review.author}</strong></p>
      </li>`
      )
      .join('');

    swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      grabCursor: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      simulateTouch: true,
      breakpoints: {
        360: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1280: { slidesPerView: 2 },
      },
      on: {
        afterInit: updateNavButtons,
        slideChange: updateNavButtons,
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

      prevButton.classList.toggle('disabled', isAtStart);
      nextButton.classList.toggle('disabled', isAtEnd);
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
