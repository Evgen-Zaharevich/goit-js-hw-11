export { hiddenBtn, showBtn };
import { loadMoreBtnRef, backOnTopButton } from './refs';

function hiddenBtn() {
  loadMoreBtnRef.classList.add('visually-hidden');
  loadMoreBtnRef.setAttribute('disabled', '');
  backOnTopButton.classList.add('visually-hidden');
  backOnTopButton.setAttribute('disabled', '');
}

function showBtn() {
  loadMoreBtnRef.removeAttribute('disabled');
  loadMoreBtnRef.classList.remove('visually-hidden');
  backOnTopButton.removeAttribute('disabled');
  backOnTopButton.classList.remove('visually-hidden');
}
