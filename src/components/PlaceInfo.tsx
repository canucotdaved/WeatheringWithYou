import React from "react";

interface PropType {
  temperature: any;
  dateTime: any;
  place: string;
}

const PlaceInfo: React.FC<PropType> = ({ temperature, dateTime, place }) => {
  return (
    <div className="flex flex-row items-center">
      {temperature?.main?.temp ? (
        <h2 className="font-Poppins font-bold text-8xl pr-5">
          {temperature?.main?.temp}&deg;
        </h2>
      ) : null}
      <div className="flex flex-col">
        <p className="font-Poppins font-extralight text-2xl">{dateTime}</p>
        <p className="font-Poppins font-normal text-4xl">
          {!place ? "Please Select City" : place}
        </p>
      </div>
    </div>
  );
};

export default PlaceInfo;
