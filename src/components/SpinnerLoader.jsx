import React from "react";
import {Spinner} from "@nextui-org/react";
import useVuelo from "../hooks/useVuelo";

export default function SpinnerLoader({alerta}) {
  return (
    <div className="flex flex-col items-center h-1/2 justify-center w-full m-auto gap-4">
      <Spinner color="danger"/>
      <p className="text-danger-500">{alerta.msg}</p>
    </div> 
  );
}