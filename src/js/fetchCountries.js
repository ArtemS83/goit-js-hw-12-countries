import articlesTemplate from '../templates/articles.hbs';
import articleTemplate from '../templates/article.hbs';

import getRefs from './refs';

import toastr from 'toastr';
import options from './toastr.options';
import 'toastr/build/toastr.min.css';

toastr.options = options;

const refs = getRefs();

export default function fetchCountries(searchQuery) {
  searchQuery = searchQuery.trim();
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;
  return fetch(url)
    .then(res => {
      if (res.status === 404) {
        refs.container.innerHTML = '';
        toastr.warning('Please enter a more specific querry!', 'Warning!');
        refs.spinner.classList.remove('is-hidden');
      } else {
        return res.json();
      }
    })
    .then(data => {
      if (data.length === 1) {
        refs.spinner.classList.add('is-hidden');
        const markup = articleTemplate(data);
        refs.container.innerHTML = markup;
        return;
      }
      if (data.length <= 10 && data.length >= 2) {
        refs.spinner.classList.add('is-hidden');
        const markup = articlesTemplate(data);
        refs.container.innerHTML = markup;
        return;
      }

      toastr.warning('Please enter a more specific querry!', 'Warning!');
      refs.container.innerHTML = '';
      refs.spinner.classList.add('is-hidden');
    })
    .catch(error => {
      refs.spinner.classList.add('is-hidden');
      console.log('ERROR!: ', error.message);
    });
}
