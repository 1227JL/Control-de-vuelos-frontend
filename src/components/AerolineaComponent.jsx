import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import useAerolinea from "../hooks/useAerolinea";

export default function AerolineaComponent({aerolinea}) {
  const { handleModalAerolinea } = useAerolinea()
  return (
    <Card isPressable onPress={()=>handleModalAerolinea(aerolinea)} className="py-4">
      <CardHeader className="flex-row justify-between pb-0 pt-2 px-4">
        <h4 className="font-bold text-large">{aerolinea.nombre}</h4>
        <Image
          alt="Card background"
          className="rounded-none"
          width={60}
          src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/aerolineas/${aerolinea.imagen}`}
        />
      </CardHeader>
    </Card>
  );
}
