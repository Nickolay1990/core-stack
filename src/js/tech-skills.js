/**The main function is the effect of infinite movement of text or content.*/
/**An event handler is added that waits for the HTML document to be fully loaded.
 * When everything is ready, the initMarquee function is called*/
document.addEventListener('DOMContentLoaded', initMarquee);
/**Declaration of the initMarquee function, which initializes the logic
 * for all elements with the class .marquee-inner. */
function initMarquee() {
  const marquees = document.querySelectorAll('.marquee-inner');
  /**Finds all elements in the document that have the class marquee-inner,
   * and stores them in the variable marquees as a list (NodeList). */
  marquees.forEach(function (marqueeInner) {
    /**In the current marqueeInner element, look for a nested element with the class marquee-line. */
    const line = marqueeInner.querySelector('.marquee-line');
    /**Call the cloneLine function, which creates a copy of the found "line". */
    const clone = cloneLine(line);
    /**Add cloned "line" to the end of the current marqueeInner */
    marqueeInner.appendChild(clone);
  });
}
/**Declares a helper function that
 * deep copies the passed DOM node along with all its children. */
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
/**function for asterisks */
document.addEventListener('DOMContentLoaded', function generateNeonStars() {
  const marquees = document.querySelectorAll('.marquee');
  // Find both lanes.

  const neonColors = ['#00ffae', '#39ff14', '#14FF65', '#40F51E', '#AFFF14'];
  // Create an array of colors for the neon stars.

  marquees.forEach(function (marquee) {
    // For each strip, insert asterisks.

    for (let i = 0; i < 21; i++) {
      // Create 21 stars for each strip.

      const star = document.createElement('span');
      // Create a <span> element.

      star.classList.add('star');
      // Add a class for styling.

      star.innerHTML = '✷';
      // Insert an asterisk symbol.

      // Random color from the list
      const randomColor =
        neonColors[Math.floor(Math.random() * neonColors.length)];
      // Choose a random color from the list.

      star.style.color = randomColor;
      star.style.textShadow = `0 0 6px ${randomColor}, 0 0 12px ${randomColor}`;
      // Apply a neon glow of the same color.

      const randomSize = 8 + Math.random() * 16; // From 8px to 24px
      star.style.fontSize = `${randomSize}px`;
      // Random font size

      star.style.top = Math.random() * 100 + '%';
      // Random vertical position.

      star.style.left = Math.random() * 100 + '%';
      // Random horizontal position.

      star.style.animationDuration = 2 + Math.random() * 2 + 's';
      // Random blink rate.

      marquee.appendChild(star);
      // Add an asterisk to the corresponding strip.
    }
  });
});
