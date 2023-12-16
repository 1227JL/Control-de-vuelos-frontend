export default function formatearSoloFecha(fecha) {
    const fechaLocal = new Date(fecha);
    const fechaFormateada = fechaLocal.toLocaleDateString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  
    return fechaFormateada;
  }
  