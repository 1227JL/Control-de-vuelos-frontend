import { createContext, useEffect, useState } from "react";
import clienteAxios from "../../config/clienteAxios";

const AerolineaContext = createContext();

const AerolineaProvider = ({ children }) => {
  const [alerta, setAlerta] = useState({});
  const [aerolineas, setAerolineas] = useState([]);
  const [aerolinea, setAerolinea] = useState({});
  const [modalAerolinea, setModalAerolinea] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const obtenerAerolineas = async () => {
      setIsLoading(true);
      setAlerta({
        msg: "Obteniendo aerolineas",
      });
      try {
        const token = await localStorage.getItem("token");

        if (!token) {
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("/aerolineas", config);
        setAerolineas(data);
      } catch (error) {
        setAlerta({
          msg: error.response?.data.msg || "Error al obtener los vuelos",
        });
        console.error(error);
      } finally {
        setTimeout(() => {
          setAlerta({});
          setIsLoading(false);
        }, 1000);
      }
    };

    return () => obtenerAerolineas();
  }, []);

  const submitAerolinea = async (aerolinea) => {
    if (aerolinea._id) {
      return await editarAerolinea(aerolinea);
    } else {
      return await registrarAerolinea(aerolinea);
    }
  };

  const registrarAerolinea = async (aerolinea) => {
    try {
      const token = await localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      setAlerta({
        msg: "Registrando aerolinea",
      });
      setIsLoading(true);

      const { data } = await clienteAxios.post(
        "/aerolineas",
        aerolinea,
        config
      );
      setAerolineas([...aerolineas, data]);
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setTimeout(() => {
        setAlerta({});
        setModalAerolinea(false);
        setIsLoading(false);
      }, 1000);
    }
  };

  const editarAerolinea = async (aerolinea) => {
    try {
      const token = await localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      setAlerta({
        msg: "Actualizando aerolinea",
      });
      setIsLoading(true);

      const { data } = await clienteAxios.put(
        `/aerolineas/${aerolinea._id}`,
        aerolinea,
        config
      );

      const aerolineasActualizadas = aerolineas.map((aerolineaState) =>
        aerolineaState._id == aerolinea._id ? data : aerolineaState
      );
      setAerolineas(aerolineasActualizadas);
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error?.response?.data?.message,
        error: true,
      });
    } finally {
      setTimeout(() => {
        setAlerta({});
        setModalAerolinea(false);
        setIsLoading(false);
        setAerolinea({});
      }, 2000);
    }
  };

  const handleModalAerolinea = (aerolinea) => {
    if (aerolinea) {
      setAerolinea(aerolinea);
    }else{
      setAerolinea({})
    }
    setModalAerolinea(!modalAerolinea);
  };

  return (
    <AerolineaContext.Provider
      value={{
        alerta,
        setAlerta,
        aerolineas,
        aerolinea,
        isLoading,
        modalAerolinea,
        handleModalAerolinea,
        submitAerolinea,
      }}
    >
      {children}
    </AerolineaContext.Provider>
  );
};

export { AerolineaProvider };

export default AerolineaContext;
