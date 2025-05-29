import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

export default function ErrorMessage() {
  const { error } = useContext(WeatherContext);
  return error ? <p style={{ color: "red" }}>{error}</p> : null;
}
