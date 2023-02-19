import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

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
}

function savedData(evt) {
  const inputValue = localStorage.getItem(STORAGE_KEY);

  if (inputValue) {
    const data = JSON.parse(inputValue);
    input.value = data.email;
    textarea.value = data.message;
  }
}
