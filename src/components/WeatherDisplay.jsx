import React, { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";
import "./WeatherDisplay.css";

export default function WeatherDisplay() {
  const { weatherData, loading, error } = useContext(WeatherContext);
  const [isCelsius, setIsCelsius] = useState(true);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  if (!weatherData) return null;

  const { name, sys, main, weather, wind } = weatherData;
  const { icon, description } = weather[0];

  // ✅ Assume API is returning temperature in Celsius already
  const convertTemp = (tempC) => {
    return isCelsius
      ? `${Math.round(tempC)}°C`
      : `${Math.round((tempC * 9) / 5 + 32)}°F`;
  };

  return (
    <div className="weather-container">
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button onClick={() => setIsCelsius(!isCelsius)} className="unit-toggle-btn">
          Switch to {isCelsius ? "°F" : "°C"}
        </button>
      </div>

      <div className="weather-main-info">
        <div className="temp-now-location">
          <div className="temp-now">
            <p className="temp">{convertTemp(main.temp)}</p>
            <p className="now">Now</p>
          </div>
          <div className="location">
            {name}, {sys?.country}
            <p className="weather-condition">{description}</p>
          </div>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="weather-icon"
        />
      </div>

      <div className="weather-details">
        <div className="detail-card">
          <ion-icon name="thermometer-outline" class="icon"></ion-icon>
          <div>
            <p className="detail-value">{convertTemp(main.temp)}</p>
            <p className="detail-label">Temperature</p>
          </div>
        </div>

        <div className="detail-card">
          <ion-icon name="speedometer-outline" class="icon"></ion-icon>
          <div>
            <p className="detail-value">{wind.speed} m/s</p>
            <p className="detail-label">Wind Speed</p>
          </div>
        </div>

        <div className="detail-card">
          <ion-icon name="rainy-outline" class="icon"></ion-icon>
          <div>
            <p className="detail-value">{main.humidity}%</p>
            <p className="detail-label">Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
}
