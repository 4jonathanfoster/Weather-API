console.log("connected");
// Javascript Variables
// Current Day Variables
var day = $('#currentDayWeather'); // The div with all of the current weather information inside
var dayCity = $("#dailyCity"); // Calls to the curreny day's city name on HTML
var dayTemp = $("#dayTemp"); // Calls to the current day's temp on HTML
var dayWind = $("#dayWind"); // Calls to the current day's wind on HTML
var dayHumidity = $("#dayHumidity"); // Calls to the current day's humidity on HTML
var dayIcon = $("#dayIcon"); // Calls to where our icon will be placed in HTMl
var dayUV = $('#dayUV');
// Five-Day Weather Variables
var fiveDayWeather = $('#fiveDayWeather'); // The div with all of the current weather information inside
var fiveDayTemp = $('.myCardTemp'); // The five day's temperature HTML
var fiveDayPhoto = $('.myCardPhoto'); // The five days icon HTML
var fiveDayWind = $('.myCardWind'); // The five days wind speed HTML
var fiveDayHumidity = $('.myCardHumidity'); // The five days humidity HTMl
var fiveDayDate = $('.myCardDate'); // The five card dates HTML
// Input HTML Variables
var submitBtn = $('#submitBtn'); // The submit button HTML
// Normal Javascript Variables
var userInput; // A variable that grabs the city once the user inputs it
var saveCity = []; // A variable that stores the array of our cities
submitBtn.click(function() // An EventListener that pays attenion for when the user clicks submit
    {
        userInput = $('#userInfo').val(); // Gets the city from the input box
        getAPI(); // Calls the function "getAPI", this will both obtain and display the information.
    })

function getAPI() // Calls our APIS for their information and then displays the information onto our screen.
{
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=8a393f02d01e324fee60ee71877cc93c') // Calls our API and gets the information
        .then(function(response) // Waits until the information is gathered
            {
                return response.json(); // Returns the information as a JSON
            })
        .then(function(data) // Starts a function of what we are going to do with the data
            {
                console.log(data); // Outputs our data into the console log so we can see all of data
                dayCity.text(data.name + " " + moment().format('MM/DD/YYYY')); // Outputs our city's name and the current date
                fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude={part}&units=imperial&appid=8a393f02d01e324fee60ee71877cc93c') // Calls our API and gets the information
                    .then(function(response) // Waits until the information is gathered
                        {
                            return response.json(); // Returns the information as a JSON
                        })
                    .then(function(data2) // Starts a function of what we are going to do with the data
                        {
                            console.log(data2); // Outputs our data into the console log so we can see all of the data
                            dayUV.text("UV Index: " + data2.current.uvi); // Displays the current days UV Index
                            dayIcon.prepend('<img src = "http://openweathermap.org/img/wn/' + data2.current.weather[0].icon + '@2x.png" />'); // Displays the current day's weather icon
                            dayTemp.text("Temp: " + data2.current.temp + "°F"); // Displays the current days temperature
                            dayWind.text("Wind: " + data2.current.wind_speed + " MPH"); // Displays the current days wind speed
                            dayHumidity.text("Humidity " + data2.current.humidity + "%"); // Displays the current days humidity
                            fiveDayTemp.each(function(i) { $(this).text("Temp: " + data2.daily[i].temp.day); }); // Runs a function that displays the 5 days temperature
                            fiveDayWind.each(function(i) { $(this).text("Wind: " + data2.daily[i].wind_speed + "MPH"); }); // Runs a function that displays the 5 days wind speed
                            fiveDayHumidity.each(function(i) { $(this).text("Humidity: " + data2.daily[i].humidity + '%'); }); // Runs a function that displays the 5 days humidity
                            fiveDayDate.each(function(i) { $(this).text(moment().add(1 + i, 'days').format("MM/DD/YYYY")); }); // Runs a function that displays the 5 days date
                            fiveDayPhoto.each(function(i) { $(this).prepend('<img src = "http://openweathermap.org/img/wn/' + data2.daily[i].weather[0].icon + '@2x.png" />'); }); // Runs a function that displays the 5 days weather icons.
                        })
            })
}