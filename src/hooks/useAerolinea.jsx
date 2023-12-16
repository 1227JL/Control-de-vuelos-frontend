import { useContext } from "react";
import AerolineaContext from "../context/AerolineaProvider";

export default function useAerolinea() {
  return useContext(AerolineaContext)
}
