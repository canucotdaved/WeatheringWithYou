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
  const [daysforecast, setDaysForecast] = useState<any[]>([]);
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState<any[]>([]);
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

  const initAutocomplete = (
    updateCity: any,
    searchInput: any,
    updateCityName: any
  ) => {
    autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current,
      { types: ["(cities)"] }
    );
    autocomplete.setFields(["place_id", "name"]);
    autocomplete.addListener("place_changed", () =>
      handlePlaceSelect(updateCity, updateCityName)
    );
  };
  async function handlePlaceSelect(updateCity: any, updateCityName: any) {
    const addressObject = autocomplete.getPlace();
    const city_id = addressObject.place_id;
    const city_name = addressObject.name;
    updateCity(city_id);
    updateCityName(city_name);
  }

  useEffect(() => {
    initMapScript().then(() =>
      initAutocomplete(setCity, searchInput, setCityName)
    );
  }, [searchInput]);

  useEffect(() => {
    if (!city) return;

    const geolink = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${city}&key=${process.env.REACT_APP_GMAP_API_KEY}`;

    const fetchLatandLon = async () => {
      await axios.get(geolink).then((res: any) => {
        setLat(res.data.results[0].geometry.location.lat);
        setLng(res.data.results[0].geometry.location.lng);
        console.log(lat, lng, `lat and long`);
      });
    };
    fetchLatandLon();
  }, [city]);

  useEffect(() => {
    if (!city) return;
    if (lat === 0 || lng === 0) return;

    const weatherApiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly,minutely&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;
    const fetchWeather = async () => {
      await axios.get(weatherApiLink).then((res: any) => {
        setWeatherData(res.data.current);
        setDaysForecast(res.data.daily);
      });
    };
    fetchWeather();
  }, [lat, lng]);

  return (
    <div className="bg-main bg-cover bg-no-repeat bg-center h-[100vh] flex">
      <div className="p-10 w-full md:w-1/2">
        <PlaceInfo
          temperature={weatherData}
          dateTime={today}
          place={cityName}
          forecast={daysforecast}
        />
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
