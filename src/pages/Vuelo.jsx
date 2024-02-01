import {
  Card,
  CardBody,
  Image,
  Chip,
  CardFooter,
  Button,
  Tooltip,
} from "@nextui-org/react";
import obtenerDiferenciaFechas from "../../helpers/ObtenerDiferenciaFechas";
import SpinnerLoader from "../components/SpinnerLoader";
import AirplaneSeat from "../components/AirplaneSeat";
import useVuelo from "../hooks/useVuelo";
import { useState } from "react";
import formatearSoloFecha from "../../helpers/FormatearSoloFecha";
import { formatearSoloHoraMinutos } from "../../helpers/formatearSoloHoraMinutos";
import ModalAsiento from "../components/ModalAsiento";

export default function Vuelo() {
  const { isLoading, alerta, vuelo, handleModalVuelo, handleCancelarVuelo, modalAsiento, setModalAsiento, pasajero, setPasajero } =
    useVuelo();

  const diferenciaFormateada = obtenerDiferenciaFechas(
    vuelo?.infoVuelo?.horaSalida,
    vuelo?.infoVuelo?.horaLlegada
  );

  const handleModalAsiento = async (numRef) => {
    setModalAsiento(!modalAsiento);

    const pasajero = vuelo?.infoVuelo?.pasajeros?.filter(
      (pasajero) => pasajero.asiento === numRef
    );

    setPasajero(pasajero[0] || numRef);
  };

  const alphabet = "ABCDEF";
  const seatsPerRow = 6; // Ajusta según tus necesidades
  const numberOfRows = 20; // Ajusta según tus necesidades

  const renderAirplaneSeatRow = (rowNumber) => {
    const seats = [];

    for (let i = 0; i < seatsPerRow; i++) {
      const seatId = `${alphabet[i]}${rowNumber + 1}`;
      seats.push(
        <AirplaneSeat
          pasajeros={vuelo?.infoVuelo?.pasajeros}
          handleModalAsiento={handleModalAsiento}
          key={seatId}
          numRef={seatId}
        />
      );
    }

    const leftSeats = seats.slice(0, seatsPerRow / 2);
    const rightSeats = seats.slice(seatsPerRow / 2);

    return (
      <div key={rowNumber} className="flex justify-between mb-2">
        <div className="flex gap-2">{leftSeats}</div>
        <div className="flex gap-2">{rightSeats}</div>
      </div>
    );
  };

  const renderAirplaneSeatRows = () => {
    const rows = [];

    for (let i = 0; i < numberOfRows; i++) {
      rows.push(renderAirplaneSeatRow(i));
    }

    return rows;
  };

  if (isLoading) return <SpinnerLoader alerta={alerta} />;
  return (
    <div className="bg-white p-5">
      <div className="lg:w-8/12 xl:w-7/12 m-auto mt-5">
        <div className="flex mb-5 justify-between items-center">
          <p className="text-xl uppercase font-bold">
            Codigo de vuelo: {vuelo.idVuelo}
          </p>
          {vuelo?.infoVuelo?.estado === "Pendiente" && (
            <div className="flex gap-2">
              <Tooltip content="Editar vuelo" color="primary">
                <Button onPress={handleModalVuelo} color="primary" isIconOnly>
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </Button>
              </Tooltip>
              <Tooltip content="Cancelar vuelo" color="danger">
                <Button onPress={handleCancelarVuelo} color="danger" isIconOnly>
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
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Button>
              </Tooltip>
            </div>
          )}
        </div>
        <Card
          onPress={() => {
            navigate(`${vuelo.idVuelo}`), obtenerDetallesVuelo(vuelo._id);
          }}
          className="py-3 w-full mb-2"
        >
          <CardBody className="flex-row gap-2 items-center overflow-visible py-2">
            <Image src="/fromToIcon.png" />
            <div className="space-y-3">
              <div>
                <h4 className="font-bold m-0 text-large uppercase">
                  {vuelo?.infoVuelo?.origen?.codigoIATA}{" "}
                  <small>{vuelo?.infoVuelo?.origen?.nombre}</small>
                </h4>
                <p>
                  {formatearSoloFecha(vuelo?.infoVuelo?.fechaSalida)}{" "}
                  {formatearSoloHoraMinutos(vuelo?.infoVuelo?.horaSalida)}
                </p>
                <p className="font-semibold">
                  {vuelo?.infoVuelo?.origen?.aeropuerto}
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
                  {vuelo?.infoVuelo?.destino?.codigoIATA}{" "}
                  <small>{vuelo?.infoVuelo?.destino?.nombre}</small>
                </h4>
                <p>
                  {formatearSoloFecha(vuelo?.infoVuelo?.fechaLlegada)}{" "}
                  {formatearSoloHoraMinutos(vuelo?.infoVuelo?.horaLlegada)}
                </p>
                <p className="font-semibold">
                  {vuelo?.infoVuelo?.destino?.aeropuerto}
                </p>
              </div>
            </div>
          </CardBody>
          <CardFooter className="justify-between pt-0">
            <div className="flex gap-2 items-center">
              <b>
                Aerolinea:{" "}
                <span className="ml-2 font-normal">
                  {vuelo?.infoVuelo?.aerolinea?.nombre}
                </span>
              </b>
              <Image
                width={25}
                height={25}
                src={`${import.meta.env.VITE_BACKEND_URL}/imagenes/aerolineas/${
                  vuelo?.infoVuelo?.aerolinea?.imagen
                }`}
              />
            </div>
            <Chip
              color={
                vuelo?.infoVuelo?.estado === "Pendiente"
                  ? "default"
                  : vuelo?.infoVuelo?.estado === "Activo"
                  ? "success"
                  : vuelo?.infoVuelo?.estado === "Realizado"
                  ? "primary"
                  : "danger"
              }
            >
              {vuelo?.infoVuelo?.estado}
            </Chip>
          </CardFooter>
        </Card>
        <section>
          <h2 className="text-xl">Asientos</h2>
          <div className="pb-10">{renderAirplaneSeatRows()}</div>
        </section>
      </div>
      <ModalAsiento pasajero={pasajero[0]} handleModalAsiento={handleModalAsiento}/>
    </div>
  );
}
