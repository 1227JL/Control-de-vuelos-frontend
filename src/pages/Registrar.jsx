import React, { useState } from 'react'
import { Input, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

export default function Registrar() {

    const { alerta, setAlerta, registrar } = useAuth()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 2000);
            return
        }

        setAlerta({})

        await registrar({username, email, password})
    }

    const { msg } = alerta

    return (
        <>
            <h1 className='font-black capitalize text-center text-black-100'>Registrate</h1>
            <form className='shadow-md p-5 rounded-lg' onSubmit={handleSubmit}>
                {msg && <Alerta alerta={alerta}/>}
                <div className='mb-5'>
                    <Input onChange={e=>setUsername(e.target.value)} type="text" variant={'underlined'} label="Username" placeholder="Ingresa tu Username" />
                </div>
                <div className='mb-5'>
                    <Input onChange={e=>setEmail(e.target.value)} type="email" variant={'underlined'} label="Email" placeholder="Ingresa tu Email" />
                </div>
                <div className='mb-5'>
                    <Input onChange={e=>setPassword(e.target.value)} type="password" variant={'underlined'} label="Password" placeholder="Ingresa tu Password" />
                </div>
                <Button type='submit' fullWidth className='bg-red-a text-white'>Registrarme</Button>
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={'/dorado'}>Ya tienes una cuenta? Inicia Sesión</Link>
                <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to={'/dorado/olvide-password'}>Olvide mi password</Link>
            </nav>
        </>
    )
}
