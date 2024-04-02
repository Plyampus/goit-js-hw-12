import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs, lightbox, displayMessage } from '../main';


export function imagesTemplate(data) {
    if (data.hits.length === 0) {
        displayMessage(
        'Sorry, there are no images matching your search query. Please try again!'
        );
    } else {
        const images = data.hits;

        const markup = images.map(image => 
            `<li class="gallery-item">
                <a class="gallery-link" href="${image.largeImageURL}">
                <img loading="lazy" class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
                </a>
                <div class="stats">
                    <p class="text"><span class="text__span">likes</span><br/>${image.likes}</p>
                    <p class="text"><span class="text__span">Views</span><br/>${image.views}</p>
                    <p class="text"><span class="text__span">Coments</span><br/>${image.comments}</p>
                    <p class="text"><span class="text__span">Dowloads</span><br/>${image.downloads}</p>
                </div>
            </li>`).join('');

    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    }
}
