import { fetchImages, PER_PAGE } from './API';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector(`.search-form`);

let currentPage = 1;

formRef.addEventListener(`submit`, onSearch);

async function onSearch(e) {
  e.preventDefault();

  const { searchQuery } = e.target;

  const response = await fetchImages(searchQuery.value, currentPage);
  const { hits, totalHits } = response.data;

  if (hits.length === 0) {
    Notify.info(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  } else {
    Notify.success(`Hooray! We found ${totalHits} images.`);
  }
}
