import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
export const accordion = new Accordion('.accordion-list', {
  duration: 400,
});
accordion.open(0);
