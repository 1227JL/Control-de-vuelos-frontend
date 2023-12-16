import React from "react";
import useDestino from "../hooks/useDestino";
import DestinoComponent from "../components/DestinoComponent";
import { Button, Tooltip } from "@nextui-org/react";
import SpinnerLoader from "../components/SpinnerLoader";
import ModalDestino from "../components/ModalDestino";

export default function GestionDestinos() {
  const { destinos, isLoading, alerta, handleModalDestino } = useDestino();

  if (isLoading) return <SpinnerLoader alerta={alerta} />;
  return (
    <>
      <div className="p-5 bg-white">
        <div className="flex justify-between">
          <h1 className="text-2xl">Destinos</h1>
          <Tooltip content="Registrar aerolinea">
            <Button onPress={handleModalDestino} isIconOnly variant="bordered">
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
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
          {destinos?.map((destino) => (
            <DestinoComponent key={destino._id} destino={destino} />
          ))}
        </div>
      </div>
      <ModalDestino/>
    </>
  );
}
