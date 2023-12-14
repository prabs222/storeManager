document.addEventListener("DOMContentLoaded", function () {
    const categoryBoxes = document.querySelectorAll('.category-box');
  
    categoryBoxes.forEach(box => {
      box.addEventListener('click', function () {
        this.classList.toggle('active');
        displayAlert(); 
      });
    });
  
  
    function getProducts() {
      return JSON.parse(localStorage.getItem('products')) || [];
    }
  
    function displayAlert() {
      var products = getProducts();
      products.forEach(function(product, index) {
        if (product.quantity < product.minLimit) {
          alert(`Low stock alert for ${product.name}! ${product.minLimit} or fewer items remaining for restocking.`);
        }
      });
    }
  });
  