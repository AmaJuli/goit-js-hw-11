import axios from 'axios';
import { getImages } from '.images.js';

const API_KEY = '37656081-35581442b65f56178bca80058';
const URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;

export async function getImages(searchQuery, pageCount) {
  const params = {
    params: {
      timeout: 1000,
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'false',
      page: pageCount,
      per_page: PER_PAGE,
    },
  };

  const response = await axios.get(URL, params);
  return response.data;
}