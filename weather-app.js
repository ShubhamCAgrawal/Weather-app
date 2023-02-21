const sunriseSunsetTime = document.querySelectorAll(".time"),
    weatherIcon = document.querySelector('.icon'),
    weatherDescription = document.querySelectorAll(".description"),
    tempDescription = document.querySelectorAll(".temp-desc"),
    weatherDesc = document.querySelectorAll(".weather-description"),
    cloudsWindSpeed = document.getElementById("clouds"),
    humidityDewPoint = document.getElementById("humidity");

getData();
function getData() {
    let key = "b517f5fc6b25bc5c68adb3377d5c6456";
    let [lat, long, unit, excludeData] = [21.1458, 79.0882, "metric", "{daily}"];
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${excludeData}&appid=${key}&units=${unit}`
    fetch(url).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        weatherInfo(data);
    }).catch(function (err) {
        alert(err);
    })
}
function weatherInfo(weatherData) {
    let i = 0;
    const eightDayDates = document.getElementById("date");
    var length = weatherData.daily.length
    for (let j = 0; j < length; j++) {
        getWeatherDetails(weatherData, i);
        let displayDate = document.createElement('a');
        displayDate.setAttribute("class", 'dates')
        eightDayDates.appendChild(displayDate);
        let eightDate = new Date(weatherData?.daily[j].dt * 1000).toLocaleDateString(
            "en-US", {
            weekday: "short",
            month: "short",
            day: "numeric"
        });
        displayDate.innerHTML = `${eightDate}`
    }
    const dates = document.querySelectorAll(".dates");
    dates.forEach(function (date, index) {
        date.addEventListener("click", function () {
            i = index;
            getWeatherDetails(weatherData, i);
        });
    });

    const tableData = document.getElementById("table-data");
    for (let k = 0; k <= 3; k++) {
        let displayTableData = document.createElement("td");
        displayTableData.setAttribute("class", "temp")
        tableData.appendChild(displayTableData);
    }
    const feelsLikeTemp = document.getElementById("feels-like")
    for (let l = 0; l <= 3; l++) {
        let feelsLikeData = document.createElement("td");
        feelsLikeData.setAttribute("class", "feels-like-temp")
        feelsLikeTemp.appendChild(feelsLikeData);
    }
    getWeatherDetails(weatherData, i)
}

function getWeatherDetails(weatherData, i) {
    const temperature = document.querySelectorAll('.temp');
    let morn = weatherData?.daily[i]?.temp?.morn,
        day = weatherData.daily[i]?.temp?.day,
        eve = weatherData.daily[i]?.temp?.eve,
        night = weatherData.daily[i]?.temp?.night
    let temp = [morn, day, eve, night]
    temperature.forEach(function (date, index) {
        date.innerHTML = `${Math.round(temp[index])}\u00B0C`;
    });

    const feelsLikeTemprature = document.querySelectorAll(".feels-like-temp");
    let feels_like_morn = weatherData.daily[i]?.feels_like?.morn,
        feels_like_day = weatherData.daily[i]?.feels_like?.day,
        feels_like_eve = weatherData.daily[i]?.feels_like?.eve,
        feels_like_night = weatherData.daily[i]?.feels_like?.night

    let feelsLikeTemp = [feels_like_morn, feels_like_day, feels_like_eve, feels_like_night]
    feelsLikeTemprature.forEach(function (date, index) {
        date.innerHTML = `${Math.round(feelsLikeTemp[index])}\u00B0C`;
    });

    let { icon, main, description } = weatherData?.daily[i]?.weather[0];
    tempDescription.forEach(function (date, index) {
        date.innerHTML = `${Math.round(temp[index])}\u00B0C`;
    });
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/10d@2x.png"
    alt="Weather-image" ${icon}/>`;

    let weatherStatus = [main, description];
    weatherDescription.forEach(function (date, index) {
        date.textContent = weatherStatus[index];
    });
    let dew_point = weatherData?.daily[i]?.dew_point ?? "NA",
        humidity = weatherData?.daily[i]?.humidity ?? "NA",
        clouds = weatherData?.daily[i]?.clouds ?? "NA",
        uvi = weatherData?.daily[i]?.uvi ?? "NA",
        pressure = weatherData?.daily[i]?.pressure ?? "NA",
        wind_speed = weatherData?.daily[i]?.dew_point ?? "NA",
        sunrise = weatherData?.daily[i]?.sunrise ?? "NA",
        sunset = weatherData?.daily[i]?.sunset ?? "NA"
    cloudsWindSpeed.innerHTML = `Cloud: ${clouds}% &nbsp &nbsp Wind Speed: ${wind_speed}m/s N  &nbsp &nbsp Pressure: ${pressure}hPa`;
    humidityDewPoint.innerHTML = `Humidity: ${humidity}% &nbsp &nbsp UV: ${uvi} &nbsp &nbsp Dew point: ${dew_point}`;

    let getSunriseSunsetTime = [timeHour(sunrise), timeHour(sunset)]
    sunriseSunsetTime.forEach(function (date, index) {
        date.textContent = getSunriseSunsetTime[index];
    })
}
function timeHour(num) {
    return new Date(num * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
}