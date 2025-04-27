import axios from 'axios';

export async function fetchReviews() {
  const response = await axios.get(
    'https://portfolio-js.b.goit.study/api/reviews'
  );
  return response.data;
}
console.log('api');
