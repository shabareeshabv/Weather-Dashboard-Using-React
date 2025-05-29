import React from "react";
import WeatherDisplay from "./components/WeatherDisplay";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <SearchBar />
      <WeatherDisplay />
    </div>
  );
}

export default App;
