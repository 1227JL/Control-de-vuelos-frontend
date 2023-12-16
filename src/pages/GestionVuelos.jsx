import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Tooltip,
} from "@nextui-org/react";
import useVuelo from "../hooks/useVuelo";
import VueloComponent from "../components/VueloComponent";
import SpinnerLoader from "../components/SpinnerLoader";
import { useEffect, useState } from "react";

export default function GestionVuelos() {
  const { isLoading, alerta, vuelos, handleModalVuelo, setVuelo} = useVuelo();
  const [filter, setFilter] = useState("");
  const [vuelosFiltrados, setVuelosFiltrados] = useState([]);

  const onchangeFilter = (e) => {
    if (e.target.dataset.key == filter) {
      setFilter("");
      setVuelosFiltrados([]);
      return;
    }
    setFilter(e.target.dataset.key);
    const vuelosFiltrados = vuelos.filter(
      (vuelo) => vuelo.infoVuelo.estado == e.target.dataset.key
    );
    setVuelosFiltrados(vuelosFiltrados);
  };

  useEffect(()=>{
    setVuelo({})
  }, [])

  if (isLoading) return <SpinnerLoader alerta={alerta} />;
  return (
    <>
      <div className="flex justify-between pt-5 px-5 bg-white">
        <h1 className="text-2xl">Vuelos {filter && `${filter}s`}</h1>
        <div className="flex gap-2">
          <Tooltip content="Crear vuelo">
            <Button isIconOnly onPress={handleModalVuelo} variant="bordered">
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
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="bordered">
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
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                endContent={
                  filter == "Pendiente" ? (
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
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    ""
                  )
                }
                onPress={onchangeFilter}
                key="Pendiente"
              >
                Vuelos Pendiente
              </DropdownItem>
              <DropdownItem
                endContent={
                  filter == "Activo" ? (
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
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    ""
                  )
                }
                onPress={onchangeFilter}
                key="Activo"
              >
                Vuelos Activos
              </DropdownItem>
              <DropdownItem
                endContent={
                  filter == "Realizado" ? (
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
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    ""
                  )
                }
                onPress={onchangeFilter}
                key="Realizado"
              >
                Vuelos Realizados
              </DropdownItem>
              <DropdownItem
                endContent={
                  filter == "Cancelado" ? (
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
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    ""
                  )
                }
                onPress={onchangeFilter}
                key="Cancelado"
              >
                Vuelos Cancelados
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="grid md:grid-cols-2 px-5 pb-5 bg-white 2xl:grid-cols-3 gap-3">
        {(filter !== "" && vuelosFiltrados.length > 0
          ? vuelosFiltrados
          : vuelos.length > 0 && filter === ""
          ? vuelos
          : []
        ).map((vuelo) => (
          <VueloComponent key={vuelo._id} vuelo={vuelo} />
        ))}

        {vuelosFiltrados.length == 0 && filter != '' && (
          <h2 className="text-xl">No hay vuelos {filter}s</h2>
        )}

        {vuelos.length == 0 && filter == '' && (
          <h2 className="text-xl">No hay vuelos</h2>
        )}
      </div>
    </>
  );
}
