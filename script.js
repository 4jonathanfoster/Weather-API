console.log("connected");

var day = $('#currentDayWeather');
var dayCity = $("#dailyCity");
var dayTemp = $("#dayTemp");
var dayWind = $("#dayWind");
var dayHumidity = $("#dayHumidity");
var dayIcon = $("#dayIcon");
var dayUV = $('#dayUV');

var fiveDayWeather = $('#fiveDayWeather');
var fiveDayTemp = $('.myCardTemp');
var fiveDayPhoto = $('.myCardPhoto');
var fiveDayWind = $('.myCardWind');
var fiveDayHumidity = $('.myCardHumidity');
var fiveDayDate = $('.myCardDate');

var submitBtn = $('#submitBtn');

var userInput;
var saveCity = [];
submitBtn.click(function() {
    userInput = $('#userInfo').val();
    getAPI();
})

function getAPI() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=8a393f02d01e324fee60ee71877cc93c')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            dayCity.text(data.name + " " + moment().format('MM/DD/YYYY'));
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude={part}&units=imperial&appid=8a393f02d01e324fee60ee71877cc93c')
                .then(function(response) {
                    return response.json();
                })
                .then(function(data2) {
                    console.log(data2);
                    dayUV.text("UV Index: " + data2.current.uvi);
                    dayIcon.prepend('<img src = "http://openweathermap.org/img/wn/' + data2.current.weather[0].icon + '@2x.png" />');
                    dayTemp.text("Temp: " + data2.current.temp + "°F");
                    dayWind.text("Wind: " + data2.current.wind_speed + " MPH");
                    dayHumidity.text("Humidity " + data2.current.humidity + "%");
                    fiveDayTemp.each(function(i) { $(this).text("Temp: " + data2.daily[i].temp.day); });
                    fiveDayWind.each(function(i) { $(this).text("Wind: " + data2.daily[i].wind_speed + "MPH"); });
                    fiveDayHumidity.each(function(i) { $(this).text("Humidity: " + data2.daily[i].humidity + '%'); });
                    fiveDayDate.each(function(i) { $(this).text(moment().add(1 + i, 'days').format("MM/DD/YYYY")); });
                    fiveDayPhoto.each(function(i) { $(this).prepend('<img src = "http://openweathermap.org/img/wn/' + data2.daily[i].weather[0].icon + '@2x.png" />'); });
                })
        })
}