export default function formatearFecha(fecha) {
  const fechaLocal = new Date(fecha);
  const fechaFormateada = `${
      fechaLocal.toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: '2-digit' })
  } ${
      fechaLocal.getUTCHours().toString().padStart(2, '0')
  }:${
      fechaLocal.getUTCMinutes().toString().padStart(2, '0')
  }`;

  return fechaFormateada;
}
