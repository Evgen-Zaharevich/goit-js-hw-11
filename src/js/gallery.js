import { fetchImages } from './api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { lightbox } from './lightbox';
import { onBackOnTopButton } from './backOnTopButton';
import { formRef, galleryRef, loadMoreBtnRef, backOnTopButton } from './refs';
import { hiddenBtn } from './utils';
import { onShowNotificationForHitsValue } from './notification';
import {
  onCreateMarkupForCardImage,
  onAddMarkupOnDOM,
  onAddCardsForPressLoadMoreBtn,
  onDeleteMarkup,
} from './markup';

formRef.addEventListener(`submit`, onDeleteMarkup);
formRef.addEventListener(`submit`, onSearch);
loadMoreBtnRef.addEventListener(`click`, onLoadMore);
backOnTopButton.addEventListener(`click`, onBackOnTopButton);

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
