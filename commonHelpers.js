import{a as L,S as x,i as v}from"./assets/vendor-09d7c26e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&r(m)}).observe(document,{childList:!0,subtree:!0});function c(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=c(e);fetch(e.href,n)}})();const P=L.create({baseURL:"https://pixabay.com/api/"});async function h(){const o={key:"3539379-d64fd5a5897018ff1512b690c",q:u,per_page:f,page:a,image_type:"photo",orientation:"horizontal",safesearch:"true"};return I(),(await P.get("",{params:o})).data}function w(o){if(o.hits.length===0)i("Sorry, there are no images matching your search query. Please try again!");else{const c=o.hits.map(r=>`<li class="gallery-item">
                <a class="gallery-link" href="${r.largeImageURL}">
                <img loading="lazy" class="gallery-image" src="${r.webformatURL}" alt="${r.tags}" />
                </a>
                <div class="stats">
                    <p class="text"><span class="text__span">likes</span><br/>${r.likes}</p>
                    <p class="text"><span class="text__span">Views</span><br/>${r.views}</p>
                    <p class="text"><span class="text__span">Coments</span><br/>${r.comments}</p>
                    <p class="text"><span class="text__span">Dowloads</span><br/>${r.downloads}</p>
                </div>
            </li>`).join("");s.gallery.insertAdjacentHTML("beforeend",c),B.refresh()}}const B=new x(".gallery-link",{captionsData:"alt",captionDelay:250}),s={form:document.querySelector(".form"),searchInput:document.getElementById("searchInput"),searchBtn:document.querySelector("button"),loadBtn:document.querySelector(".load-more-button"),loader:document.querySelector(".loader"),gallery:document.querySelector(".gallery")};let u="",a=1,f=15,p=0;g();d();function y(){return window.navigator.onLine}let l=!1;s.form.addEventListener("submit",async o=>{if(o.preventDefault(),a=1,s.gallery.innerHTML="",u=s.searchInput.value.trim(),l=!1,u!==""){if(!y()){i("Internet connection is lost. Please check your connection.");return}try{const t=await h(u,a);p=t.totalHits;const c=Math.ceil(p/f);w(t),g(),a>=c?d():b()}catch(t){console.log(t),i("An error occurred while fetching data."),d()}}else i("Empty field!"),d();s.form.reset()});s.loadBtn.addEventListener("click",async o=>{if(!y()){i("Internet connection is lost. Please check your connection.");return}if(a*f>=p){l||(i("No more images to load."),l=!0);return}a+=1;try{const t=await h(u,a);g(),w(t),b();const r=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:r.height*2,behavior:"smooth"});const e=Math.ceil(p/f);if(a>=e){if(!y()){i("Internet connection is lost. Please check your connection.");return}d()}}catch(t){console.log(t),i("An error occurred while fetching data."),d()}});function i(o){o==="No more images to load."&&l||(v.error({title:"",message:o,position:"topRight",backgroundColor:"red"}),o==="No more images to load."&&(l=!0))}function g(){s.loader.style.display="none"}function I(){s.loader.style.display="block"}function d(){s.loadBtn.style.display="none"}function b(){s.loadBtn.style.display="block"}window.addEventListener("scroll",()=>{if(window.innerHeight+window.scrollY>=document.body.offsetHeight&&a*f>=p&&!l){i("No more images to load."),l=!0;return}});
//# sourceMappingURL=commonHelpers.js.map
