import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getImages } from "./js/pixabay-api.js";
import { imagesTemplate } from "./js/render-functions.js";


export const lightbox = new SimpleLightbox('.gallery-link', {
    captionsData: "alt",
    captionDelay: 250,
});

export const refs = {
    form: document.querySelector(".form"),
    searchInput: document.getElementById("searchInput"),
    searchBtn: document.querySelector("button"),
    loadBtn: document.querySelector(".load-more-button"),
    loader: document.querySelector(".loader"),
    gallery: document.querySelector(".gallery"),
}


export let value = "";
export let currentPage = 1;
export let pageLimit = 15;
export let totalHits = 0;

hideLoader();
hideLoadBtn();

let messageDisplayed = false; // Declare the flag here

refs.form.addEventListener("submit", async event => {
    event.preventDefault();
    currentPage = 1;
    refs.gallery.innerHTML = "";
    value = refs.searchInput.value.trim();
    messageDisplayed = false; // Reset the flag here
    if (value !== '') {
        try {
            const data = await getImages(value, currentPage);
            totalHits = data.totalHits;
            const maxPage = Math.ceil(totalHits / pageLimit);
            imagesTemplate(data);
            hideLoader();
            if (currentPage >= maxPage) {
                hideLoadBtn();
            } else {
                showLoadBtn();
            }
        } catch (error) {
            console.log(error);
            displayMessage("An error occurred while fetching data.");
            hideLoadBtn();
        }
    } else {
        displayMessage("Empty field!");
        hideLoadBtn();
    }
    refs.form.reset();
});
refs.loadBtn.addEventListener("click", async onLoadMoreClick => {
    if (currentPage * pageLimit >= totalHits) {
        if (!messageDisplayed) {
            displayMessage("No more images to load.");
            messageDisplayed = true;
        }
        return;
    }
    currentPage += 1;
    try {
        const data = await getImages(value, currentPage);
        hideLoader();
        imagesTemplate(data);
        showLoadBtn();
        const item = document.querySelector(".gallery-item");
        const rect = item.getBoundingClientRect();
        window.scrollBy({
            top: rect.height * 2,
            behavior: "smooth",
        })
        const maxPage = Math.ceil(totalHits / pageLimit);
        if (currentPage >= maxPage) {
            hideLoadBtn();
        }
    } catch (error) {
        console.log(error);
        displayMessage("An error occurred while fetching data.");
        hideLoadBtn();
    }
});


export function displayMessage(message) {
    if (message === "No more images to load." && messageDisplayed) {
        return;
    }
    iziToast.error({
        title: '',
        message: message,
        position: "topRight",
        backgroundColor: "red",
    });
    
    if (message === "No more images to load.") {
        messageDisplayed = true;
    }
}

export function hideLoader() {
    refs.loader.style.display = "none";
}

export function showLoader() {
    refs.loader.style.display = "block";
}

function hideLoadBtn() {
    refs.loadBtn.style.display = "none";
}

function showLoadBtn() {
    refs.loadBtn.style.display = "block";    
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (currentPage * pageLimit >= totalHits && !messageDisplayed) {
            displayMessage("No more images to load.");
            messageDisplayed = true;
            return;
        }
    }
});
