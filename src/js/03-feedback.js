import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

form.addEventListener('input', throttle(onTextInput, 500));
form.addEventListener('submit', onFormSubmit);

savedData();

function onTextInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  console.log(formData);
}

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log('Форму надіслано');

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}

function savedData() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    const formKeys = Object.keys(savedData);
    formKeys.map(element => {
      document.querySelector(`[name='${element}']`).value = savedData[element];
      formData[element] = savedData[element];
    });
  }
}

// -----------------------------------------------------------

// function savedData() {
//   if (load(STORAGE_KEY)) {
//     const outputForm = load(STORAGE_KEY);
//     const formKeys = Object.keys(outputForm);
//     formKeys.map(element => {
//       document.querySelector(`[name='${element}']`).value = outputForm[element];
//     });
//   }
// }

// ----------------------------------------------------------
