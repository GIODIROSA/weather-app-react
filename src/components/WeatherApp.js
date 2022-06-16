import { useState, useEffect } from "react";
import WeatherForm from "./WeatherForm";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);

  // ciclo de vida
  useEffect(() => {
    loadInfo();
  }, []);

  // si el arreglo es vacio siempre se ejecutara cuando haya un renderizado
  //cada vez que mi state cambie
  useEffect(() => {
    document.title = `Weather | ${weather?.location.name ?? ""}`;
  }, [weather]);

  async function loadInfo(city = "london") {
    try {
      const request = await fetch(
        `${process.env.REACT_APP_URL}&Key=${process.env.REACT_APP_KEY}&q=${city}`
      );
      const json = await request.json();

      setWeather(json);
      console.log(json);
    } catch (error) {}
  }

  function handleChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }

  return (
    <div>
      <WeatherForm onChangeCity={handleChangeCity} />
      <div>{weather?.current.temp_c}</div>
    </div>
  );
}
