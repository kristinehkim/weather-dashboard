// var weatherApiKey = "2ab608278c156bf43d29f7d1d05beaaf";
let anotherKey = "cb2968fd932e7bdc026f52918804b584";
let forecastContainer = document.querySelector('#forecast-container');
let weatherContainer = document.querySelector('#weather-container');
let searchButton = document.querySelector('#search-button');
let searchInput = document.querySelector('#search');
let currentDay = dayjs().format('dddd, MM/DD/YYYY');
let cityList = document.querySelector('#city-list');
let searchHistory = []

function renderSearch() {
    cityList.innerHTML = "";//clearing the HTML before re-rendering the weather data with the new data for the city we just searched.
    for (let i = 0; i < searchHistory.length; i++) {
        let search = searchHistory[i];
        let li = document.createElement("li");
        li.textContent = search;//add the text to that list element
        li.setAttribute("data-index", i);
        cityList.appendChild(li);
    }
}
// This function is being called below and will run when the page loads.
function init() {//init is short for initialize
    // Get stored searches as objects from localStorage
    let storedSearch = JSON.parse(localStorage.getItem("city"));//this gets the stored searches

    // If searches were retrieved from localStorage, update the searches array to it
    if (storedSearch !== null) {//if its not null,
        searchHistory = storedSearch;//make searches stored searches
    }

    // This is a helper function that will render searches to the DOM
    renderSearch();//then render them
}

function storeSearches() {
    // Stringify and set key in localStorage to search array
    localStorage.setItem("city", JSON.stringify(searchHistory));//setting the searches in here and stringifying them because they can only be stored as a string
}

// onSearch is an eventListener that is grabbing the searchValue, and passing it to the fetchCoords function
function onSearch(event) {
    event.preventDefault();
    // assigning a variable searchValue to what the user inputs searchInput.value, searchValue is grabbing the city the user inputs
    let searchValue = searchInput.value;
    searchHistory.push(searchValue)
    storeSearches();
    renderSearch();
    // fetchCoords is being called, this returns the lat and lon data
    fetchCoords(searchValue);
}

// taking the cityName the user inputs and getting the lat and lon
function fetchCoords(cityName) {
    let requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${anotherKey}`//template literals or template string - ${variable}, the whole thing in back ticks ` ` (grave tick)
    return fetch(requestUrl).then(function (response) {
        return response.json()
    }).then(function (data) {
        // console.log(data);
        const lat = data[0].lat; //setting a const of lat, grabbing the data [0] indexed object and grabbing value of .lat key - drilling down into data objects/arrays
        // console.log(typeof data[0])
        const lon = data[0].lon;
        // console.log(lat, lon)
        getWeather(lat, lon);
    })
};


function getWeather(lat, lon) { // defining properties make sure they match lat and lon match in the url below, defining function here (define functions once)
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${anotherKey}`//let you can use the same variable name, var you have to use a different variable name
    fetch(requestUrl).then(function (response) {
        return response.json()
    }).then(function (data) {
        weatherContainer.innerHTML = "";

        const div = document.createElement('div');
        const city = document.createElement('h2');
        const date = document.createElement('h2');
        const temp = document.createElement('h3');
        const wind = document.createElement('h3');
        const humidity = document.createElement('h3');

        div.classList = 'card'
        city.innerText = `${searchInput.value}`
        date.innerText = `${currentDay}`
        temp.innerText = `Temp: ${data.main.temp}\u00B0 F`
        wind.innerText = `Wind: ${data.wind.speed} MPH`
        humidity.innerText = `Humidity: ${data.main.humidity}%`

        div.appendChild(city);
        div.appendChild(date);
        div.appendChild(temp);
        div.appendChild(wind);
        div.appendChild(humidity);
        weatherContainer.appendChild(div);

        getForecast(lat, lon);
    })
};


function getForecast(lat, lon) {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${anotherKey}`
    fetch(requestUrl).then(function (response) {
        return response.json()
    }).then(function (data) {
        forecastContainer.innerHTML = "";
        //data returns an array of 40 objects breaking down the 5 days into 8 3 hour blocks
        let fiveDayArr = data.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));

        let futureDate = dayjs(data.dt_txt).format('MM/DD/YYYY');
        fiveDayArr.forEach(data => {//forEach going through the data of the fiveDayArr
            const div = document.createElement('div');
            const date = document.createElement('h2');
            const temp = document.createElement('h3');
            const wind = document.createElement('h3');
            const humidity = document.createElement('h3');

            div.classList = 'card'
            date.innerText = `${data.dt_txt}`
            temp.innerText = `Temp: ${data.main.temp}\u00B0 F`
            wind.innerText = `Wind: ${data.wind.speed} MPH`
            humidity.innerText = `Humidity: ${data.main.humidity}%`

            div.appendChild(date);
            div.appendChild(temp);
            div.appendChild(wind);
            div.appendChild(humidity);
            forecastContainer.appendChild(div);//appending the temp, wind, humidity to the forecast container
        });
    })
}
searchButton.addEventListener('click', onSearch)//when we click it will run the onSearch function

