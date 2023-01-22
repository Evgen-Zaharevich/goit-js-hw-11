import { galleryRef } from './refs';
import { hiddenBtn } from './utils';

export {
  onCreateMarkupForCardImage,
  onAddMarkupOnDOM,
  onAddCardsForPressLoadMoreBtn,
  onDeleteMarkup,
};

function onCreateMarkupForCardImage(response) {
  const { hits } = response.data;
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="gallery__item">
      <a class="gallery__link" href="${largeImageURL}">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a
      <div>
      <div class="info">
        <p class="info-item">
         <b>Likes </b>${likes}
        </p> 
        <p class="info-item">
          <b>Views </b>${views}
        </p>
        <p class="info-item">
          <b>Comments </b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads </b>${downloads}
        </p>
        </div>  
      </div>
    </div>`;
      }
    )
    .join(``);
}

function onAddMarkupOnDOM(markup) {
  galleryRef.insertAdjacentHTML(`afterbegin`, markup);
}

function onAddCardsForPressLoadMoreBtn(markup) {
  return galleryRef.insertAdjacentHTML('beforeend', markup);
}

function onDeleteMarkup() {
  galleryRef.innerHTML = ` `;
  hiddenBtn();
}
