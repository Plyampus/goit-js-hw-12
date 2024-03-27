export function getImage(value) {
  const KEY = '3539379-d64fd5a5897018ff1512b690c';
  const BASE_URL = 'https://pixabay.com/api/';

  const params = new URLSearchParams({
    key: KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 30,
    safesearch: true,
  });
  const url = `${BASE_URL}?${params}`;

  return fetch(url).then(res => res.json());
}
