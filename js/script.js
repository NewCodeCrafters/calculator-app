const formEl = document.querySelector("form");
const dayInputEl = formEl.querySelector("#day");
const monthInputEl = formEl.querySelector("#month");
const yearInputEl = formEl.querySelector("#year");
const yearOutputEl = document.getElementById("year-output");
const dayOutputEl = document.getElementById("day-output");
const monthOutputEl = document.getElementById("month-output");
let dayValue = 0;
let monthValue = 0;
let yearValue = 0;

const validateDayValue = (dayValue) => {
  // If it is in the write format
  const dayErrorEl = dayInputEl.nextElementSibling;
  const trimedVal = dayValue.trim();

  if (trimedVal.length === 0) {
    dayErrorEl.textContent = "This field is required";
    return;
  }
  if (isNaN(dayValue)) {
    dayErrorEl.textContent = "Must be a number";
    return;
  }
  if (dayValue > 31 || dayValue < 1) {
    dayErrorEl.textContent = "Must be a valid date";
    return;
  }

  dayErrorEl.textContent = "";
  return true;
};
const validateMonth = (monthValue) => {
  const monthErroEl = monthInputEl.nextElementSibling;
  const trimedVal = monthValue.trim();

  if (trimedVal.length === 0) {
    monthErroEl.textContent = "This field is required";
    return;
  }
  if (isNaN(monthValue)) {
    monthErroEl.textContent = "Must be a number";
    return;
  }
  if (monthValue < 1 || monthValue > 12) {
    monthErroEl.textContent = "Must be a valid month";
    return;
  }

  monthErroEl.textContent = "";
  return true;
};

const validateYear = (yearValue) => {
  const yearErrorEl = yearInputEl.nextElementSibling;
  const trimedVal = yearValue.trim();
  const currentYear = new Date().getFullYear();
  if (trimedVal.length === 0) {
    yearErrorEl.textContent = "This field is required";
    return;
  }
  if (isNaN(yearValue)) {
    yearErrorEl.textContent = "Must be a number";
    return;
  }
  if (yearValue < 1970 || yearValue > currentYear) {
    yearErrorEl.textContent = "Must be a valid year";
    return;
  }

  yearErrorEl.textContent = "";
  return true;
};
dayInputEl.addEventListener("blur", (e) => {
  validateDayValue(e.target.value);
});
monthInputEl.addEventListener("blur", (e) => {
  validateMonth(e.target.value);
});
yearInputEl.addEventListener("blur", (e) => {
  validateYear(e.target.value);
});
dayInputEl.addEventListener("change", (e) => {
  dayValue = parseInt(e.target.value);
});
monthInputEl.addEventListener("change", (e) => {
  monthValue = parseInt(e.target.value);
});
yearInputEl.addEventListener("change", (e) => {
  yearValue = parseInt(e.target.value);
});
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    !validateDayValue(dayValue.toString()) ||
    !validateMonth(monthValue.toString()) ||
    !validateYear(yearValue.toString())
  )
    return;
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const birthDate = new Date(yearValue, monthValue - 1, dayValue);
  let years = currentYear - birthDate.getFullYear();
  let months = birthDate.getMonth() - currentMonth - 11 + 12;
  let days = birthDate.getDate() - currentDay;
  if (months > 0) {
    years = years - 1;
    months = 12 - months;
  }
  yearOutputEl.textContent = years;
  monthOutputEl.textContent = Math.abs(months);
  dayOutputEl.textContent = Math.abs(days);
});
