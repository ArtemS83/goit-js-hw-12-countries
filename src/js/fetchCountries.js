import articlesTemplate from '../templates/articles.hbs';
import articleTemplate from '../templates/article.hbs';

import toastr from 'toastr';
import options from './toastr.options';
import 'toastr/build/toastr.min.css';
toastr.options = options;

const refs = {
  input: document.querySelector('#js-input'),
  container: document.querySelector('.js-article-container'),
};

refs.input.addEventListener('change', onSearch);

function onSearch(e) {
  // e.preventDefault();

  console.log(e.currentTarget.value);

  fetchCountries(e.currentTarget.value);
}
// let name = 'ukrai';
export default function fetchCountries(searchQuery) {
  console.log();
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('data', data);
      if (data.length === 1) {
        const markup = articleTemplate(data);
        refs.container.innerHTML = markup;
      } else if (data.length <= 10) {
        const markup = articlesTemplate(data);
        refs.container.innerHTML = markup;
      } else {
        toastr.error('Please enter a more specific querry!', 'Warning!');
      }
    })
    .catch(error => toastr.error(error.message, 'ERROR!'));
}
