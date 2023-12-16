import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Chip,
  CardFooter,
} from "@nextui-org/react";
import obtenerDiferenciaFechas from "../../helpers/ObtenerDiferenciaFechas";
import { useNavigate } from "react-router-dom";
import useVuelo from "../hooks/useVuelo";
import formatearSoloFecha from '../../helpers/FormatearSoloFecha'
import {formatearSoloHoraMinutos} from '../../helpers/formatearSoloHoraMinutos'

export default function VueloComponent({ vuelo }) {
  const { obtenerDetallesVuelo } = useVuelo()
  const navigate = useNavigate();
  const diferenciaFormateada = obtenerDiferenciaFechas(
    vuelo?.infoVuelo?.horaSalida,
    vuelo?.infoVuelo?.horaLlegada
  );
  return (
    <Card
      isPressable
      onPress={() => {navigate(`${vuelo.idVuelo}`), obtenerDetallesVuelo(vuelo._id)}}
      className="py-3"
    >
      <CardHeader className="pb-0 pt-0 px-4 flex-col items-start">
        <div className="flex w-full justify-between items-center">
          <p className="text-tiny text-foreground-400 uppercase font-bold">
            Codigo de vuelo: {vuelo.idVuelo}
          </p>
          <Image
            width={32}
            height={32}
            src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/aerolineas/${
              vuelo?.infoVuelo?.aerolinea?.imagen
            }`}
          />
        </div>
      </CardHeader>
      <CardBody className="flex-row gap-2 items-center overflow-visible py-2">
        <Image src="/fromToIcon.png" />
        <div className="space-y-3">
          <div>
            <h4 className="font-bold m-0 text-large uppercase">
              {vuelo.infoVuelo.origen.codigoIATA}{" "}
              <small>{vuelo.infoVuelo.origen.nombre}</small>
            </h4>
            <p>{formatearSoloFecha(vuelo?.infoVuelo?.fechaSalida)} {formatearSoloHoraMinutos(vuelo?.infoVuelo?.horaSalida)}</p>
            <p className="font-semibold">
              {vuelo?.infoVuelo?.origen.aeropuerto}
            </p>
          </div>
          <div className="flex gap-2 text-primary-500">
            Tiempo de vuelo:
            {diferenciaFormateada.dias > 0 && (
              <p>
                {diferenciaFormateada.dias}{" "}
                {diferenciaFormateada.días == 1 ? "día" : "días"}{" "}
              </p>
            )}
            {diferenciaFormateada.horas > 0 && (
              <p>
                {diferenciaFormateada.horas}{" "}
                {diferenciaFormateada.horas == 1 ? "hora" : "horas"}{" "}
              </p>
            )}
            {diferenciaFormateada.minutos > 0 && (
              <p>{diferenciaFormateada.minutos} minutos</p>
            )}
          </div>
          <div>
            <h4 className="font-bold m-0 text-large uppercase">
              {vuelo.infoVuelo.destino.codigoIATA}{" "}
              <small>{vuelo.infoVuelo.destino.nombre}</small>
            </h4>
            <p>{formatearSoloFecha(vuelo?.infoVuelo?.fechaSalida)} {formatearSoloHoraMinutos(vuelo?.infoVuelo?.horaLlegada)}</p>
            <p className="font-semibold">
              {vuelo?.infoVuelo?.destino.aeropuerto}
            </p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="justify-end pt-0">
        <Chip
          color={vuelo?.infoVuelo?.estado === "Pendiente"
          ? "default"
          : vuelo?.infoVuelo?.estado === "Activo"
          ? "success"
          : vuelo?.infoVuelo?.estado === "Realizado"
          ? "primary"
          : "danger"}
        >
          {vuelo.infoVuelo.estado}
        </Chip>
      </CardFooter>
    </Card>
  );
}
