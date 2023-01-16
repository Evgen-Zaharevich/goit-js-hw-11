export { fetchImages, PER_PAGE };

const axios = require('axios').default;

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `32894717-70ae3102168a4614f7afe67ac`;
const PER_PAGE = 40;

async function fetchImages(searchQuery, currentPage) {
  try {
    const promise = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: `photo`,
        orientation: `horizontal`,
        safesearch: `true`,
        page: currentPage,
        per_page: PER_PAGE,
      },
    });
    return promise;
  } catch (error) {
    console.error(error);
  }
}
