import React from "react";
import {
  BsFillSunFill,
  BsFillCloudLightningRainFill,
  BsFillCloudSunFill,
  BsFillCloudRainHeavyFill,
  BsFillCloudHaze2Fill,
  BsFillCloudFog2Fill,
  BsFillCloudFill,
} from "react-icons/bs";

const DaysForecast = () => {
  let Week = [
    { day: "Mon", icon: <BsFillSunFill />, temp: "32" },
    { day: "Tue", icon: <BsFillCloudLightningRainFill />, temp: "32" },
    { day: "Wed", icon: <BsFillCloudSunFill />, temp: "32" },
    { day: "Thu", icon: <BsFillCloudRainHeavyFill />, temp: "32" },
    { day: "Fri", icon: <BsFillCloudHaze2Fill />, temp: "32" },
    { day: "Sat", icon: <BsFillCloudFill />, temp: "32" },
    { day: "Sun", icon: <BsFillCloudFog2Fill />, temp: "32" },
  ];
  return (
    <div className="flex flex-row mt-10">
      {Week.map((weekdays, idx) => (
        <div className="flex flex-col items-center p-5 group hover:bg-white hover:rounded hover:bg-opacity-25">
          <h3 className="font-extralight font-Poppins text-xl group-hover:font-bold">
            {weekdays.day}
          </h3>
          <p className="text-white text-4xl py-10 flex items-center justify-center group-hover:text-yellow-600">
            {weekdays.icon}
          </p>
          <p className="font-Poppins text-center">{weekdays.temp}&deg;</p>
        </div>
      ))}
    </div>
  );
};

export default DaysForecast;
