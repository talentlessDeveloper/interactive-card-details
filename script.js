const nameEl = document.querySelector(".input-name");
const inputNumberEl = document.querySelector(".input-number");
const inputMonthEl = document.querySelector(".input-month");
const inputYearEl = document.querySelector(".input-year");
const inputCvcEl = document.querySelector(".input-cvc");
const cardNumberEl = document.querySelector(".card-number");
const cardNameEl = document.querySelector(".card-name");
const cardMonthEl = document.querySelector(".card-month");
const cardYearEl = document.querySelector(".card-year");
const cardCvcEl = document.querySelector(".cvc");
const form = document.querySelector("form");
const formContainer = document.querySelector(".formSection__container");
const continueBtn = document.querySelector(".btn-continue");
const animateDiv = document.querySelectorAll(".animate-div");
const cardInfo = document.querySelectorAll(".info");

const nameRegex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/g;

const red = getComputedStyle(document.documentElement).getPropertyValue(
  "--red"
);
const grey = getComputedStyle(document.documentElement).getPropertyValue(
  "--lightGrayishViolet"
);

const inputNumOnly = (e) => {
  e = e || window.event;
  let charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
  let charStr = String.fromCharCode(charCode);
  if (!charStr.match(/^[0-9]+$/)) e.preventDefault();
};

const setError = (input, message) => {
  const formGroup = input.parentElement;

  //   formGroup.classList.remove("success");
  formGroup.classList.add("error");
  input.style.border = `2px solid ${red}`;

  const error = formGroup.querySelector("small");
  error.textContent = message;
};
const setSuccess = (input) => {
  const formGroup = input.parentElement;
  input.style.border = `2px solid ${grey}`;
  formGroup.classList.remove("error");
  //   formGroup.classList.add("error");

  const error = formGroup.querySelector("small");
  error.textContent = "";
};

const validateNumbers = () => {
  let valid = false;

  if (inputNumberEl.value !== "") {
    inputNumberEl.value = inputNumberEl.value
      .split(" ")
      .join("")
      .match(/.{1,4}/g)
      .join(" ");
  }

  if (inputNumberEl.value === "") {
    setError(inputNumberEl, "Cannot Be blank");
    valid = false;
  } else if (inputNumberEl.value.length >= 19) {
    inputNumberEl.maxLength = 19;
    setSuccess(inputNumberEl);
    valid = true;
  } else if (inputNumberEl.value.length < 19) {
    setError(inputNumberEl, "minimum of sixteen characters");
    valid = false;
  } else {
    setSuccess(inputNumberEl);
    valid = true;
  }

  return valid;
};

const validateName = () => {
  const name = nameEl.value.trim();
  let valid = true;
  if (name === "") {
    setError(nameEl, "name is required");
    valid = false;
  } else if (!name.match(nameRegex)) {
    setError(nameEl, "enter valid name");
    valid = false;
  } else {
    setSuccess(nameEl);
    valid = true;
  }
  return valid;
};

const validateMonth = () => {
  const month = inputMonthEl.value;
  let num = Number(month);

  let valid = true;

  if (!num) {
    setError(inputMonthEl, "Cannot be Blank");
    valid = false;
  } else if (num < 1 || num > 12) {
    setError(inputMonthEl, "Invalid number");
    valid = false;
  } else {
    setSuccess(inputMonthEl);
    valid = true;
  }

  if (month.length !== 2) {
    setError(inputMonthEl, "Invalid length");
    valid = false;
  } else if (month.length >= 2) {
    inputMonthEl.maxLength = 2;
  } else {
    setSuccess(inputMonthEl);
    valid = true;
  }

  return valid;
};

const validateYear = () => {
  const year = inputYearEl.value;
  let valid = false;
  if (year.length < 2) {
    setError(inputYearEl, "Invalid length");
    valid = false;
  } else {
    setSuccess(inputYearEl);
    valid = true;
  }

  return valid;
};

const validateCvc = () => {
  const cvc = inputCvcEl.value;
  let valid = false;

  if (cvc === "") {
    setError(inputCvcEl, "Cannot be blank");
    valid = false;
  }
  if (cvc.length < 3) {
    setError(inputCvcEl, "Invalid length");
    valid = false;
  } else {
    setSuccess(inputCvcEl);
    valid = true;
  }

  return valid;
};

const reset = () => {
  nameEl.value = "";
  inputMonthEl.value = "";
  inputNumberEl.value = "";
  inputYearEl.value = "";
  inputCvcEl.value = "";
  cardInfo.forEach((info) => (info.textContent = info.dataset.base));
};

nameEl.addEventListener("input", () => {
  validateName();
  cardNameEl.textContent = nameEl.value;
});

inputMonthEl.addEventListener("input", () => {
  validateMonth();
  cardMonthEl.textContent = inputMonthEl.value;
});

inputYearEl.addEventListener("input", () => {
  validateYear();
  cardYearEl.textContent = inputYearEl.value;
  if (inputYearEl.value.length >= 2) {
    inputYearEl.maxLength = 2;
  }
});

inputCvcEl.addEventListener("input", () => {
  validateCvc();
  if (inputCvcEl.value.length >= 3) {
    inputCvcEl.maxLength = 3;
  }

  cardCvcEl.textContent = inputCvcEl.value;
});

inputNumberEl.addEventListener("input", (e) => {
  validateNumbers();
  cardNumberEl.textContent = inputNumberEl.value;
});

inputNumberEl.addEventListener("keypress", inputNumOnly);
inputMonthEl.addEventListener("keypress", inputNumOnly);
inputYearEl.addEventListener("keypress", inputNumOnly);
inputCvcEl.addEventListener("keypress", inputNumOnly);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    validateName() &&
    validateMonth() &&
    validateYear() &&
    validateCvc() &&
    validateNumbers()
  ) {
    console.log("yes!!!");
    reset();
    formContainer.classList.add("active");
    animateDiv.forEach((div) => {
      div.classList.add("animated-bg");
    });
  }
});

continueBtn.addEventListener("click", (e) => {
  formContainer.classList.remove("active");
  animateDiv.forEach((div) => {
    div.classList.remove("animated-bg");
  });
});

// // function format(s) {
// //   return s.toString().replace(/\d{4}(?=.)/g, "$& ");
// // }
