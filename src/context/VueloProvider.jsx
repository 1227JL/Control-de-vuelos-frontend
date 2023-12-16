import { createContext } from "react";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../../config/clienteAxios";
import generarID from "../../helpers/generarID";
import { useNavigate } from "react-router-dom";

const VueloContext = createContext();

const VueloProvider = ({ children }) => {
  const navigation = useNavigate();

  const { auth } = useAuth();
  const [vuelos, setVuelos] = useState([]);
  const [vuelo, setVuelo] = useState({});
  const [alerta, setAlerta] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalAsiento, setModalAsiento] = useState(false);
  const [pasajero, setPasajero] = useState({});
  const [modalVuelo, setModalVuelo] = useState(false);

  const obtenerVuelos = async () => {
    try {
      setIsLoading(true);
      setAlerta({ msg: "Obteniendo vuelos" });

      const token = await localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/vuelos", config);
      setVuelos(data);
    } catch (error) {
      setAlerta({
        msg: error.response?.data.msg || "Error al obtener los vuelos",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
      setAlerta({});
    }
  };

  useEffect(() => {
    return () => obtenerVuelos();
  }, [auth]);

  const obtenerDetallesVuelo = async (id) => {
    try {
      setIsLoading(true);
      setAlerta({ msg: `Obteniendo vuelo` });

      const token = await localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/vuelos/${id}`, config);
      setVuelo(data);
    } catch (error) {
      console.error(error);
      navigation("/dorado/admin");
    } finally {
      setIsLoading(false);
      setAlerta({});
    }
  };

  const vueloSubmit = async (vuelo) => {
    if (vuelo._id) {
      return await editarVuelo(vuelo);
    } else {
      return await crearVuelo(vuelo);
    }
  };

  const crearVuelo = async (vuelo) => {
    try {
      setIsLoading(true);
      setAlerta({
        msg: "Creando vuelo...",
      });
      const token = await localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { estado, ...dataVuelo } = vuelo?.infoVuelo;
      const idVuelo = generarID();

      setModalVuelo(false);
      const { data } = await clienteAxios.post(
        "/vuelos",
        { infoVuelo: dataVuelo, idVuelo },
        config
      );
      setAlerta({
        msg: "Vuelo Creado Exitosamente",
        status: true,
      });
      setVuelos([...vuelos, data]);
    } catch (error) {
      setAlerta({
        msg: error.response?.data.msg || "Error al crear el vuelo",
      });
      console.error(error);
    } finally {
      setTimeout(() => {
        setAlerta({});
        setIsLoading(false);
      }, 1000);
    }
  };

  const editarVuelo = async (vuelo) => {
    try {
      setIsLoading(true);
      setAlerta({
        msg: "Actualizando vuelo...",
      });
      const token = await localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      setModalVuelo(false);
      const { data } = await clienteAxios.put(
        `/vuelos/${vuelo._id}`,
        vuelo,
        config
      );
      const vuelosActualizados = vuelos.map((vueloState) =>
        vueloState._id == data._id ? data : vueloState
      );

      setVuelo(data);
      setVuelos(vuelosActualizados);
      setAlerta({
        msg: "Actualización Exitosa",
        status: true,
      });
    } catch (error) {
      setAlerta({
        msg: error.response?.data.msg || "Error al actualizar el vuelo",
      });
      console.error(error);
    } finally {
      setTimeout(() => {
        setAlerta({});
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleCancelarVuelo = async () => {
    try {
      setIsLoading(true);
      setAlerta({
        msg: "Cancelando vuelo...",
      });

      const token = await localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.get(
        `/vuelos/${vuelo._id}/cancelar`,
        config
      );
      setVuelo(data); // Asumo que `vuelo` está definido en algún lugar del componente
      const vuelosActualizados = vuelos.map((vuelo) =>
        vuelo._id == data._id ? data : vuelo
      );
      setVuelos(vuelosActualizados);
      setAlerta({
        msg: "Vuelo cancelado exitosamente",
        status: true,
      });
    } catch (error) {
      console.error(error);
      setAlerta({
        msg: error.response?.data.msg || "Error al cancelar el vuelo",
      });
    } finally {
      setTimeout(() => {
        setAlerta({});
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleModalVuelo = () => {
    if (!vuelo || Object.keys(vuelo).length === 0) {
      // Si vuelo no está definido o es un objeto vacío
      setVuelo({});
    }
  
    setModalVuelo(!modalVuelo);
  };
  

  return (
    <VueloContext.Provider
      value={{
        vuelos,
        vuelo,
        setVuelo,
        alerta,
        setAlerta,
        isLoading,
        obtenerVuelos,
        obtenerDetallesVuelo,
        vueloSubmit,
        modalAsiento,
        setModalAsiento,
        pasajero,
        setPasajero,
        modalVuelo,
        setModalVuelo,
        handleModalVuelo,
        handleCancelarVuelo,
      }}
    >
      {children}
    </VueloContext.Provider>
  );
};

export { VueloProvider };

export default VueloContext;
