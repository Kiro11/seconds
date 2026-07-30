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
 
let tickIntervalId = null;


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
function calculateElapsedStats(fromDate, toDate) {
  const totalSeconds = Math.floor((toDate - fromDate) / 1000);
 
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalSeconds / 3600);
  const totalDays = Math.floor(totalSeconds / 86400);

  let years = toDate.getFullYear() -  fromDate.getFullYear();
  const hasHadBirthdayThisYear =
   toDate.getMonth() > fromDate.getMonth() ||
   (toDate.getMonth() === fromDate.getMonth() && toDate.getDate() >= fromDate.getDate());
  if (!hasHadBirthdayThisYear) {
    years -= 1;
  }
  return { totalSeconds, totalMinutes, totalHours, totalDays, years };
}
function formatWithCommas(number) {
   return number.toLocaleString("en-US");  
}

function renderOdometer(totalSeconds) {
const formatted = formatWithCommas(totalSeconds);
secondDisplay.innerHTML = "";
for (const character of formatted) {
const cell = document.createElement("span");
if (character === ",") {
      cell.className = "odometer-sep";
    } else {
      cell.className = "odometer-digit";
      cell.textContent = character;
    }
secondDisplay.appendChild(cell);
  }
}
function renderStats() {
const stats = calculateElapsedStats(birthDateTime, new Date());

renderOdometer(stats.totalSeconds);
statYearsEl.textContent = formatWithCommas(stats.years);
statDaysEl.textContent = formatWithCommas(stats.totalDays);
  statHoursEl.textContent = formatWithCommas(stats.totalHours);
  statMinutesEl.textContent = formatWithCommas(stats.totalMinutes);
}
function handleCalculate(event) {
    event.preventDefault();
const dateValue = birthDateInput.value;
const timeValue = birthTimeInput.value;

const errorMessage = validBirthInput(dateValue, timeValue);
  if (errorMessage) {
    showError(errorMessage);
    return;
  }

  clearError();

  const timePart = timeValue || "00:00";
birthDateTime = new Date(`${dateValue}T${timePart}:00`);

  emptyState.hidden = true;
  resultSection.hidden = false;

  if (tickIntervalId !== null) {
    clearInterval(tickIntervalId);
  }
  renderStats();
tickIntervalId = setInterval(renderStats, 1000);
}
function handReset() {
 birthForm.reset();
  clearError();
 
  if (tickIntervalId !== null) {
    clearInterval(tickIntervalId);
    tickIntervalId = null;
}

birthDateTime = null;
resultSection.hidden = true;
emptyState.hidden = false;
}

birthForm.addEventListener("submit", handleCalculate);
resetBtn.addEventListener("click", handReset);