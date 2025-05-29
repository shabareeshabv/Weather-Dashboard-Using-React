import React, { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";
import "./SearchBar.css";

export default function SearchBar() {
  const { fetchWeather } = useContext(WeatherContext);
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) fetchWeather(city.trim());
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}
