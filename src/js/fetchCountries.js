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
  console.log(searchQuery);
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;
  return fetch(url)
    .then(res => {
      if (res.status === 404) {
        console.log('404', searchQuery);
        refs.container.innerHTML = '';
        toastr.warning('Please enter a more specific querry!', 'Warning!');
      } else {
        return res.json();
      }
    })
    .then(data => {
      if (data.length === 1) {
        const markup = articleTemplate(data);
        refs.container.innerHTML = markup;
      } else if (data.length <= 10) {
        const markup = articlesTemplate(data);
        refs.container.innerHTML = markup;
      } else {
        toastr.warning('Please enter a more specific querry!', 'Warning!');
        refs.container.innerHTML = '';
      }
    })
    .catch(error => {
      // toastr.error(error.message, 'ERROR!');
      console.log('ERROR!: ', error.message);
    });
}
