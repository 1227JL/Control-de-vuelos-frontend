import React from "react";

const AirplaneSeat = ({ numRef, handleModalAsiento, pasajeros }) => {
    const pasajeroConAsiento = pasajeros?.find((pasajero) => pasajero?.asiento === numRef);
  
  return (
    <div className={`${pasajeroConAsiento ? 'bg-red-a text-white' : 'bg-gray-300' } flex items-center justify-center h-12 w-12 sm:h-16 sm:w-20 p-2 rounded-md`}>
        <p>{numRef}</p>
    </div>
  );
};


export default AirplaneSeat;
