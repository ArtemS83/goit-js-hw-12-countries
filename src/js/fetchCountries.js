import articlesTemplate from '../templates/articles.hbs';
import articleTemplate from '../templates/article.hbs';

// import menuItems from '../menu.json';
// const markup = menuTemplate(menuItems);
// const container = document.querySelector('.js-menu');

console.log('Hello fetch');
const refs = {
  input: document.querySelector('#js-input'),
  container: document.querySelector('.js-article-container'),
};
// const fetchDivRef = document.querySelector('.js-fetch');
// const btn1Ref = document.querySelector('#js-btn1');
// const btnRef = document.querySelector('#js-btn');

refs.input.addEventListener('change', fetchCountries);
// btnRef.addEventListener('click', onClickArticles);

// let page = 1;
let name = 'ukrai';
export default function fetchCountries(searchQuery) {
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;
  // const apiKey = 'e68dce1f1c6e4e2da21f057bdb3efccb';

  // const options = {
  //   headers: {
  //     Authorization: apiKey,
  //   },
  // };
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('data', data);
      if (data.length === 1) {
        console.log('data.lenght', data.length);
        const markup = articleTemplate(data);
        // console.log(markup);
        // console.log(refs.container);
        refs.container.innerHTML = markup;
      } else if (data.length <= 10) {
        console.log('data.lenght<= 10', data.length);
        const markup = articlesTemplate(data);
        // console.log(markup);
        // console.log(refs.container);
        refs.container.innerHTML = markup;
      }
    })
    .then(name => {
      // console.log('data', data);
      // console.log('{name}:', name);
      // fetchDivRef.insertAdjacentHTML('beforeend', markUp);
      // btnRef.classList.add('hidden');
      // btnRef.classList.remove('nohidden');
      // page += 1;
      // console.log(page);
      // window.scrollTo({
      //   top: document.documentElement.offsetHeight, //прокрутка на всю длину документа
      //   behavior: 'smooth',
      // });
    })
    .catch(console.log);
}
