import React, { useEffect } from "react";
import DaysForecast from "./DaysForecast";
import WeatherInfo from "./WeatherInfo";
import moment from "moment";

interface PropType {
  temperature: any;
  dateTime: any;
  place: string;
  forecast: any[];
}
const PlaceInfo: React.FC<PropType> = ({
  temperature,
  dateTime,
  place,
  forecast,
}) => {
  useEffect(() => {
    if (!forecast.length) return;
    console.log(!!forecast);
  }, []);

  const Infos = [
    { label: "Wind Speed", value: temperature.wind_speed },
    { label: "UV", value: temperature.uvi },
    { label: "Humidity", value: temperature.humidity },
  ];

  const dts = forecast.map(({ dt }) => {
    return moment.unix(dt).startOf("day").format("ddd");
  });

  let allIcon: String[] = [];
  const icon = forecast.map(({ weather }) => {
    weather.map((e: any) => {
      allIcon.push(e);
    });
  });

  // const getIcon = () => {
  //   if (!forecast) return;
  //   const icon = forecast.map(({ weather }) => {
  //     weather.map((e: any) => {
  //       setIcon(e.icon);
  //       console.log(icons);
  //     });
  //   });
  // };

  return (
    <div>
      <div className="flex flex-row items-center">
        {temperature?.temp ? (
          <h2 className="font-Poppins font-bold text-8xl pr-5">
            {Math.round(temperature?.temp)}&deg;
          </h2>
        ) : (
          <h2 className="font-Poppins font-bold text-8xl pr-5">00&deg;</h2>
        )}
        <div className="flex flex-col">
          <p className="font-Poppins font-extralight text-2xl">{dateTime}</p>
          <p className="font-Poppins font-normal text-4xl">
            {!place ? "Please Select City" : place}
          </p>
        </div>
      </div>
      <DaysForecast dates={dts} icon={allIcon} />
      <WeatherInfo infos={Infos} />
    </div>
  );
};

export default PlaceInfo;
