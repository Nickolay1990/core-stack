// Імпортуємо бібліотеки і стилі
import Swiper from 'swiper';
import 'swiper/css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchReviews } from './api'; // Імпортуємо функцію для отримання відгуків

// Оголошуємо змінну для збереження екземпляра Swiper
let swiper;

// Основна функція для ініціалізації слайдера з відгуками
export async function initReviewsSlider() {
  // Отримуємо елементи DOM для списку відгуків і кнопок навігації
  const reviewsList = document.getElementById('reviews-list');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');

  try {
    // Отримуємо відгуки з сервера
    const reviews = await fetchReviews();

    // Якщо дані не є масивом або масив порожній, показуємо повідомлення "Not found"
    if (!Array.isArray(reviews) || reviews.length === 0) {
      reviewsList.innerHTML = `<li class="swiper-slide">Not found</li>`;
      return;
    }

    // Генеруємо HTML для кожного відгуку і вставляємо у список
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

    // Знаходимо елементи <use> всередині кнопок для подальшої зміни іконок
    const prevIcon = prevButton.querySelector('use');
    const nextIcon = nextButton.querySelector('use');

    // Ініціалізуємо Swiper слайдер із заданими параметрами
    swiper = new Swiper('.swiper', {
      slidesPerView: 1, // Скільки слайдів показувати одночасно
      spaceBetween: 32, // Відстань між слайдами
      grabCursor: true, // Курсор у вигляді руки при наведенні
      keyboard: {
        enabled: true, // Дозволити керування клавіатурою
        onlyInViewport: true, // Тільки коли елемент в полі зору
      },
      simulateTouch: true, // Дозволити свайпи (імітація дотику)
      breakpoints: {
        // Адаптивність для різних розмірів екрану
        360: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1280: { slidesPerView: 2 },
      },
      on: {
        afterInit: () => {
          updateNavButtons(); // Після ініціалізації оновлюємо стан кнопок
          setEqualHeightSlides(); // Вирівнюємо висоту слайдів
        },
        slideChange: () => {
          updateNavButtons(); // При зміні слайду оновлюємо кнопки
          setEqualHeightSlides(); // І вирівнюємо висоту знову
        },
      },
    });

    // Додаємо слухач подій для перемикання слайдів за допомогою клавіш стрілок
    document.addEventListener('keydown', event => {
      if (!swiper) return;

      if (event.key === 'ArrowRight') {
        swiper.slideNext();
      } else if (event.key === 'ArrowLeft') {
        swiper.slidePrev();
      }
    });

    // Додаємо слухач кліку на кнопку "Назад"
    prevButton.addEventListener('click', () => {
      if (!prevButton.disabled) swiper.slidePrev();
    });

    // Додаємо слухач кліку на кнопку "Вперед"
    nextButton.addEventListener('click', () => {
      if (!nextButton.disabled) swiper.slideNext();
    });

    // Функція для оновлення стану кнопок навігації
    function updateNavButtons() {
      if (!swiper) return;

      const isAtStart = swiper.isBeginning; // Чи на початку
      const isAtEnd = swiper.isEnd; // Чи в кінці

      // Вмикаємо/вимикаємо кнопки залежно від позиції
      prevButton.disabled = isAtStart;
      nextButton.disabled = isAtEnd;

      // Оновлюємо іконки кнопок
      updateButtonIcon(prevButton, prevIcon, isAtStart);
      updateButtonIcon(nextButton, nextIcon, isAtEnd);
    }

    // Функція для оновлення іконки кнопки залежно від активності
    function updateButtonIcon(button, iconElement, isDisabled) {
      if (isDisabled) {
        iconElement.setAttribute('href', '/img/sprite.svg#icon-arrow-inactive'); // Сіра стрілка
      } else {
        iconElement.setAttribute('href', '/img/sprite.svg#icon-arrow-default'); // Активна стрілка
      }
    }

    // Функція для вирівнювання висоти тексту у всіх слайдах
    function setEqualHeightSlides() {
      const slides = document.querySelectorAll('.swiper-slide');
      let maxHeight = 0;

      // Спочатку знаходимо максимальну висоту блоку тексту серед усіх слайдів
      slides.forEach(slide => {
        const reviewText = slide.querySelector('.reviews-text');
        if (reviewText) {
          reviewText.style.height = 'auto'; // Скидаємо висоту
          const height = reviewText.offsetHeight;
          if (height > maxHeight) {
            maxHeight = height; // Зберігаємо максимальну висоту
          }
        }
      });

      // Встановлюємо всім слайдам однакову висоту
      slides.forEach(slide => {
        const reviewText = slide.querySelector('.reviews-text');
        if (reviewText) {
          reviewText.style.height = `${maxHeight}px`;
        }
      });
    }
  } catch (error) {
    // Якщо сталася помилка при отриманні відгуків
    iziToast.error({
      title: 'Error',
      message: 'Failed to load reviews!', // Повідомлення для користувача
    });
    reviewsList.innerHTML = `<li class="swiper-slide">Not found</li>`; // Показуємо "Not found"
    console.error('Error loading reviews:', error); // Виводимо помилку в консоль
  }
}

// Викликаємо функцію ініціалізації одразу
initReviewsSlider();
