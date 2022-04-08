import React, { useState, useEffect, useRef } from "react";
import DaysForecast from "./components/DaysForecast";
import PlaceInfo from "./components/PlaceInfo";
import WeatherInfo from "./components/WeatherInfo";
import { format } from "date-fns";
const axios = require("axios");
function App() {
  const searchInput = useRef(null);
  const [city, setCity] = useState("");
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [geoLink, setGeoLink] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const today = format(new Date(), "E, dd MMM");
  const ApiKey = process.env.REACT_APP_GMAP_API_KEY;
  const mapApiJs = "https://maps.googleapis.com/maps/api/js";
  let autocomplete: any;

  const loadAsyncScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      Object.assign(script, {
        type: "text/javascript",
        async: true,
        src,
      });
      script.addEventListener("load", () => resolve(script));
      document.head.appendChild(script);
    });
  };
  const initMapScript = () => {
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${ApiKey}&libraries=places`;
    return loadAsyncScript(src);
  };

  const initAutocomplete = (updateCity: any, searchInput: any) => {
    autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current,
      { types: ["(cities)"] }
    );
    autocomplete.setFields(["place_id"]);
    autocomplete.addListener("place_changed", () =>
      handlePlaceSelect(updateCity)
    );
  };
  async function handlePlaceSelect(updateCity: any) {
    const addressObject = autocomplete.getPlace();
    const city_id = addressObject.place_id;
    updateCity(city_id);
  }

  async function getLonAndLat() {
    const geoLink = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${city}&key=${process.env.REACT_APP_GMAP_API_KEY}`;
    setGeoLink(geoLink);
    const geodata = await axios.get(geoLink);
    const a = geodata.data.results[0].geometry.location.lat;
    const b = geodata.data.results[0].geometry.location.lng;
    setLat(a);
    setLng(b);
  }

  async function setWeather() {
    const weatherApiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly,minutely&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
    const weatherDataResult = await axios.get(weatherApiLink);
    setWeatherData(weatherDataResult.data);
    console.log(weatherData);
  }

  useEffect(() => {
    initMapScript().then(() => initAutocomplete(setCity, searchInput));
  }, []);

  useEffect(() => {
    if (city === "") {
      return;
    } else {
      getLonAndLat();
    }
  }, [city]);

  useEffect(() => {
    if (lng === 0 || lat === 0) {
      return;
    } else {
      setWeather();
    }
  }, [geoLink]);

  return (
    <div className="bg-main bg-cover bg-no-repeat bg-center h-[100vh] flex">
      <div className="p-10 w-full md:w-1/2">
        <PlaceInfo temperature={weatherData} dateTime={today} place={city} />
        <DaysForecast />
        <WeatherInfo />
      </div>
      <div className="p-10 w-full md:w-1/2 flex flex-col">
        <input
          type="text"
          className="border-b bg-transparent placeholder:font-Poppins text-xl focus:ring-0 font-Poppins font-light pl-5"
          placeholder="Enter City"
          ref={searchInput}
        />
        <br />
      </div>
    </div>
  );
}

export default App;
