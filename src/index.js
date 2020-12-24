import './styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import getRefs from './js/refs';

const refs = getRefs();
let valueSearch;

refs.input.addEventListener('input', onValueSearch);
refs.input.addEventListener(
  'input',
  debounce(() => {
    fetchCountries(valueSearch);
  }, 500),
);

function onValueSearch(event) {
  valueSearch = event.currentTarget.value;
  if (valueSearch === '') {
    return refs.spinner.classList.add('is-hidden');
  }
  refs.spinner.classList.remove('is-hidden');
}
