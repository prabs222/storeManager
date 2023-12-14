// Function to get products from local storage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Function to update products in local storage
function updateProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Function to open the modal for updating a product
function openUpdateModal(productIndex) {
    var products = getProducts();

    // Set the values in the modal form
    document.getElementById('updateProductName').value = products[productIndex].name;
    document.getElementById('updateQuantity').value = products[productIndex].quantity;

    // Set the updateProductIndex variable to keep track of the product being updated
    updateProductIndex = productIndex;

    // Display the modal
    document.getElementById('update-modal').style.display = 'block';
}

// Function to close the update modal
function closeUpdateModal() {
    document.getElementById('update-modal').style.display = 'none';
}

// Function to add a new product
function addProduct() {
    var productName = document.getElementById('productName').value;
    var quantity = document.getElementById('quantity').value;
    var minStock = document.getElementById('minStock').value;

    if (productName && quantity && minStock) {
        var product = {
            name: productName,
            quantity: parseInt(quantity),
            minLimit: parseInt(minStock) // New attribute for minimum stock level
        };

        // Get existing products from local storage
        var products = getProducts();

        // Add the new product
        products.push(product);

        // Save the updated products back to local storage
        updateProducts(products);

        // Display the updated product list
        displayProducts();
    }
}
// Function to update a product
function updateProduct() {
    var products = getProducts();
    var updatedProductName = document.getElementById('updateProductName').value;
    var updatedQuantity = document.getElementById('updateQuantity').value;

    if (updatedProductName && updatedQuantity) {
        // Update the product details
        products[updateProductIndex].name = updatedProductName;
        products[updateProductIndex].quantity = parseInt(updatedQuantity);

        // Save the updated products back to local storage
        updateProducts(products);

        // Close the update modal
        closeUpdateModal();

        // Display the updated product list
        displayProducts();
    }
}

// Function to display the list of products with update and delete options
// function displayProducts() {
//     var productListDiv = document.getElementById('product-list');
//     var products = getProducts();

//     // Clear previous content
//     productListDiv.innerHTML = '';

//     // Display each product with update and delete options
//     products.forEach(function(product, index) {
//         var productDiv = document.createElement('div');
//         productDiv.innerHTML = `<strong>${product.name}</strong> - Quantity: ${product.quantity} 
//                                 <button onclick="openUpdateModal(${index})">Update</button>
//                                 <button onclick="removeProduct(${index})">Delete</button>`;
//         productListDiv.appendChild(productDiv);
//     });
// }

// Function to display the list of products with update and delete options
function displayProducts() {
    var productListDiv = document.getElementById('product-list');

    // Check if productListDiv is not null before proceeding
    if (productListDiv) {
        var products = getProducts();

        // Clear previous content
        productListDiv.innerHTML = '';

        // Display each product with update and delete options
        products.forEach(function(product, index) {
            var productDiv = document.createElement('div');
            productDiv.innerHTML = `<strong>${product.name}</strong> - Quantity: ${product.quantity} 
                                    <button onclick="openUpdateModal(${index})">Update</button>
                                    <button onclick="removeProduct(${index})">Delete</button>`;
            productListDiv.appendChild(productDiv);
    
            // Check if the product is below its minimum limit
            if (product.quantity < product.minLimit) {
                alert(`Low stock alert for ${product.name}! ${product.minLimit} or fewer items remaining for restocking.`);
            }
        });
        }
}
// Function to remove a product
function removeProduct(productIndex) {
    var products = getProducts();

    // Remove the product at the specified index
    products.splice(productIndex, 1);

    // Save the updated products back to local storage
    updateProducts(products);

    // Display the updated product list
    displayProducts();
}

// Variable to keep track of the product being updated
var updateProductIndex = -1;

// Display existing products on page load
displayProducts();
