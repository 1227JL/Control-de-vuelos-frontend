import React from "react";
import useAerolinea from "../hooks/useAerolinea";
import AerolineaComponent from "../components/AerolineaComponent";
import { Tooltip, Button } from "@nextui-org/react";
import ModalAerolinea from "../components/ModalAerolinea";
import SpinnerLoader from "../components/SpinnerLoader";

export default function GestionAerolineas() {
  const { isLoading, aerolineas, alerta, handleModalAerolinea } =
    useAerolinea();

  if (isLoading) return <SpinnerLoader alerta={alerta} />;
  return (
    <>
      <div className="p-5 bg-white">
        <div className="flex justify-between">
          <h1 className="text-2xl">Aerolineas</h1>
          <Tooltip content="Registrar aerolinea">
            <Button
              onPress={handleModalAerolinea}
              isIconOnly
              variant="bordered"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Button>
          </Tooltip>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          {aerolineas?.map((aerolinea) => (
            <AerolineaComponent key={aerolinea._id} aerolinea={aerolinea} />
          ))}
        </div>
      </div>
      <ModalAerolinea />
    </>
  );
}
