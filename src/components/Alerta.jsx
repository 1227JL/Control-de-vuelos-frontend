export default function Alerta({alerta}) {
    return (
      <div className={`${alerta.error ? 'from-red-a to-red-b' : 'from-success-400 to-success-200'} bg-gradient-to-br text-center p-3 rounded-xl text-white font-bold text-sm my-2`}>{alerta.msg}</div>
    )
}