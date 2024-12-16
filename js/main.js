$(document).ready(function () {

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Display it in the span with id="currentYear"
  document.getElementById('currentYear').textContent = currentYear;

});