import './styles/styles.scss';
import './styles/media.scss';


window.addEventListener('load', () => {
    document.querySelector('.preloader').style.display = 'none';
    document.querySelector('.page').style.display = 'flex';
  });
  

const tabButtons = document.querySelectorAll('.tabs__btn');
const phoneTab = document.querySelector('.registration-form__field--phone');
const emailTab = document.querySelector('.registration-form__field-group--email');
const form = document.getElementById('regForm');
const submitButton = document.querySelector('.registration-form__submit');

const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const inputs = { phone: phoneInput, email: emailInput, password: passwordInput };

const validate = {
  phone: val => val.replace(/\D/g, '').length >= 5,
  email: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
  password: val => val.trim().length >= 6,
};

function switchTab(tabName) {
  tabButtons.forEach(btn => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle('tabs__btn--active', isActive);
    btn.setAttribute('aria-selected', isActive);
  });

  phoneTab.classList.toggle('visible', tabName === 'phone');
  phoneTab.classList.toggle('hidden', tabName !== 'phone');
  emailTab.classList.toggle('visible', tabName !== 'phone');
  emailTab.classList.toggle('hidden', tabName === 'phone');
  emailTab.setAttribute('aria-hidden', tabName === 'phone');

  updateSubmitButton();
}

function getActiveTab() {
  return document.querySelector('.tabs__btn--active').dataset.tab;
}

function updateSubmitButton() {
  const tab = getActiveTab();
  const isValid =
    tab === 'phone'
      ? validate.phone(phoneInput.value)
      : validate.email(emailInput.value) && validate.password(passwordInput.value);

  submitButton.classList.toggle('registration-form__submit--active', isValid);
  submitButton.disabled = !isValid;
}

Object.values(inputs).forEach(input => {
  input.addEventListener('input', updateSubmitButton);
  input.addEventListener('focus', () => input.classList.add('focused'));
  input.addEventListener('blur', () => input.classList.remove('focused'));
});

tabButtons.forEach(btn =>
  btn.addEventListener('click', () => switchTab(btn.dataset.tab))
);

form.addEventListener('submit', e => {
  e.preventDefault();

  const tab = getActiveTab();
  let isValid = false;
  let message = '';

  if (tab === 'phone') {
    isValid = validate.phone(phoneInput.value);
    if (isValid) {
      phoneInput.value = '';
      message = 'Регистрация по телефону успешна!';
    } else {
      message = 'Пожалуйста, введите корректный номер телефона';
    }
  } else {
    isValid =
      validate.email(emailInput.value) && validate.password(passwordInput.value);
    if (isValid) {
      emailInput.value = '';
      passwordInput.value = '';
      message = 'Регистрация по email успешна!';
    } else {
      message = 'Пожалуйста, заполните все поля корректно';
    }
  }

  updateSubmitButton();
  showMessage(message, isValid ? 'success' : 'error');
});

function showMessage(text, type = 'success') {
  const div = document.createElement('div');
  div.className = `registration-message ${type}`;
  div.textContent = text;
  document.body.appendChild(div);

  setTimeout(() => (div.style.opacity = '0'), 4500);
  setTimeout(() => div.remove(), 5000);
}

switchTab('phone');
