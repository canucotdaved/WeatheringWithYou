import React, { useState, useEffect, useRef, useMemo } from "react";
import DaysForecast from "./components/DaysForecast";
import PlaceInfo from "./components/PlaceInfo";
import WeatherInfo from "./components/WeatherInfo";
import { format } from "date-fns";
const axios = require("axios");

const ApiKey = process.env.REACT_APP_GMAP_API_KEY;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";

let autocomplete: any;

const loadAsyncScript = (src: any) => {
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
  const src = `${mapApiJs}?key=${ApiKey}&libraries=places&v=weekly`;
  return loadAsyncScript(src);
};

const initAutocomplete = (updateCity: any, searchInput: any) => {
  autocomplete = new window.google.maps.places.Autocomplete(
    searchInput.current,
    { types: ["(cities)"] }
  );
  autocomplete.setFields(["address_component", "formatted_address"]);
  autocomplete.addListener("place_changed", () =>
    handlePlaceSelect(updateCity)
  );
};

async function handlePlaceSelect(updateCity: any) {
  const addressObject = autocomplete.getPlace();
  const city = addressObject.formatted_address;
  updateCity(city);
}

function App() {
  const searchInput = useRef(null);
  // const memoized = useMemo(searchInput => );
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  console.log(city);

  const today = format(new Date(), "E, dd MMM");

  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

  if (!!city)
    axios.get(weatherApi).then((res: any) => {
      console.log(1);
      console.log(res.data);
      console.log(searchInput);
    });

  useEffect(() => {
    initMapScript().then(() => initAutocomplete(setCity, searchInput));
  }, [city]);

  return (
    <div className="bg-main bg-cover bg-no-repeat bg-center h-[100vh] flex">
      <div className="p-10 w-full md:w-1/2">
        <PlaceInfo temperature={weatherData} dateTime={today} place={city} />
        <DaysForecast />
        <WeatherInfo />
      </div>
      <div className="p-10 w-full md:w-1/2">
        <input
          type="text"
          className="border-b bg-transparent placeholder:font-Poppins text-xl focus:ring-[1px] font-Poppins font-light pl-5"
          placeholder="Enter City"
          ref={searchInput}
        />
      </div>
    </div>
  );
}

export default App;
