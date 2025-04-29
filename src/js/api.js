import axios from 'axios';

export async function fetchReviews() {
  const response = await axios.get(
    'https://portfolio-js.b.goit.study/api/reviews'
  );
  return response.data;
}
console.log('api');

const BASE_URL = 'https://portfolio-js.b.goit.study/api/requests';

export async function sendContactForm(data) {
  const response = await axios.post(BASE_URL, data);
  return response.data; 
}