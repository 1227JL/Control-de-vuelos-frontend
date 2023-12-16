import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES
import Login from "./pages/Login";
import GestionVuelos from "./pages/GestionVuelos";

// Layouts
import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";

// PROVIDERS
import { AuthProvider } from "./context/AuthProvider";
import { StrictMode } from "react";
import { VueloProvider } from "./context/VueloProvider";
import Vuelo from "./pages/Vuelo";
import { AerolineaProvider } from "./context/AerolineaProvider";
import { DestinoProvider } from "./context/DestinoProvider";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import GestionAerolineas from "./pages/GestionAerolineas";
import GestionDestinos from "./pages/GestionDestinos";

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <VueloProvider>
            <AerolineaProvider>
              <DestinoProvider>
                <Routes>
                  <Route path="/dorado">
                    <Route element={<AuthLayout />}>
                      <Route index element={<Login />} />
                      <Route path="registrar" element={<Registrar />} />
                      <Route
                        path="olvide-password"
                        element={<OlvidePassword />}
                      ></Route>
                      <Route
                        path="olvide-password/:token"
                        element={<NuevoPassword />}
                      ></Route>
                      <Route
                        path="confirmar/:token"
                        element={<ConfirmarCuenta />}
                      ></Route>
                    </Route>
                    <Route path="admin" element={<RutaProtegida />}>
                      <Route index path="vuelos" element={<GestionVuelos />} />
                      <Route
                        index
                        path="vuelos/:codvuelo"
                        element={<Vuelo />}
                      />
                      <Route
                        path="aerolineas"
                        element={<GestionAerolineas/>}
                      />
                      <Route
                        path="destinos"
                        element={<GestionDestinos/>}
                      />
                    </Route>
                  </Route>
                </Routes>
              </DestinoProvider>
            </AerolineaProvider>
          </VueloProvider>
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
