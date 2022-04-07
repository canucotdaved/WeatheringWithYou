import React, { useState, useEffect, useRef, useMemo } from "react";
import DaysForecast from "./components/DaysForecast";
import PlaceInfo from "./components/PlaceInfo";
import WeatherInfo from "./components/WeatherInfo";
import { format } from "date-fns";
const axios = require("axios");

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

const initAutocomplete = (updateCity: any, searchInput: any, setPhoto: any) => {
  autocomplete = new window.google.maps.places.Autocomplete(
    searchInput.current,
    { types: ["(cities)"] }
  );
  autocomplete.setFields(["name", "photo"]);
  autocomplete.addListener("place_changed", () =>
    handlePlaceSelect(updateCity, setPhoto)
  );
};

async function handlePlaceSelect(updateCity: any, setPhoto: any) {
  const addressObject = autocomplete.getPlace();
  const city = addressObject.name;
  // const image = addressObject.photos[0].getUrl({
  //   maxWidth: 1920,
  //   maxHeight: 1080,
  // });
  const arr: any = [];
  addressObject.photos.map((url: any) => {
    const img = url.getUrl({ maxWidth: 1920, maxHeight: 1080 });
    arr.push({ img });
  });
  updateCity(city);
  setPhoto(arr);
}

function App() {
  const searchInput = useRef(null);
  const [city, setCity] = useState("");
  const [mainCity, setMainCity] = useState("");
  const [photo, setPhoto] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const today = format(new Date(), "E, dd MMM");

  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`;

  const fetchData = async () => {
    try {
      if (!city) return;
      const response = await axios.get(weatherApi);
      setWeatherData(response.data);
      console.log(response.data);
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  useEffect(() => {
    initMapScript().then(() =>
      initAutocomplete(setCity, searchInput, setPhoto)
    );
    fetchData();
  }, [searchInput]);

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
        {!city ? null : (
          <h3 className="text-center font-Poppins">Some photos of {city} </h3>
        )}
        <br />
        {photo.map(({ img }: any) => {
          <p>{img}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
