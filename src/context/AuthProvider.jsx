import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);

      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios.get("/perfil", config);
        setAuth(data);

        if(location.pathname == '/dorado' && data.rol == 'Administrador'){
          navigate('/dorado/admin/vuelos')
        }else if(location.pathname == '/dorado' && data.rol != 'Administrador'){
          navigate('/dorado/inicio')
        }else if(location.pathname.includes('/dorado/admin') && data.rol != 'Administrador'){
          navigate('/dorado/inicio')
        }
       
      } catch (error) {
        setAuth({});
        console.log(error);
        navigate("/dorado");
      } finally {
        setLoading(false);
      }
    };
    return () => {
      autenticarUsuario();
    };
  }, []);

  const registrar = async (user) => {
    try {
      await clienteAxios.post("/", user);

      setAlerta({
        msg: "Usuario registrado exitosamente, confirma tu cuenta",
        error: false,
      });
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
  };

  const autenticar = async (credentials) => {
    try {
      const { data } = await clienteAxios.post("/login", credentials);
      localStorage.setItem("token", data.token);
      setAuth(data);

      if (data.rol == "Administrador") {
        navigate("/dorado/admin/vuelos");
      } else {
        navigate("/dorado/inicio");
      }
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setTimeout(() => {
        setAlerta({});
      }, 2000);
    }
  };

  const cerrarSesionAuth = () => {
    setAuth({});
    localStorage.removeItem("token");
    navigate("/dorado");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        alerta,
        loading,
        setAlerta,
        autenticar,
        registrar,
        cerrarSesionAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
