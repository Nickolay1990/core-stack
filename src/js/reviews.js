// Імпортуємо бібліотеки і стилі
import Swiper from 'swiper';
import 'swiper/css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchReviews } from './api';

let swiper; // Оголошуємо змінну для зберігання екземпляру Swiper

// Основна функція ініціалізації слайдера
export async function initReviewsSlider() {
  // Отримуємо DOM-елементи для списку відгуків і кнопок навігації
  const reviewsList = document.getElementById('reviews-list');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const prevIcon = prevButton.querySelector('svg');
  const nextIcon = nextButton.querySelector('svg');

  try {
    // Отримуємо відгуки з сервера
    const reviews = await fetchReviews();

    // Якщо відгуків немає або дані некоректні — показуємо повідомлення
    if (!Array.isArray(reviews) || reviews.length === 0) {
      showNotFound(reviewsList);
      return;
    }

    // Рендеримо відгуки на сторінку
    renderReviews(reviewsList, reviews);
    // Ініціалізуємо Swiper слайдер
    initializeSwiper(prevButton, nextButton, prevIcon, nextIcon);
    // Налаштовуємо навігацію кнопками та клавіатурою
    setupNavigation(prevButton, nextButton);
  } catch (error) {
    // Якщо сталася помилка — обробляємо її
    handleError(reviewsList, error);
  }
}

// Функція рендеру відгуків у HTML
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

// Функція ініціалізації Swiper з потрібними налаштуваннями
function initializeSwiper(prevButton, nextButton, prevIcon, nextIcon) {
  swiper = new Swiper('.swiper', {
    slidesPerView: 1, // Скільки слайдів показувати одночасно
    spaceBetween: 32, // Відступи між слайдами
    grabCursor: true, // Відображення курсора у вигляді "хапалки"
    keyboard: { enabled: true, onlyInViewport: true }, // Підтримка навігації клавіатурою
    simulateTouch: true, // Дозволити взаємодію через сенсорний екран
    breakpoints: {
      // Адаптивність
      360: { slidesPerView: 1 },
      1280: { slidesPerView: 2 },
    },
    on: {
      afterInit: () => {
        // Коли Swiper ініціалізовано
        updateNavButtons(prevButton, nextButton, prevIcon, nextIcon);
        setEqualHeightSlides();
      },
      slideChange: () => {
        // Коли змінюється активний слайд
        updateNavButtons(prevButton, nextButton, prevIcon, nextIcon);
        setEqualHeightSlides();
      },
    },
  });
  // Додаємо обробник події на зміну розміру вікна браузера
  window.addEventListener('resize', () => {
    // Викликаємо функцію, яка вирівнює висоту слайдів після зміни розміру вікна
    setEqualHeightSlides();
  });
}

// Функція для налаштування обробників навігації
function setupNavigation(prevButton, nextButton) {
  // Навігація через клавіатуру
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') slideTo('next');
    if (event.key === 'ArrowLeft') slideTo('prev');
  });

  // Навігація через кнопки
  prevButton.addEventListener('click', () => slideTo('prev'));
  nextButton.addEventListener('click', () => slideTo('next'));
}

// Функція для зміни слайду
function slideTo(direction) {
  if (!swiper) return;
  direction === 'next' ? swiper.slideNext() : swiper.slidePrev();
}

// Функція оновлення стану кнопок навігації
function updateNavButtons(prevButton, nextButton, prevIcon, nextIcon) {
  if (!swiper) return;

  // Деактивація або активація кнопок залежно від положення
  prevButton.disabled = swiper.isBeginning;
  nextButton.disabled = swiper.isEnd;
}

// Функція вирівнювання висоти всіх слайдів
function setEqualHeightSlides() {
  const slides = document.querySelectorAll('.swiper-slide');
  let maxHeight = 0;

  // Знаходимо максимальну висоту тексту у слайдах
  slides.forEach(slide => {
    const text = slide.querySelector('.reviews-text');
    if (text) {
      text.style.height = 'auto'; // Спочатку обнуляємо висоту
      maxHeight = Math.max(maxHeight, text.offsetHeight); // Оновлюємо максимальну висоту
    }
  });

  // Встановлюємо однакову висоту для всіх текстів
  slides.forEach(slide => {
    const text = slide.querySelector('.reviews-text');
    if (text) text.style.height = `${maxHeight}px`;
  });
}

// Функція обробки помилки при завантаженні
function handleError(list, error) {
  showError('Failed to load reviews!');
  showNotFound(list);
  console.error('Error loading reviews:', error);
}

// Функція показу повідомлення про помилку через iziToast
function showError(message) {
  iziToast.error({ title: 'Error', message });
}

// Функція показу повідомлення "Not found" в списку
function showNotFound(list) {
  list.innerHTML = '<li class="swiper-slide">Not found</li>';
}

// Викликаємо основну функцію одразу при завантаженні скрипта
initReviewsSlider();
