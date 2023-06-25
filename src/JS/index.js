const API_KEY = '37656081-35581442b65f56178bca80058'; 

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  currentPage = 1;
  currentQuery = e.target.elements.searchQuery.value.trim();
  clearGallery();
  searchImages(currentQuery, currentPage);
});

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  searchImages(currentQuery, currentPage);
});

function searchImages(query, page) {
  const url = `https://pixabay.com/api/?key=${'37656081-35581442b65f56178bca80058'}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  axios.get(url)
    .then(response => {
      const { data } = response;
      const { hits, totalHits } = data;

      if (hits.length > 0) {
        displayImages(hits);
        if (hits.length + (page - 1) * 40 < totalHits) {
          showLoadMoreButton();
        } else {
          hideLoadMoreButton();
        }
      } else {
        showNoImagesMessage();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showErrorMessage();
    });
}

function displayImages(images) {
  const imageCards = images.map(image => createImageCard(image));
  gallery.innerHTML += imageCards.join('');
}

function createImageCard(image) {
  return `
    <div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `;
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}

function showNoImagesMessage() {
  Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
}

function showErrorMessage() {
  Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
}


