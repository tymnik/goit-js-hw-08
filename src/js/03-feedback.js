import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const storedFormState =
  JSON.parse(localStorage.getItem('feedback-form-state')) || {};
emailInput.value = storedFormState.email || '';
messageTextarea.value = storedFormState.message || '';

let formState = {
  email: emailInput.value || '',
  message: messageTextarea.value || '',
};

const saveFormStateThrottled = throttle(() => {
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500);

form.addEventListener('input', event => {
  const { name, value } = event.target;
  formState[name] = value;
  saveFormStateThrottled();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageTextarea.value = '';

  console.log(formState);
});
