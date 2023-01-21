import { fetchImages } from './API';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { lightbox } from './lightbox';

const formRef = document.querySelector(`.search-form`);
const galleryRef = document.querySelector(`.gallery`);
const loadMoreBtnRef = document.querySelector(`.load-more`, onLoadMore);
const buttonUpRef = document.querySelector(`.button-up`);

formRef.addEventListener(`submit`, onDeleteMarkup);
formRef.addEventListener(`submit`, onSearch);
loadMoreBtnRef.addEventListener(`click`, onLoadMore);

let currentPage = 1;

async function onSearch(e) {
  e.preventDefault();

  const { searchQuery } = e.target;

  if (!searchQuery.value) {
    Notify.info(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    return;
  }

  const response = await fetchImages(
    searchQuery.value.trim().toLowerCase(),
    currentPage
  );

  onShowNotificationForHitsValue(response);

  onAddMarkupOnDOM(onCreateMarkupForCardImage(response));
  lightbox.refresh();
}

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

function onDeleteMarkup() {
  galleryRef.innerHTML = ` `;
  hiddenBtn();
}

function hiddenBtn() {
  loadMoreBtnRef.classList.add('visually-hidden');
  loadMoreBtnRef.setAttribute('disabled', '');
  buttonUpRef.classList.add('visually-hidden');
  buttonUpRef.setAttribute('disabled', '');
}

function showBtn() {
  loadMoreBtnRef.removeAttribute('disabled');
  loadMoreBtnRef.classList.remove('visually-hidden');
  buttonUpRef.removeAttribute('disabled');
  buttonUpRef.classList.remove('visually-hidden');
}

function onShowNotificationForHitsValue(response) {
  const { hits, totalHits } = response.data;

  if (hits.length === 0) {
    Notify.info(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  } else {
    Notify.success(`Hooray! We found ${totalHits} images.`);

    showBtn();
  }
}

async function onLoadMore(e) {
  currentPage += 1;

  const response = await fetchImages(formRef.searchQuery.value, currentPage);

  await onAddCardsForPressLoadMoreBtn(onCreateMarkupForCardImage(response));

  onShowNotificationForHitsValue(response);
  lightbox.refresh();

  if (galleryRef.children.length === response.data.totalHits) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    hiddenBtn();
  }
}

function onAddCardsForPressLoadMoreBtn(markup) {
  return galleryRef.insertAdjacentHTML('beforeend', markup);
}
