require('dotenv').config();
console.log(process.env);

let container = document.getElementById("container");
let inputBox = document.getElementById("input-box");
let searchBtn = document.getElementById("search-button");
let currentWeatherDiv = document.getElementById("current-weather-div");

let currentTemp = document.getElementById("current-temp");
let feelsLike = document.getElementById("feels-like");
let kelvin = 273;

let currentWeatherDetails = document.getElementById("current-weather-details");
let weatherImg = document.getElementById("weather-img");

let cityName = document.getElementById("city-name");
let cityDetails = document.getElementById("city-details");

searchBtn.addEventListener("click", searchLocation);

function searchLocation() {
	localStorage.setItem("location", inputBox.value);
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputBox.value}&appid=8ba6efb085005fdea97e80cdfc40851e`)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('API request failed');
			}
		})
		.then(data => {
			console.log(data);
			container.style.display = "flex";
			container.style.flexDirection = "row";

			currentTemp.textContent = Math.floor(data["main"]["temp"] - kelvin) + "°C";
			feelsLike.textContent = "feels like: " + Math.floor(data["main"]["feels_like"] - kelvin) + "°C";

			let temp = Math.floor(data["main"]["temp"] - kelvin);

			if (temp >= 0 && temp <= 10) {
				document.body.style.backgroundColor = "#010038";
				weatherImg.src = "images/freezing.png";
				document.body.style.transition = "1s";
			}
			else if (temp > 10 && temp <= 20) {
				document.body.style.backgroundColor = "darkblue";
				weatherImg.src = "images/cold.png";
				document.body.style.transition = "1s";
			}
			else if (temp > 20 && temp <= 30) {
				document.body.style.backgroundColor = "green";
				weatherImg.src = "images/temperature.png";
				document.body.style.transition = "1s";
			}
			else if (temp > 30 && temp <= 35) {
				document.body.style.backgroundColor = "gold";
				weatherImg.src = "images/sunny.png";
				document.body.style.transition = "1s";
			}
			else if (temp > 35 && temp <= 40) {
				document.body.style.backgroundColor = "orange";
				weatherImg.src = "images/hot.png";
				document.body.style.transition = "1s";
			}
			else if (temp > 40) {
				document.body.style.backgroundColor = "red";
				weatherImg.src = "images/hot1.png";
				document.body.style.transition = "1s";
			}

			currentWeatherDetails.innerHTML =
				`<table id="weather-details-table">
				<tr>
			    <td>Weather:</td>
			    <td><div class="time-div-container-one"><img src="images/cloudy.png" class = "icons">&nbsp;<div class="time-div">${data["weather"][0]["main"]}</div></div></td>
			 </tr>
			 <tr>
			    <td>Humidty:</td>
			    <td><div class="time-div-container-one"><img src="images/humidity.png" class = "icons">&nbsp;<div class="time-div">${data["main"]["humidity"]}%</div></div></td>
			 </tr>
			 <tr>
			    <td>Visibility:</td>
			    <td><div class="time-div-container-one"><img src="images/visibility.png" class = "icons">&nbsp;<div class="time-div">${data["visibility"]}m</div></div></td>
			 </tr>
			 <tr>
			    <td>Pressure:</td>
			    <td><div class="time-div-container-one"><img src="images/barometer.png" class = "icons">&nbsp;<div class="time-div">${data["main"]["pressure"]}hPa</div></div></td>
			 </tr>
			 <tr>
			    <td>Temperature (Max):</td>
			    <td><div class="time-div-container-one"><img src="images/thermometer.png" class = "icons">&nbsp;<div class="time-div">${Math.floor(data["main"]["temp_max"] - kelvin)}°C</div></div></td>
			 </tr>
			 <tr>
			    <td>Temperature (Min):</td>
			    <td><div class="time-div-container-one"><img src="images/thermometer.png" class = "icons">&nbsp;<div class="time-div">${Math.floor(data["main"]["temp_min"] - kelvin)}°C</div></div></td>
			 </tr>
			 <tr>
			    <td>Wind Speed:</td>
			    <td><div class="time-div-container-one"><img src="images/wind.png" class = "icons">&nbsp;<div class="time-div">${data["wind"]["speed"]}m/s</div></div></td>
			 </tr>
			 <tr>
			    <td>Wind Degree:</td>
			    <td><div class="time-div-container-one"><img src="images/navigation.png" class = "icons">&nbsp;<div class="time-div">${data["wind"]["deg"]}°</div></div></td>
			 </tr>
			</table>`;

			cityName.innerText = data["name"] + ", " + data["sys"]["country"];

			const d = new Date(data["dt"]);
			const time = new Date(d * 1000);

			const sunrise = new Date(data["sys"]["sunrise"]);
			const sunriseTime = new Date(sunrise * 1000);

			const sunset = new Date(data["sys"]["sunset"]);
			const sunsetTime = new Date(sunset * 1000);

			cityDetails.innerHTML = `
			<table id="city-details-table">
			<tr>
			<td>Latitude:</td>
			<td><div class="time-div-container"><img src="images/latitude.png" class = "icons">&nbsp;<div class="time-div">${data["coord"]["lat"]}°</div></div></td>
			</tr>
			<tr>
			<td>Longitude:</td>
			<td><div class="time-div-container"><img src="images/longitude.png" class = "icons">&nbsp;<div class="time-div">${data["coord"]["lon"]}°</div></div></td>
			</tr>
			<tr>
			<td>Time Zone:</td>
			<td><div class="time-div-container"><img src="images/time-zone.png" class = "icons">&nbsp;<div class="time-div">${time}</div></div></td>
			</tr>
			<tr>
			<td>Sunrise:</td>
			<td><div class="time-div-container"><img src="images/sunrise.png" class = "icons">&nbsp;<div class="time-div">${sunriseTime}</div></div></td>
			</tr>
			<tr>
			<td>Sunset:</td>
			<td><div class="time-div-container"><img src="images/sunset.png" class = "icons">&nbsp;<div class="time-div">${sunsetTime}</div></div></td>
			</tr>
			</table>`;

		})
		.catch(error => {
			console.error(error);
			alert("Wrong city name!");
			inputBox.value = "";
		});
}

document.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		searchBtn.click();
	}
});

window.addEventListener("load", function () {
	let storageItem = this.localStorage.getItem("location");
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${storageItem}&appid=8ba6efb085005fdea97e80cdfc40851e`)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('API request failed');
			}
		})
		.then(data => {
			console.log(data);
			container.style.display = "flex";
			container.style.flexDirection = "row";

			currentTemp.textContent = Math.floor(data["main"]["temp"] - kelvin) + "°C";
			feelsLike.textContent = "feels like: " + Math.floor(data["main"]["feels_like"] - kelvin) + "°C";

			let temp = Math.floor(data["main"]["temp"] - kelvin);

			if (temp >= 0 && temp <= 10) {
				document.body.style.backgroundColor = "#010038";
				weatherImg.src = "images/freezing.png";
				document.body.style.transition = "1s";
			}
			else if (temp > 10 && temp <= 20) {
				document.body.style.backgroundColor = "darkblue";
				weatherImg.src = "images/cold.png";
				document.body.style.transition = "1s";
			}
			else if (temp > 20 && temp <= 30) {
				document.body.style.backgroundColor = "green";
				weatherImg.src = "images/temperature.png";
				document.body.style.transition = "1s";
			}
			else if (temp > 30 && temp <= 35) {
				document.body.style.backgroundColor = "gold";
				weatherImg.src = "images/sunny.png";
				document.body.style.transition = "1s";
			}
			else if (temp > 35 && temp <= 40) {
				document.body.style.backgroundColor = "orange";
				weatherImg.src = "images/hot.png";
				document.body.style.transition = "1s";
			}
			else if (temp > 40) {
				document.body.style.backgroundColor = "red";
				weatherImg.src = "images/hot1.png";
				document.body.style.transition = "1s";
			}

			currentWeatherDetails.innerHTML =
				`<table id="weather-details-table">
			 <tr>
			    <td>Weather:</td>
			    <td><div class="time-div-container-one"><img src="images/cloudy.png" class = "icons">&nbsp;<div class="time-div">${data["weather"][0]["main"]}</div></div></td>
			 </tr>
			 <tr>
			    <td>Humidty:</td>
			    <td><div class="time-div-container-one"><img src="images/humidity.png" class = "icons">&nbsp;<div class="time-div">${data["main"]["humidity"]}%</div></div></td>
			 </tr>
			 <tr>
			    <td>Visibility:</td>
			    <td><div class="time-div-container-one"><img src="images/visibility.png" class = "icons">&nbsp;<div class="time-div">${data["visibility"]}m</div></div></td>
			 </tr>
			 <tr>
			    <td>Pressure:</td>
			    <td><div class="time-div-container-one"><img src="images/barometer.png" class = "icons">&nbsp;<div class="time-div">${data["main"]["pressure"]}hPa</div></div></td>
			 </tr>
			 <tr>
			    <td>Temperature (Max):</td>
			    <td><div class="time-div-container-one"><img src="images/thermometer.png" class = "icons">&nbsp;<div class="time-div">${Math.floor(data["main"]["temp_max"] - kelvin)}°C</div></div></td>
			 </tr>
			 <tr>
			    <td>Temperature (Min):</td>
			    <td><div class="time-div-container-one"><img src="images/thermometer.png" class = "icons">&nbsp;<div class="time-div">${Math.floor(data["main"]["temp_min"] - kelvin)}°C</div></div></td>
			 </tr>
			 <tr>
			    <td>Wind Speed:</td>
			    <td><div class="time-div-container-one"><img src="images/wind.png" class = "icons">&nbsp;<div class="time-div">${data["wind"]["speed"]}m/s</div></div></td>
			 </tr>
			 <tr>
			    <td>Wind Degree:</td>
			    <td><div class="time-div-container-one"><img src="images/navigation.png" class = "icons">&nbsp;<div class="time-div">${data["wind"]["deg"]}°</div></div></td>
			 </tr>
			</table>`;

			cityName.innerText = data["name"] + ", " + data["sys"]["country"];

			const d = new Date(data["dt"]);
			const time = new Date(d * 1000);

			const sunrise = new Date(data["sys"]["sunrise"]);
			const sunriseTime = new Date(sunrise * 1000);

			const sunset = new Date(data["sys"]["sunset"]);
			const sunsetTime = new Date(sunset * 1000);

			cityDetails.innerHTML = `
			<table id="city-details-table">
			<tr>
			<td>Latitude:</td>
			<td><div class="time-div-container"><img src="images/latitude.png" class = "icons">&nbsp;<div class="time-div">${data["coord"]["lat"]}°</div></div></td>
			</tr>
			<tr>
			<td>Longitude:</td>
			<td><div class="time-div-container"><img src="images/longitude.png" class = "icons">&nbsp;<div class="time-div">${data["coord"]["lon"]}°</div></div></td>
			</tr>
			<tr>
			<td>Time Zone:</td>
			<td><div class="time-div-container"><img src="images/time-zone.png" class = "icons">&nbsp;<div class="time-div">${time}</div></div></td>
			</tr>
			<tr>
			<td>Sunrise:</td>
			<td><div class="time-div-container"><img src="images/sunrise.png" class = "icons">&nbsp;<div class="time-div">${sunriseTime}</div></div></td>
			</tr>
			<tr>
			<td>Sunset:</td>
			<td><div class="time-div-container"><img src="images/sunset.png" class = "icons">&nbsp;<div class="time-div">${sunsetTime}</div></div></td>
			</tr>
			</table>`;

		})
		.catch(error => {
			console.error(error);
			inputBox.value = "";
		});
})
