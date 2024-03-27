import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImage } from './js/pixabay-api';
import { imagesTemplate } from './js/render-functions';

const formEl = document.querySelector('.form');
const listEl = document.querySelector('.gallery');
const divEl = document.querySelector('.loader');

formEl.addEventListener('submit', event => {
  event.preventDefault();
  listEl.innerHTML = '';
  const value = event.target.elements.value.value;

  if (value.trim()) {
    divEl.classList.remove('is-hidden');
    getImage(value)
      .then(data => {
        if (!data.hits.length) {
          iziToast.error({ title: 'Error', message: 'Sorry, there are no images matching your search query. Please try again!', });
        }
        const markup = imagesTemplate(data.hits);
        listEl.insertAdjacentHTML('afterbegin', markup);
        divEl.classList.add('is-hidden');
      })
      .then(() => {
        const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, });
      })
      .catch(error => alert('Error: ' + error.message));
  } else {
    iziToast.error({ title: 'Error', message: 'The search field is empty. Please try again!', });
  }

  try {
    const inputValue = event.target.elements.value.value;
    if (!inputValue.trim()) {
      throw new Error('Field input cannot be empty.');
    }
  } catch (error) {
    alert('Error occurred: ' + error.message);
  }

  formEl.reset();
});

window.addEventListener('offline', () => {
  alert('Втрата з\'єднання з Інтернетом.');
  // Додаткові дії, якщо потрібно
});