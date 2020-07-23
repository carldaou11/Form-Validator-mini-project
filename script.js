const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// Show Input Error
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

// Show Input Succes
const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

// Validate Email
const validateEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else if (input.value === '') {
    showError(input, 'Required Field');
  } else {
    showError(input, 'Invalid Email Address');
  }
};

// Check Passwords Match
const checkPasswordsMatch = (input1, input2) => {
  if (input1.value.trim() !== input2.value.trim()) {
    showError(input2, 'Passwords must match');
  } else {
    showSuccess(input);
  }
};

// Check Input Length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `Must be at least ${min} letters`);
  } else if (input.value.length > max) {
    showError(input, `Must be less than ${max} letters`);
  } else {
    showSuccess(input);
  }
};

// Check Required Inputs
const checkRequiredInputs = arr => {
  arr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, 'Required Field');
    } else showSuccess(input);
  });
};

// Event Listener
form.addEventListener('submit', function validate(e) {
  e.preventDefault();
  checkRequiredInputs([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  validateEmail(email);
  checkPasswordsMatch(password, confirmPassword);
});