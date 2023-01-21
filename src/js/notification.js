import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { showBtn } from './utils';

export function onShowNotificationForHitsValue(response) {
  const { hits, totalHits } = response.data;

  if (hits.length === 0) {
    Notify.info(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    return;
  } else {
    Notify.success(`Hooray! We found ${totalHits} images.`);

    showBtn();
  }
}
