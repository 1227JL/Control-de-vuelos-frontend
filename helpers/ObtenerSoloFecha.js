export default function obtenerSoloFecha(fecha) {
  const fechaSinHora = new Date(fecha);
  fechaSinHora.setHours(0, 0, 0, 0); // Establece la hora a las 00:00:00:000
  return fechaSinHora;
}
