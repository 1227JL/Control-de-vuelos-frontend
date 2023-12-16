export default function formatearDiferenciaFechas(diferenciaEnMilisegundos) {
    const milisegundosEnUnMinuto = 60 * 1000;
    const milisegundosEnUnaHora = 60 * milisegundosEnUnMinuto;
    const milisegundosEnUnDia = 24 * milisegundosEnUnaHora;
  
    const dias = Math.floor(diferenciaEnMilisegundos / milisegundosEnUnDia);
    const horas = Math.floor((diferenciaEnMilisegundos % milisegundosEnUnDia) / milisegundosEnUnaHora);
    const minutos = Math.floor((diferenciaEnMilisegundos % milisegundosEnUnaHora) / milisegundosEnUnMinuto);
  
    return { dias, horas, minutos };
  }
  