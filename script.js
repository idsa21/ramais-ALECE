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

function removeAcentosPontuacao(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, '');
}



function displayData(data) {
    if (data.length === 0) {
        dataContainer.innerHTML = '<p>ramal / setor não encontrado</p>';
    } else {
        let table = '<table><thead><tr>';
        if (data.length > 0) {
            for (let header in data[0]) {
                table += `<th>${header}</th>`;
            }
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
}

searchButton.addEventListener('click', function() {
    const searchTerm = removeAcentosPontuacao(searchInput.value.toLowerCase());
    if (searchTerm === '') {
        displayData(allData);
    } else {
        const filteredData = allData.filter(row => {
            for (let cell in row) {
                const cellValue = removeAcentosPontuacao(String(row[cell]).toLowerCase());
                if (cellValue.includes(searchTerm)) {
                    return true;
                }
            }
            return false;
        });
        displayData(filteredData);
    }
});

returnButton.addEventListener('click', function() {
    displayData(allData);
    searchInput.value = ''; // Limpa o campo de busca
});