import React, { useState, useEffect, useRef } from "react";
import DaysForecast from "./components/DaysForecast";
import PlaceInfo from "./components/PlaceInfo";
import WeatherInfo from "./components/WeatherInfo";

const ApiKey = process.env.REACT_APP_GMAP_API_KEY;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";

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

function App() {
  const initMapScript = () => {
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${ApiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);

  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
  };

  const searchInput = useRef(null);
  const [city, setCity] = useState("");
  const inputHandler = (e: any) => {
    setCity(e.target.value);
  };
  return (
    <div className="bg-main bg-cover bg-no-repeat bg-center h-[100vh] flex">
      <div className="p-10 w-full md:w-1/2">
        <PlaceInfo temperature="23" dateTime="Tue, 05 Apr" place={city} />
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
