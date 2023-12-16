export function obtenerSoloHora(fecha) {
  const horaSinFecha = new Date(fecha);
  horaSinFecha.setHours(fecha.getHours(), fecha.getMinutes(), 0, 0); // Configura los segundos y milisegundos a 0
  return horaSinFecha;
}

export function formatearSoloHoraMinutos(fecha) {
  const horaLocal = obtenerSoloHora(new Date(fecha));
  const horaFormateada = horaLocal.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return horaFormateada;
}
