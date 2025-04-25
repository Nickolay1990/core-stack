import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
export const accordion = new Accordion('.accordion-list', {
  duration: 400,
  showMultiple: false,
  beforeOpen: function (currentElement) {
    currentElement.style.backgroundColor = '#bcdfd1';
  },
  beforeClose: function (currentElement) {
    currentElement.style.backgroundColor = '#fff';
  },
});
accordion.open(0);
