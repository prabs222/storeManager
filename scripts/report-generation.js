// Function to get sales history from local storage
function getSalesHistory() {
    return JSON.parse(localStorage.getItem('salesHistory')) || [];
}

// Function to display sales report using a bar chart
function displaySalesReport() {
    var salesReportDiv = document.getElementById('sales-report');
    var salesHistory = getSalesHistory();

    // Clear previous content
    salesReportDiv.innerHTML = '';

    // Create a canvas element for the bar chart
    var salesChartCanvas = document.createElement('canvas');
    salesChartCanvas.id = 'sales-chart';
    salesReportDiv.appendChild(salesChartCanvas);

    // Create a button for detailed sales report
    var salesDetailsButton = document.createElement('button');
    salesDetailsButton.innerText = 'See Detailed Sales Report';
    salesDetailsButton.onclick = function () {
        displayDetailedReport('Sales Report', salesHistory, ['Product', 'Quantity', 'Date']);
    };
    salesReportDiv.appendChild(salesDetailsButton);

    // Create an array to store labels and data for the chart
    var labels = [];
    var data = [];

    // Populate the array with sales data
    salesHistory.forEach(function (sale) {
        labels.push(sale.product);
        data.push(sale.quantity);
    });

    // Create a bar chart using Chart.js
    var salesChart = new Chart(salesChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantity Sold',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Adjust the color as needed
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to display stock report using a bar chart
function displayStockReport() {
    var stockReportDiv = document.getElementById('stock-report');
    var products = getProducts();

    // Clear previous content
    stockReportDiv.innerHTML = '';

    // Create a canvas element for the bar chart
    var stockChartCanvas = document.createElement('canvas');
    stockChartCanvas.id = 'stock-chart';
    stockReportDiv.appendChild(stockChartCanvas);

    // Create a button for detailed stock report
    var stockDetailsButton = document.createElement('button');
    stockDetailsButton.innerText = 'See Detailed Stock Report';
    stockDetailsButton.onclick = function () {
        displayDetailedReport('Stock Report', products, ['Product', 'Quantity', 'Minimum Stock']);
    };
    stockReportDiv.appendChild(stockDetailsButton);

    // Create an array to store labels and data for the chart
    var labels = [];
    var data = [];

    // Populate the array with stock data
    products.forEach(function (product) {
        labels.push(product.name);
        data.push(product.quantity);
    });

    // Create a bar chart using Chart.js
    var stockChart = new Chart(stockChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Current Stock',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Adjust the color as needed
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to display a detailed report in a modal
function displayDetailedReport(title, data, columnHeaders) {
    // Create a modal element
    var modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);

    // Create a modal content element
    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modal.appendChild(modalContent);

    // Create a close button for the modal
    var closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = function () {
        modal.style.display = 'none';
        modal.remove(); // Remove the modal from the DOM
    };
    modalContent.appendChild(closeButton);

    // Create a title for the modal
    var modalTitle = document.createElement('h2');
    modalTitle.innerText = title;
    modalContent.appendChild(modalTitle);

    // Create a table for the detailed report
    var table = document.createElement('table');
    modalContent.appendChild(table);

    // Create the table header row
    var headerRow = document.createElement('tr');
    columnHeaders.forEach(function (headerText) {
        var th = document.createElement('th');
        th.innerText = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Populate the table with data
    data.forEach(function (item) {
        var row = document.createElement('tr');
        for (var key in item) {
            var td = document.createElement('td');
            td.innerText = item[key];
            row.appendChild(td);
        }
        table.appendChild(row);
    });

    // Display the modal
    modal.style.display = 'block';
}

// Display sales and stock reports on page load
displaySalesReport();
displayStockReport();
