import React from "react";
interface PropType {
  infos: Array<{ label: string; value: number }>;
}

const WeatherInfo: React.FC<PropType> = ({ infos }) => {
  return (
    <div className="flex flex-row items-center justify-center md:justify-start">
      {infos.map((inf, idx) => (
        <div className="flex flex-col p-5" key={idx}>
          <h4 className="font-Poppins font-light text-lg text-center">
            {inf.label}
          </h4>
          <span
            className="font-Poppins font-medium text-xl pt-2 text-center"
            key={idx}
          >
            {inf.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default WeatherInfo;
