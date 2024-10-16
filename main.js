const time = 1 * 60 * 1000;

// Array of CSV URLs with corresponding storage keys
const csvLinks = [
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRm48hnUwaJhf04Q7c-QOWvVSLCWCghP2lIihDV-kCSTAoKROFRQn6kaeLoRXjQ7bLKW2Rz12oYcRaT/pub?output=csv', key: 'PrivteDataAll' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRDv7MQUbN2J6k-mj5UI9RsITtNmwhR1LwkxBc3tQ_aUU984nUy1aEIQIWgVUeOJyKTDVkrggQBqn7n/pub?output=csv&gid=1000375812', key: 'PrivateDataMain' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMec3rLMJvXIWdyVxO_ZVzKaJTrxrxqp4Wk1G2jjzEbRAr2x0df81w-6C3UrYpgNgilUTmz_ct4seU/pub?output=csv', key: 'PublicDataPerson' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMec3rLMJvXIWdyVxO_ZVzKaJTrxrxqp4Wk1G2jjzEbRAr2x0df81w-6C3UrYpgNgilUTmz_ct4seU/pub?output=csv&gid=622627727', key: 'PublicDataPlaces' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMec3rLMJvXIWdyVxO_ZVzKaJTrxrxqp4Wk1G2jjzEbRAr2x0df81w-6C3UrYpgNgilUTmz_ct4seU/pub?output=csv&gid=497879876', key: 'PublicDataTransport' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv', key: 'Banner' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=1509718069', key: 'Boxs' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=471126613', key: 'MoreOption' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=2089505816', key: 'Posts' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=1429441367', key: 'Inbox' },  
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=366259374', key: 'Images' },  
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqO2wnCm7qgYrAPmti7eLwgiVpLaTdUSrWebr_KLKQ9h0mS2WYIubB-9epYRF6Ro9ihvA9Qe5vZxBC/pub?output=csv&gid=0', key: 'Events' },  
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqO2wnCm7qgYrAPmti7eLwgiVpLaTdUSrWebr_KLKQ9h0mS2WYIubB-9epYRF6Ro9ihvA9Qe5vZxBC/pub?output=csv&gid=692804136', key: 'Blood' },  
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqO2wnCm7qgYrAPmti7eLwgiVpLaTdUSrWebr_KLKQ9h0mS2WYIubB-9epYRF6Ro9ihvA9Qe5vZxBC/pub?output=csv&gid=909176802', key: 'Donation' },  
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSqO2wnCm7qgYrAPmti7eLwgiVpLaTdUSrWebr_KLKQ9h0mS2WYIubB-9epYRF6Ro9ihvA9Qe5vZxBC/pub?output=csv&gid=54672331', key: 'Reference' },  
];

// Function to fetch CSV data
function fetchCSVData(csvUrl) {
    return new Promise(function(resolve, reject) {
        Papa.parse(csvUrl, {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: function(results) {
                resolve(results.data);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

// Function to convert JSON data to CSV format
function convertJSONToCSV(data) {
    const csv = Papa.unparse(data);
    return csv;
}

// Function to update local storage with fetched data in CSV format
async function updateLocalStorage(csvUrl, storageKey) {
    try {
        var newData = await fetchCSVData(csvUrl);
        var storedData = localStorage.getItem(storageKey);

        // Convert new data to CSV format
        const newCSVData = convertJSONToCSV(newData);

        // Check if fetched data differs from local storage data
        if (newCSVData !== storedData) {
            localStorage.setItem(storageKey, newCSVData);
            console.log('Local storage data updated successfully for', storageKey);
        } else {
            console.log('Local storage data is up to date for', storageKey);
        }
    } catch (error) {
        console.error('Error fetching or updating data for', storageKey, ':', error);
    }
}

// Function to update local storage and set interval for each CSV link
function updateAndSetInterval() {
    csvLinks.forEach(({ url, key }) => {
        updateLocalStorage(url, key);
        setInterval(() => updateLocalStorage(url, key), time); // 1 minute in milliseconds
    });
}

// Fetch data and update local storage initially
updateAndSetInterval();
