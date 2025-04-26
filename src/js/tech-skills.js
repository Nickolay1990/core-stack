/**Основна функція ефект нескінченного руху тексту чи контенту.*/
/**Додається обробник події, який чекає повного завантаження HTML-документу.
 * Коли все готово, викликається функція initMarquee*/
document.addEventListener('DOMContentLoaded', initMarquee);
/**Оголошення функції initMarquee, яка ініціалізує логіку
 *  для усіх елементів з класом .marquee-inner. */
function initMarquee() {
  const marquees = document.querySelectorAll('.marquee-inner');
  /**Знаходяться всі елементи в документі, які мають клас marquee-inner,
   *  і зберігаються у змінну marquees як список (NodeList). */
  marquees.forEach(function (marqueeInner) {
    /**У поточному елементі marqueeInner шукаємо вкладений елемент з класом marquee-line. */
    const line = marqueeInner.querySelector('.marquee-line');
    /**Викликаємо функцію cloneLine, яка створює копію знайденої "лінії". */
    const clone = cloneLine(line);
    /**Додаємо клоновану "лінію" в кінець поточного marqueeInner */
    marqueeInner.appendChild(clone);
  });
}
/**Оголошення допоміжної функції,
 * яка глибоко копіює переданий DOM-вузол разом з усіма його дочірніми елементами. */
function cloneLine(line) {
  return line.cloneNode(true);
}
/**feature variant */
/*document.addEventListener('DOMContentLoaded', () => {
  const marquees = document.querySelectorAll('.marquee-inner');

  marquees.forEach(marqueeInner => {
    const line = marqueeInner.querySelector('.marquee-line');
    const clone = line.cloneNode(true);
    marqueeInner.appendChild(clone);
  });
});*/
/**функція для зірочок */
document.addEventListener('DOMContentLoaded', function generateNeonStars() {
  const marquees = document.querySelectorAll('.marquee');
  // Знаходимо обидві полоси.

  const neonColors = ['#00ffae', '#39ff14', '#14FF65', '#40F51E', '#AFFF14'];
  //  Створюємо масив кольорів для неонових зірочок.

  marquees.forEach(function (marquee) {
    //  Для кожної полоски виконуємо вставку зірочок.

    for (let i = 0; i < 24; i++) {
      //  Створюємо 24 зірочок на кожну полосу.

      const star = document.createElement('span');
      //  Створюємо елемент <span>.

      star.classList.add('star');
      //  Додаємо клас для стилізації.

      star.innerHTML = '★';
      //  Вставляємо символ зірочки.

      // Випадковий колір зі списку
      const randomColor =
        neonColors[Math.floor(Math.random() * neonColors.length)];
      // Вибираємо випадковий колір зі списку.

      star.style.color = randomColor;
      star.style.textShadow = `0 0 6px ${randomColor}, 0 0 12px ${randomColor}`;
      // Застосовуємо неонове світіння того ж кольору.

      const randomSize = 8 + Math.random() * 16; // Від 8px до 24px
      star.style.fontSize = `${randomSize}px`;
      // Випадковий розмір шрифту

      star.style.top = Math.random() * 100 + '%';
      //  Випадкове вертикальне положення.

      star.style.left = Math.random() * 100 + '%';
      //  Випадкове горизонтальне положення.

      star.style.animationDuration = 2 + Math.random() * 2 + 's';
      //  Випадкова швидкість миготіння.

      marquee.appendChild(star);
      //  Додаємо зірочку у відповідну полосу.
    }
  });
});
