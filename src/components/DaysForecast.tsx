import React, { useEffect } from "react";
import {} from "react-icons/bs";

interface IPropType {
  dates: any[];
  icon: any[];
}

const DaysForecast: React.FC<IPropType> = ({ dates, icon }) => {
  useEffect(() => {
    if (!dates.length) return;
    console.log(!!dates);
  }, []);
  console.log(dates);

  console.log(icon);

  return (
    <div className="flex flex-row mt-10">
      {!dates.length ? (
        <p>no data</p>
      ) : (
        dates.map((item, indx) => {
          const infoicon = icon[indx];
          return (
            <>
              <div className="flex flex-col items-center p-5 group hover:bg-white hover:rounded hover:bg-opacity-25">
                <h3 className="font-extralight font-Poppins text-xl group-hover:font-bold">
                  {item}
                </h3>
                <img
                  className="py-5"
                  src={`http://openweathermap.org/img/wn/${infoicon.icon}@2x.png`}
                  alt=""
                />
                <p className="font-Poppins text-center">{infoicon.main}</p>
              </div>
            </>
          );
        })
      )}
    </div>
  );
};

export default DaysForecast;
