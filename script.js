const birthForm = document.getElementById("birth-form");
const birthDateInput = document.getElementById("birth-date");
const birthTimeInput = document.getElementById("birth-time");
const formError = document.getElementById("form-error");
const resetBtn = document.getElementById("reset-btn");
 
const emptyState = document.getElementById("empty-state");
const resultSection = document.getElementById("results");

const secondDisplay = document.getElementById("seconds-display");
const statYearsEl = document.getElementById("stat-years");
const statDaysEl = document.getElementById("stat-days");
const statHoursEl = document.getElementById("stat-hours");
const statMinutesEl = document.getElementById("stat-minutes");
 
let tickIntervalid = null;


let birthDateTime = null;
function validBirthInput(dateValue, timeValue) {
  if (!dateValue) {
    return "Please enter a date of birth.";
  }
  const timePart = timeValue || "00:00";
  const candidate = new Date(`${dateValue}T${timePart}:00`);
 
  if (isNaN(candidate.getTime())) {
    return "That date does not look valid. Please check it and try again.";
  }
if (candidate.getTime() > Date.now()) { 
    return "Date of birth cannot be in the future.";
  }
return null;
}

function showError(message) {
formError.textContent = message;
formError.hidden = false;
}
function clearError() {
  formError.textContent = "";
  formError.hidden = true;
}
