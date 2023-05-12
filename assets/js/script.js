// var weatherApiKey = "2ab608278c156bf43d29f7d1d05beaaf";
let anotherKey = "cb2968fd932e7bdc026f52918804b584";
let forecastContainer = document.querySelector('#forecast-container');
let weatherContainer = document.querySelector('#weather-container');
let searchButton = document.querySelector('#search-button');
let searchInput = document.querySelector('#search');
let currentDay = dayjs().format('dddd, MM/DD/YYYY');
let searchHistory = [ ]

// onSearch is an eventListener that is grabbing the searchValue, and passing it to the fetchCoords function
function onSearch(event) {
    // assigning a variable searchValue to what the user inputs searchInput.value, searchValue is grabbing the city the user inputs
    let searchValue = searchInput.value;
    // var searchResults = '/forecast?'
    localStorage.setItem('city', searchValue);
    // searchHistory.push.(searchValue)
    // localStorage.setItem('city', searchHistory.value)
    // fetchCoords is being called, this returns the lat and lon data
    fetchCoords(searchValue);
}
//declare global variable of search history as an empty array.  Then push that value to the array and set that search history array to local storage.
// Update the array, JSON stringify it, and store 
// on load you have to parse it
// Start with saving the array
// create a new element of list item, add the search value as its value, append the list item that will display the search history

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
        // return {
        //     lat: lat,
        //     lon: lon,
        // }
    })
};


function getWeather(lat, lon) { // defining properties make sure they match lat and lon match in the url below, defining function here (define functions once)
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${anotherKey}`//let you can use the same variable name, var you have to use a different variable name
    fetch(requestUrl).then(function (response) {
        return response.json()
    }).then(function (data) {
        // console.log(data);
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
        // return {
        //     wind: wind,
        //     temp: temp,
        //     humidity: humidity
        // }
    })
};


function getForecast(lat, lon) {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${anotherKey}`
    fetch(requestUrl).then(function (response) {
        return response.json()
    }).then(function (data) {
        // console.log(data);//returns an array of 40 objects breaking down the 5 days into 8 3 hour blocks
        let fiveDayArr = data.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));
        // console.log(fiveDayArr);
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

