async function getWeather() {
  const city = document.getElementById("city").value || "Hassan";
  const apiKey = "9bb9b4055072f0037716d4842d40bcf1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.cod === 200) {
    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `🌡️ Temp: ${data.main.temp}°C`;
    document.getElementById("description").textContent = `☁️ ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `🌬️ Wind: ${data.wind.speed} m/s`;

    setQuote(data.weather[0].main);
  } else {
    document.getElementById("weather-result").innerHTML = `<p>City not found!</p>`;
  }
}

function setQuote(condition) {
  const quotes = {
    Clear: "The sun is shining — let your soul shine too ☀️",
    Clouds: "Even behind clouds, the sun never stops shining ☁️",
    Rain: "Let the rain wash away your worries 🌧️",
    Thunderstorm: "Storms make trees take deeper roots ⚡",
    Drizzle: "A little drizzle brings a big smile 🌦️",
    Snow: "Every snowflake is a kiss from heaven ❄️",
    Mist: "In the mist of uncertainty, find peace 🌫️",
    Default: "No matter the weather, keep shining ✨"
  };

  const colors = {
    Clear: "#ffeb3b",
    Clouds: "#ffffff",
    Rain: "#00bcd4",
    Thunderstorm: "#ff9800",
    Snow: "#b3e5fc",
    Mist: "#d1c4e9",
    Default: "#ffffff"
  };

  const animations = ["move-horizontal", "move-vertical", "move-diagonal", "move-reverse-diagonal"];
  const randomAnim = animations[Math.floor(Math.random() * animations.length)];

  const quote = quotes[condition] || quotes.Default;
  const color = colors[condition] || colors.Default;

  const quoteElement = document.getElementById("weather-quote");
  quoteElement.textContent = quote;
  quoteElement.style.color = color;
  quoteElement.style.animation = "none";
  quoteElement.offsetHeight; // reset
  quoteElement.style.animation = `${randomAnim} 10s linear infinite`;
}
