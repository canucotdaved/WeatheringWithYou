import React from "react";

const WeatherInfo = () => {
  const infos = [
    { label: "Wind", value: "9mi" },
    { label: "UV", value: "03" },
    { label: "Humidity", value: "24%" },
    { label: "Air Quality", value: "Moderate" },
  ];
  return (
    <div className="flex flex-row items-center">
      {infos.map((inf, idx) => (
        <div className="flex flex-col p-5" key={idx}>
          <h4 className="font-Poppins font-light text-lg text-center">
            {inf.label}
          </h4>
          <span className="font-Poppins font-medium text-xl pt-2 text-center">
            {inf.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WeatherInfo;
