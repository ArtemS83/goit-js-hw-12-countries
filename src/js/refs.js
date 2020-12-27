export default function getRefs() {
  return {
    input: document.querySelector('#js-input'),
    container: document.querySelector('.js-article-container'),
    spinner: document.querySelector('.spinner-border'),
    itemCountry: document.querySelector('.article-item'),
  };
}
