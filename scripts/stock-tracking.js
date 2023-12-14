// Function to get products from local storage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Function to display the list of products with stock levels and notifications
function displayStock() {
    var stockListDiv = document.getElementById('stock-list');
    var products = getProducts();

    // Clear previous content
    stockListDiv.innerHTML = '';

    // Display each product with stock levels and notifications
    products.forEach(function(product) {
        var stockDiv = document.createElement('div');
        var stockStatus = product.quantity > 0 ? "In Stock" : "Out of Stock";
        var stockClass = product.quantity > 0 ? "in-stock" : "out-of-stock";

        stockDiv.innerHTML = `<strong>${product.name}</strong> - Quantity: ${product.quantity} 
                                <span class="${stockClass}">${stockStatus}</span>
                                <button onclick="restockAlert(${product.quantity}, ${product.minLimit}, '${product.name}')">Restock Alert</button>`;
        stockListDiv.appendChild(stockDiv);
    });
}

// Function to trigger restock alert based on minimum limit
function restockAlert(currentQuantity, minLimit, productName) {
    if (currentQuantity <= minLimit) {
        alert(`Low stock alert for ${productName}! ${minLimit} or fewer items remaining for restocking.`);
    } else {
        alert(`${productName} stock level is sufficient.`);
    }
}
// Display stock levels on page load
displayStock();
