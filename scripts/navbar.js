// navbar.js
document.addEventListener("DOMContentLoaded", function() {
    // Fetch and include navbar.html
    fetch('navbar.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
      });
  });
  