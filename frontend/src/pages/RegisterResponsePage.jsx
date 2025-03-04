import React from 'react'
import { Link } from 'react-router-dom'

function RegisterResponsePage() {
  return (
    <div className='w-full h-[70vh] flex flex-col justify-center items-center gap-8'>
      <h1 className='text-4xl text-emerald-600 dark:text-emerald-300'>Enviamos un mensaje de confirmación al correo con el que te registraste</h1>
      <Link to='/' className='btn btn-outline border-emerald-600 dark:border-emerald-300 hover:bg-emerald-600 dark:hover:bg-emerald-300'>Volver al inicio</Link>
    </div>
  )
}

export default RegisterResponsePage