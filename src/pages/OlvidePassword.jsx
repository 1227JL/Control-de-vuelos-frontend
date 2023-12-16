import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../../config/clienteAxios"
import { Button } from "@nextui-org/react"

export default function OlvidePassword() {

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(email === ''){
      setAlerta({
        msg: 'El Email es obligatorio',
        error: true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post(`/olvide-password`, {email})
      setAlerta({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className='text-black-100 font-black text-6xl capitalize text-center'>Recupera tu acceso</h1>

      <form onSubmit={handleSubmit} className='my-10 bg-white shadow-200 p-10 py-5 rounded-md'>
        {msg && <Alerta alerta={alerta}/>}
        <div className='my-5'>
          <label 
            htmlFor="email"
            className='uppercase text-gray-600 block text-sm font-bold'
          >Email</label>
          <input
            type="text" 
            id="email" 
            placeholder='Email de Registro'
            className='w-full border mt-3 p-3 rounded-xl bg-gray-50 focus:border-primary-100 outline-none'
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
        </div>

        <Button type='submit' fullWidth className='bg-red-a text-white'>Enviar instrucciones</Button>
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={'/dorado'}>¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={'/dorado/registrar'}>¿No tienes una cuenta? Regístrate</Link>
      </nav>
    </>
  )
}
