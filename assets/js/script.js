var weatherApiKey = "2ab608278c156bf43d29f7d1d05beaaf";
var city;

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// var queryString =

var searchButton = document.querySelector('#search-button');
var searchInput = document.querySelector('#search');



var init = function init() {
    console.log("Do you see this?");
};

var onSearch = function (event) {
    console.log('clicked', event);
    //search the weather 
    //need to attach search input as query params
    //grab search input

    var searchValue = searchInput.value;
    var searchResults = 
};

searchButton.addEventListener('click', onSearch)

init();