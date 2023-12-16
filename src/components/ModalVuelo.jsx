import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import useVuelo from "../hooks/useVuelo";
import useAerolinea from "../hooks/useAerolinea";
import useDestino from "../hooks/useDestino";
import Alerta from "../components/Alerta"; // Asegúrate de importar el componente Alerta
import estadosVuelo from "../data/estadosVuelo";

export default function ModalVuelo() {
  const {
    vuelo,
    alerta,
    setAlerta,
    modalVuelo,
    handleModalVuelo,
    vueloSubmit,
  } = useVuelo();
  const { aerolineas } = useAerolinea();
  const { destinos } = useDestino();

  const [id, setId] = useState("");
  const [aerolinea, setAerolinea] = useState("");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const [fechaLlegada, setFechaLlegada] = useState("");
  const [horaLlegada, setHoraLlegada] = useState("");
  const [estado, setEstado] = useState("");

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (Object.keys(vuelo).length !== 0) {
      setId(vuelo?._id);
      setAerolinea(vuelo?.infoVuelo?.aerolinea?._id);
      setOrigen(vuelo?.infoVuelo?.origen?._id);
      setDestino(vuelo?.infoVuelo?.destino?._id);
      setFechaSalida(formatDate(new Date(vuelo?.infoVuelo?.fechaSalida)));
      setFechaLlegada(formatDate(new Date(vuelo?.infoVuelo?.fechaLlegada)));
      setHoraSalida(new Date(vuelo?.infoVuelo?.horaSalida));
      setHoraLlegada(new Date(vuelo?.infoVuelo?.horaLlegada));
      setEstado(vuelo?.infoVuelo?.estado);
    } else {
      setId("");
      setAerolinea("");
      setOrigen("");
      setDestino("");
      setFechaSalida("");
      setFechaLlegada("");
      setHoraSalida("");
      setHoraLlegada("");
      setEstado("");
    }
  }, [vuelo]);

  const onChangeTimeSalida = (e) => {
    const selectedTime = e.target.value;

    if (selectedTime) {
      const [hours, minutes] = selectedTime.split(":");
      const updatedDate = new Date(horaSalida);
      updatedDate.setHours(parseInt(hours, 10));
      updatedDate.setMinutes(parseInt(minutes, 10));
      setHoraSalida(updatedDate);
    }
  };

  const onChangeTimeLlegada = (e) => {
    const selectedTime = e.target.value;

    if (selectedTime) {
      const [hours, minutes] = selectedTime.split(":");
      const updatedDate = new Date(horaLlegada);
      updatedDate.setHours(parseInt(hours, 10));
      updatedDate.setMinutes(parseInt(minutes, 10));
      setHoraLlegada(updatedDate);
    }
  };

  const formattedHoraSalida = horaSalida
    ? `${horaSalida?.getHours().toString().padStart(2, "0")}:${horaSalida
        ?.getMinutes()
        .toString()
        .padStart(2, "0")}`
    : "";

  const formattedHoraLlegada = horaLlegada
    ? `${horaLlegada?.getHours().toString().padStart(2, "0")}:${horaLlegada
        ?.getMinutes()
        .toString()
        .padStart(2, "0")}`
    : "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [
        aerolinea,
        origen,
        destino,
        fechaSalida,
        horaSalida,
        fechaLlegada,
        horaLlegada,
      ].includes("")
    ) {
      return setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
    }

    await vueloSubmit({
      _id: id,
      idVuelo: vuelo?._id,
      infoVuelo: {
        aerolinea,
        origen,
        destino,
        fechaSalida,
        fechaLlegada,
        horaSalida: horaSalida.toISOString(), // Formatea la hora al formato deseado
        horaLlegada: horaLlegada.toISOString(), // Formatea la hora al formato deseado
        estado,
      },
    });
  };

  const propsAerolinea = {};
  const propsOrigen = {};
  const propsDestino = {};

  if (id) {
    propsAerolinea.defaultSelectedKeys = [aerolinea];
    propsOrigen.defaultSelectedKeys = [origen];
    propsDestino.defaultSelectedKeys = [destino];
  }

  const { msg, error } = alerta;

  return (
    <Modal backdrop="opaque" isOpen={modalVuelo} onClose={handleModalVuelo}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-0">
              Crear Vuelo
            </ModalHeader>
            <ModalBody>
              {msg && error != undefined && <Alerta alerta={alerta} />}
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <Select
                  {...propsAerolinea}
                  label="Aerolínea vuelo"
                  onChange={(e) => setAerolinea(e.target.value)}
                  placeholder="Seleccione una aerolínea"
                >
                  {aerolineas.map((option) => (
                    <SelectItem key={option._id} value={option._id}>
                      {option.nombre}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  {...propsOrigen}
                  label="Origen vuelo"
                  onChange={(e) => setOrigen(e.target.value)}
                  disabledKeys={[destino] || []}
                  placeholder="Seleccione una ciudad de origen"
                >
                  {destinos.map((option) => (
                    <SelectItem key={option._id} value={option._id}>
                      {option.nombre}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  type="date"
                  label="Fecha salida"
                  value={fechaSalida}
                  onChange={(e) => setFechaSalida(e.target.value)}
                  placeholder="Seleccione una fecha"
                  bordered
                  clearable
                />

                <Input
                  type="time"
                  label="Hora salida"
                  value={formattedHoraSalida} // Formatea la fecha como "HH:mm"
                  onChange={onChangeTimeSalida}
                  placeholder="Seleccione una hora de salida"
                  bordered
                  clearable
                />

                <Select
                  {...propsDestino}
                  label="Destino vuelo"
                  onChange={(e) => setDestino(e.target.value)}
                  disabledKeys={[origen] || []}
                  placeholder="Seleccione una ciudad de destino"
                >
                  {destinos.map((option) => (
                    <SelectItem key={option._id} value={option._id}>
                      {option.nombre}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  type="date"
                  label="Fecha llegada"
                  value={fechaLlegada}
                  onChange={(e) => setFechaLlegada(e.target.value)}
                  placeholder="Seleccione una fecha"
                  bordered
                  clearable
                />

                <Input
                  type="time"
                  label="Hora llegada"
                  value={formattedHoraLlegada} // Formatea la fecha como "HH:mm"
                  onChange={onChangeTimeLlegada}
                  placeholder="Seleccione una hora de llegada"
                  bordered
                  clearable
                />

                {id && (
                  <div className="w-full flex flex-col justify-center gap-4 md:col-span-2">
                    <div className="flex w-full flex-wrap md:flex-nowrap mb-5 gap-4">
                      <Select
                        label="Selecciona un estado"
                        color={
                          estado === "Activo"
                            ? "success"
                            : estado === "Realizado"
                            ? "primary"
                            : "default"
                        }
                        onChange={(e) => setEstado(e.target.value)}
                        defaultSelectedKeys={[estado] || []}
                      >
                        {estadosVuelo.map((estado) => (
                          <SelectItem key={estado} value={estado}>
                            {estado}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                )}

                <Button
                  className="bg-red-a mb-5 text-white"
                  fullWidth
                  type="submit"
                >
                  {vuelo._id ? "Editar" : "Crear"} vuelo
                </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
