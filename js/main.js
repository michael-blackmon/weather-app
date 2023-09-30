const apiKey = "280e7b37d8fe4e4eb20100252232409";
const input = document.getElementById("input");
const button = document.querySelector("button[name='button']");

//refresh page
document.querySelector("a").addEventListener("click", function () {
  location.reload();
});

//listens for click
button.addEventListener("click", () => {
  const cityName = input.value.trim();
  if (cityName !== "") {
    getWeather(cityName);
  }
});

//listens for 'Enter' keypress
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const cityName = input.value.trim();
    if (cityName !== "") {
      getWeather(cityName);
    }
  }
});

async function getWeather(cityName) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`
    );
    const data = await response.json();

    //assign specific data to variables
    const nameRegion = data.location.name + ", " + data.location.region;
    const icon = data.current.condition.icon;
    const temp = data.current.temp_f;
    const desc = data.current.condition.text;
    const feelsLike = data.current.feelslike_f;
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_mph;

    //replace images and text with values from data
    document.querySelector(".city").innerText = nameRegion;
    document.querySelector(".icon img").src = icon;
    document.querySelector(".temp").innerText = `${temp}°F`;
    document.querySelector(".desc").innerText = desc;
    document.querySelector(
      ".feels-like"
    ).innerText = `Feels Like: ${feelsLike}°F`;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
    document.querySelector(
      ".wind-speed"
    ).innerText = `Wind Speed: ${windSpeed} mph`;
  } catch (error) {
    console.error("Error fetching weather data: ", error);
  }
}
