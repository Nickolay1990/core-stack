// Імпортуємо бібліотеки і стилі
import Swiper from 'swiper';
import 'swiper/css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchReviews } from './api'; // Імпортуємо функцію для отримання відгуків

let swiper; // Змінна для збереження екземпляра слайдера

// Основна функція для ініціалізації слайдера з відгуками
export async function initReviewsSlider() {
  // Отримуємо елементи DOM для списку відгуків і кнопок навігації
  const reviewsList = document.getElementById('reviews-list');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const prevIcon = prevButton.querySelector('use');
  const nextIcon = nextButton.querySelector('use');

  try {
    // Отримуємо відгуки з сервера
    const reviews = await fetchReviews();

    // Якщо відгуків немає або вони не у вигляді масиву
    if (!Array.isArray(reviews) || reviews.length === 0) {
      reviewsList.innerHTML = `<li class="swiper-slide">Not found</li>`;
      return;
    }

    // Генеруємо HTML для відгуків
    generateReviewHTML(reviewsList, reviews);
    // Ініціалізуємо слайдер
    initializeSwiper(prevButton, nextButton, prevIcon, nextIcon);
    // Додаємо обробники подій для кнопок
    addEventListeners(prevButton, nextButton, prevIcon, nextIcon);
  } catch (error) {
    // Якщо сталася помилка при отриманні відгуків
    handleError(reviewsList, error);
  }
}

// Функція для генерації HTML для відгуків
function generateReviewHTML(reviewsList, reviews) {
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
}

// Функція для ініціалізації слайдера Swiper
function initializeSwiper(prevButton, nextButton, prevIcon, nextIcon) {
  swiper = new Swiper('.swiper', {
    slidesPerView: 1, // Відображаємо один слайд одночасно
    spaceBetween: 32, // Відстань між слайдами
    grabCursor: true, // Курсор у вигляді руки при наведенні
    keyboard: {
      enabled: true, // Дозволяємо керувати слайдером клавіатурою
      onlyInViewport: true, // Тільки коли слайдер у полі зору
    },
    simulateTouch: true, // Дозволяємо свайпи (імітація дотику)
    breakpoints: {
      // Налаштовуємо кількість слайдів на різних екранах
      360: { slidesPerView: 1 },
      768: { slidesPerView: 1 },
      1280: { slidesPerView: 2 },
    },
    on: {
      // Після ініціалізації слайдера
      afterInit: () => {
        updateNavButtons(prevButton, nextButton, prevIcon, nextIcon);
        setEqualHeightSlides(); // Вирівнюємо висоту слайдів
      },
      // При зміні слайду
      slideChange: () => {
        updateNavButtons(prevButton, nextButton, prevIcon, nextIcon);
        setEqualHeightSlides(); // Вирівнюємо висоту знову
      },
    },
  });
}

// Функція для оновлення стану кнопок навігації
function updateNavButtons(prevButton, nextButton, prevIcon, nextIcon) {
  if (!swiper) return;

  const isAtStart = swiper.isBeginning; // Чи на початку
  const isAtEnd = swiper.isEnd; // Чи в кінці

  // Вимикаємо/вмикаємо кнопки залежно від позиції слайдера
  prevButton.disabled = isAtStart;
  nextButton.disabled = isAtEnd;

  // Оновлюємо іконки кнопок
  updateButtonIcon(prevIcon, isAtStart);
  updateButtonIcon(nextIcon, isAtEnd);
}

// Функція для оновлення іконки кнопки навігації
function updateButtonIcon(iconElement, isDisabled) {
  if (isDisabled) {
    iconElement.setAttribute('href', '/img/sprite.svg#icon-arrow-inactive'); // Якщо неактивна, ставимо сірі іконки
  } else {
    iconElement.setAttribute('href', '/img/sprite.svg#icon-arrow-default'); // Якщо активна, ставимо звичайні іконки
  }
}

// Функція для додавання обробників подій для кнопок
function addEventListeners(prevButton, nextButton, prevIcon, nextIcon) {
  // Обробник події для клавіатурних стрілок
  document.addEventListener('keydown', event => {
    if (!swiper) return;

    if (event.key === 'ArrowRight') {
      swiper.slideNext(); // Переміщаємось на наступний слайд
    } else if (event.key === 'ArrowLeft') {
      swiper.slidePrev(); // Переміщаємось на попередній слайд
    }
  });

  // Обробник події для кнопки "Назад"
  prevButton.addEventListener('click', () => {
    if (!prevButton.disabled) swiper.slidePrev(); // Якщо кнопка активна, переходимо на попередній слайд
  });

  // Обробник події для кнопки "Вперед"
  nextButton.addEventListener('click', () => {
    if (!nextButton.disabled) swiper.slideNext(); // Якщо кнопка активна, переходимо на наступний слайд
  });
}

// Функція для вирівнювання висоти слайдів
function setEqualHeightSlides() {
  const slides = document.querySelectorAll('.swiper-slide');
  let maxHeight = 0;

  // Знаходимо максимальну висоту серед всіх слайдів
  slides.forEach(slide => {
    const reviewText = slide.querySelector('.reviews-text');
    if (reviewText) {
      reviewText.style.height = 'auto'; // Спочатку скидаємо висоту
      const height = reviewText.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height; // Зберігаємо максимальну висоту
      }
    }
  });

  // Встановлюємо однакову висоту для всіх слайдів
  slides.forEach(slide => {
    const reviewText = slide.querySelector('.reviews-text');
    if (reviewText) {
      reviewText.style.height = `${maxHeight}px`;
    }
  });
}

// Функція для обробки помилок
function handleError(reviewsList, error) {
  iziToast.error({
    title: 'Error',
    message: 'Failed to load reviews!', // Повідомлення для користувача
  });
  reviewsList.innerHTML = `<li class="swiper-slide">Not found</li>`; // Показуємо "Not found"
  console.error('Error loading reviews:', error); // Виводимо помилку в консоль
}

// Викликаємо функцію ініціалізації одразу
initReviewsSlider();
