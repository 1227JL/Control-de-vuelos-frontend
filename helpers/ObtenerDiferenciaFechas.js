export default function obtenerDiferenciaFechas(fecha1, fecha2) {
  const primeraFecha = new Date(fecha1);
  const segundaFecha = new Date(fecha2);

  const milisegundosEnUnMinuto = 60 * 1000;
  const milisegundosEnUnaHora = 60 * milisegundosEnUnMinuto;
  const milisegundosEnUnDia = 24 * milisegundosEnUnaHora;

  // Obtener la diferencia en milisegundos
  const diferenciaEnMilisegundos = Math.abs(primeraFecha - segundaFecha);

  // Calcular la diferencia en días, horas y minutos
  const dias = Math.floor(diferenciaEnMilisegundos / milisegundosEnUnDia);
  const horas = Math.floor((diferenciaEnMilisegundos % milisegundosEnUnDia) / milisegundosEnUnaHora);
  const minutos = Math.floor((diferenciaEnMilisegundos % milisegundosEnUnaHora) / milisegundosEnUnMinuto);

  return { dias, horas, minutos };
}