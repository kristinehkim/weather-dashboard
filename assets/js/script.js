// var weatherApiKey = "2ab608278c156bf43d29f7d1d05beaaf";
let anotherKey = "cb2968fd932e7bdc026f52918804b584"
var city;

// var queryString =

var searchButton = document.querySelector('#search-button');
var searchInput = document.querySelector('#search');

// onSearch is an eventListener that is grabbing the searchValue, and passing it to the fetchCoords function
function onSearch(event) {
    // assigning a variable searchValue to what the user inputs searchInput.value, searchValue is grabbing the city the user inputs
    var searchValue = searchInput.value;
    // var searchResults = '/forecast?'

    // fetchCoords is being called, this returns the lat and lon data
    fetchCoords(searchValue);
}
// taking the cityName the user inputs and getting the lat and lon
function fetchCoords(cityName) {
    let requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${anotherKey}`//template literals or template string - ${variable}, the whole thing in back ticks ` ` (grave tick)
    return fetch(requestUrl).then(function(response) {
        return response.json()
    }).then(function(data) {
    // console.log(data);
    const lat = data[0].lat; //setting a const of lat, grabbing the data [0] indexed object and grabbing value of .lat key - drilling down into data objects/arrays
    // console.log(typeof data[0])
    const lon = data[0].lon; 
    // console.log(lat, lon)
    getForecast(lat, lon);
    return {
        lat: lat, 
        lon: lon,   
    }
    })
};

// google "how to change asynch await to fetch"

// function getWeather(lat, lon) { // defining properties make sure they match lat and lon match in the url below, defining function here (define functions once)
//     let requestUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${anotherKey}`//let you can use the same variable name, var you have to use a different variable name
//     fetch(requestUrl).then(function(response) {
//         return response.json()
//     }).then (function(data) {
//         console.log(data);
//     const wind = data.wind.speed; //grabbing the properties stored in an object
//     const temp = data.main.temp;
//     const humidity = data.main.humidity;
//     console.log(wind, temp, humidity);
    
//     // getForecast(lat, lon);
//     return {
//         wind: wind,
//         temp: temp,
//         humidity: humidity
//     }
// })
    // getWeather(lat, lon); //call function getWeather because lat and lon live here, lat and lon are the arguments, you can call functions an infinite amount of times 
// };

function getForecast(lat, lon) {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${anotherKey}`
    fetch(requestUrl).then(function(response) {
        return response.json()
    }).then (function(data) {
        console.log(data);
        if (data.list[0].dt_txt == '03:00:00') {
            const temp = data.list[0].main.temp;
            const wind = data.list[0].wind.speed;
            const humidity = data.list[0].main.humidity;
            console.log(temp, wind, humidity);
            return {
                temp: temp,
                wind: wind,
                humidity: humidity
            }
        }
        // for (var i = 0; i < data.list.length; i++) {
        //     printResults(locRes.results[i]);//checking the time dt
    })

    //  if dt... is 1:00 then get the data for that item for that specific time and render a forecast card for it (for loop)
    // function that creates html elements for each piece of weather data that we want
};

//use js or jQuery to build the cards within the functions
searchButton.addEventListener('click', onSearch)//when we click it will run the onSearch function
