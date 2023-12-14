// Function to populate product dropdown options
function populateProductDropdown() {
    var products = getProducts();
    var productSelect = document.getElementById('productSelect');

    // Clear previous options
    productSelect.innerHTML = '';

    // Add new options based on available products
    products.forEach(function(product) {
        var option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// Function to record a sale
// Function to record a sale
function recordSale() {
    var selectedProduct = document.getElementById('productSelect').value;
    var quantitySold = parseInt(document.getElementById('quantity').value);

    if (selectedProduct && !isNaN(quantitySold) && quantitySold > 0) {
        var products = getProducts();

        // Find the selected product
        var selectedProductIndex = products.findIndex(function(product) {
            return product.name === selectedProduct;
        });

        if (selectedProductIndex !== -1 && products[selectedProductIndex].quantity >= quantitySold) {
            // Update the product quantity based on the sale
            products[selectedProductIndex].quantity -= quantitySold;

            // Save the updated products back to local storage
            updateProducts(products);

            // Display the updated product list
            displayProducts();

            // Record the sale in the sales history (you may want to customize this based on your needs)
            var saleRecord = {
                product: selectedProduct,
                quantity: quantitySold,
                date: new Date().toLocaleString() // You can customize the date format
            };

            // Get existing sales history from local storage
            var salesHistory = JSON.parse(localStorage.getItem('salesHistory')) || [];

            // Add the new sale record
            salesHistory.push(saleRecord);

            // Save the updated sales history back to local storage
            localStorage.setItem('salesHistory', JSON.stringify(salesHistory));

            // Display the updated sales history
            displaySalesHistory();

            // Alert indicating a successful sale recording
            alert('Sale recorded successfully!');
        } else {
            alert('Invalid quantity or product not available in sufficient quantity.');
        }
    } else {
        alert('Please select a valid product and enter a valid quantity.');
    }
}


// Function to display sales history
function displaySalesHistory() {
    var salesHistoryDiv = document.getElementById('sales-history');
    var salesHistory = JSON.parse(localStorage.getItem('salesHistory')) || [];

    // Clear previous content
    salesHistoryDiv.innerHTML = '';

    // Display each sale record
    salesHistory.forEach(function(sale) {
        var saleDiv = document.createElement('div');
        saleDiv.innerHTML = `<strong>${sale.product}</strong> - Quantity: ${sale.quantity} - Date: ${sale.date}`;
        salesHistoryDiv.appendChild(saleDiv);
    });
}

// Display available products in the dropdown on page load
populateProductDropdown();

// Display existing sales history on page load
displaySalesHistory();
