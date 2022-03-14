"use strict";

const form = document.getElementById("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

function showError(input, message, textPlaceHolder) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const errorMessage = input.nextElementSibling;
  errorMessage.className = "message";
  const getMessage = formControl.querySelector(".message");
  getMessage.innerText = message;
  input.placeholder = textPlaceHolder;
}

function showSucess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control sucess";
  const errorMessage = input.nextElementSibling;
  errorMessage.className = "message hidden";
}

function getNameById(input) {
  const name = input.id;
  const firstLetter = name.charAt(0);
  return `${firstLetter.toUpperCase()}${name.slice(1)}`;
}

function checkEmptySpaces(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].value);
    if (arr[i].value === "") {
      showError(arr[i], `${getNameById(arr[i])} cannot be empty`, "");
    } else {
      showSucess(arr[i]);
    }
  }
}

function checkLengthOfInput(input, min, max) {
  if (input.value.length < min && input.value !== "") {
    showError(input, `${getNameById(input)} must have at least ${min} letters`);
  } else if (input.value.length > max) {
    showError(
      input,
      `${getNameById(input)} must have a maximum of ${max} letters`,
      ""
    );
  } else if (input.value !== "") {
    showSucess(input);
  }
}

const emailIsValid = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const passwordIsValid = (password) => {
  return password.search(/[a-z]/) >= 0 && password.search(/[A-Z]/) >= 0;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const arr = [firstName, lastName, password];
  checkEmptySpaces(arr);
  checkLengthOfInput(firstName, 3, 20);
  checkLengthOfInput(lastName, 3, 20);
  checkLengthOfInput(password, 6, 15);
  if (!emailIsValid(email.value)) {
    showError(email, `Looks like this is not an email`, "email@example.com");
  } else showSucess(email);
  if (!passwordIsValid(password.value) && password.value !== "") {
    showError(
      password,
      "Password must have a uppercase and lowcase letter",
      ""
    );
  } else if (password.value !== "" && password.value >= 6 && password.value < 15) showSucess(password);
});
