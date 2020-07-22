import React, { useState } from "react";

const api = {
  key: "47e923e89c069b26d17710cacc555c17",
  base: "http://api.openweathermap.org/data/2.5/",
};
// Date().toLocaleDateString()
function App() {
  //
  // http://api.openweathermap.org/data/2.5/weather?q=delhi&units=metric&APPID=47e923e89c069b26d17710cacc555c17
  const [city, setCity] = useState(" ");
  const [weather, setWeather] = useState(undefined);

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setCity("");
          console.log(result);
        })
        .catch((error) => console.log(error));
    }
  };

  const datebuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let day = days[d.getDay()];
    return `${day}, ${date}  ${month}  ${" "}${year} `;
  };
  console.log(weather);
  return (
    <div
      className={
        weather && weather.main !== "undefined"
          ? Math.round(weather.main.temp) > 30
            ? "warmTheme"
            : "defaultTheme"
          : "defaultTheme"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setCity(e.target.value)}
            // value={city}
            onKeyPress={search}
          />
        </div>
        <p className="date-style">{datebuilder(new Date())}</p>
        {weather && weather.main && (
          <section>
            <p className="city-name">{weather.name}</p>
            <p className="temp">{Math.round(weather.main.temp)}°c</p>
            {/* <p className="temp-range">
              {Math.round(weather.main.temp_max)}/
              {Math.round(weather.main.temp_min)}
            </p> */}
            <p className="condition">{weather.weather[0].main}</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
