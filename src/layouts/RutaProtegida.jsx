import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderPage from "../components/LoaderPage";
import ModalVuelo from "../components/ModalVuelo";

export default function RutaProtegida() {
  const { auth, loading } = useAuth();

  if (loading) return <LoaderPage />;
  return (
    <>
      {auth?._id && auth?.rol == "Administrador" && (
        <>
          <div className="h-screen bg-red-a">
            <Header />
            <div className="lg:flex">
              <Sidebar />
              <main className="flex-col h-screen flex-1 bg-white">
                <Outlet />
              </main>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
      <ModalVuelo />
    </>
  );
}
