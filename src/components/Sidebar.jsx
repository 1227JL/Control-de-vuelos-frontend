import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="text-white lg:w-1/5 px-8 py-5 h-full">
      <ul className="flex flex-col gap-2 h-full">
        <Link to={"vuelos"}>
          <li
            className={`${
              location.pathname.includes("vuelos") ? "bg-bg-transparent" : ""
            } text-center lg:text-left p-3 rounded-lg hover:bg-bg-transparent hover:shadow transition-shadow`}
          >
            Vuelos
          </li>
        </Link>
        <Link to={"aerolineas"}>
          <li
            className={`${
              location.pathname.includes("aerolineas")
                ? "bg-bg-transparent"
                : ""
            } text-center lg:text-left p-3 rounded-lg hover:bg-bg-transparent hover:shadow transition-shadow`}
          >
            Aerolineas
          </li>
        </Link>
        <Link to={"destinos"}>
          <li
            className={`${
              location.pathname.includes("destinos") ? "bg-bg-transparent" : ""
            } text-center lg:text-left p-3 rounded-lg hover:bg-bg-transparent hover:shadow transition-shadow`}
          >
            Destinos
          </li>
        </Link>
        <Link to={"usuarios"}>
          <li
            className={`${
              location.pathname.includes("usuarios") ? "bg-bg-transparent" : ""
            } text-center lg:text-left p-3 rounded-lg hover:bg-bg-transparent hover:shadow transition-shadow`}
          >
            Usuarios
          </li>
        </Link>
      </ul>
    </div>
  );
}
