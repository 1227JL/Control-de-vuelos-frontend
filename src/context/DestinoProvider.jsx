import { createContext, useEffect, useState } from "react";
import clienteAxios from "../../config/clienteAxios";

const DestinoContext = createContext();

const DestinoProvider = ({ children }) => {
  const [destinos, setDestinos] = useState([]);
  const [destino, setDestino] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [modalDestino, setModalDestino] = useState(false);

  useEffect(() => {
    const obtenerDestinos = async () => {
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

        setIsLoading(true);
        setAlerta({
          msg: "Obteniendo destinos",
        });

        const { data } = await clienteAxios("/destinos", config);
        setDestinos(data);
      } catch (error) {
        setAlerta({
          msg: error.response?.data.msg || "Error al obtener los destinos",
        });
        console.error(error);
      } finally {
        setTimeout(() => {
          setAlerta({});
          setIsLoading(false);
        }, 1000);
      }
    };
    return () => obtenerDestinos();
  }, []);

  const submitDestino = async (destino) => {
    if(destino._id){
      await editarDestino(destino)
    }else{
      await registrarDestino(destino)
    }
  }

  const registrarDestino = async (destino) => {
    try {
      const token = await localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      };

      setIsLoading(true);
      setAlerta({
        msg: "Registrando destino",
      });

      const { data } = await clienteAxios.post("/destinos", destino, config);
      setDestinos([...destinos, data]);
    } catch (error) {
      setAlerta({
        msg: error?.response?.data?.message || "Error al registrar el destino",
      });
      console.error(error);
    } finally {
      setTimeout(() => {
        setAlerta({});
        setModalDestino(false)
        setIsLoading(false);
      }, 2000);
    }
  }

  const editarDestino = async (destino) => {
    try {
      const token = await localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      };

      setIsLoading(true);
      setAlerta({
        msg: "Actualizando destino",
      });

      const { data } = await clienteAxios.put(`/destinos/${destino._id}`, destino, config);
      const destinosActualizados = destinos.map(destinoState => destinoState._id == data._id ? data : destinoState)
      setDestinos(destinosActualizados);
    } catch (error) {
      setAlerta({
        msg: error?.response?.data?.message || "Error al actualizar el destino",
      });
      console.error(error);
    } finally {
      setTimeout(() => {
        setAlerta({});
        setModalDestino(false)
        setIsLoading(false);
      }, 2000);
    }
  }

  const handleModalDestino = (destino) => {
    if (destino) {
      setDestino(destino);
    }else{
      setDestino({})
    }
    setModalDestino(!modalDestino);
  };

  return (
    <DestinoContext.Provider
      value={{
        destinos,
        destino,
        isLoading,
        alerta,
        setAlerta,
        submitDestino,
        modalDestino,
        handleModalDestino,
      }}
    >
      {children}
    </DestinoContext.Provider>
  );
};

export { DestinoProvider };

export default DestinoContext;
