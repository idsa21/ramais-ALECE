const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const returnButton = document.getElementById('returnButton');
const dataContainer = document.getElementById('dataContainer');
const csvUrl = 'exemplo_dados.csv';

let allData = [];
let filteredData = [];

Papa.parse(csvUrl, {
    download: true,
    header: true,
    delimiter: ",", // Substitua pela delimitador correto
    complete: function(results) {
        allData = results.data;
        displayData(allData);
    }
});

function displayData(data) {
    let table = '<table><thead><tr>';
    for (let header in data[0]) {
        table += `<th>${header}</th>`;
    }
    table += '</tr></thead><tbody>';

    data.forEach(row => {
        table += '<tr>';
        for (let cell in row) {
            table += `<td>${row[cell]}</td>`;
        }
        table += '</tr>';
    });

    table += '</tbody></table>';
    dataContainer.innerHTML = table;
}

searchButton.addEventListener('click', function() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        displayData(allData); // Exibe todos os dados se o campo de busca estiver vazio
    } else {
        filteredData = allData.filter(row => {
            for (let cell in row) {
                if (String(row[cell]).toLowerCase().includes(searchTerm)) {
                    return true;
                }
            }
            return false;
        });
        displayData(filteredData); // Exibe os dados filtrados
    }
});

returnButton.addEventListener('click', function() {
    displayData(allData); // Exibe todos os dados originais
});