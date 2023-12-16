import React from "react";
import { Card, Image, Button, CardFooter } from "@nextui-org/react";
import useDestino from "../hooks/useDestino";

export default function DestinoComponent({ destino }) {
  const { handleModalDestino } = useDestino()
  return (
    <Card isPressable radius="lg" onPress={()=>handleModalDestino(destino)} className="border-none h-36">
      <Image
        alt={`Imagen ciudad ${destino.nombre}`}
        className=" object-contain"
        src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/destinos/${
          destino?.imagen
        }`}
      />
      <CardFooter className="before:bg-white/10 overflow-hidden py-1 absolute before:rounded-xl rounded-large top-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-xl text-white font-bold">{destino.nombre}</p>
      </CardFooter>
    </Card>
  );
}
