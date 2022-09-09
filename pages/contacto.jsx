import { useContext } from 'react'
import Layout from "../components/layout"
import appContext from '../context/appContext'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

const Contacto = () => {

  const router = useRouter()

  const AppContext = useContext(appContext)
  const { consultarCliente } = AppContext

  const { register, handleSubmit } = useForm()

  const onSubmit = ({documento}) => {
    consultarCliente(documento)
  }

  return (
    <Layout>
      <div className='contenedor-centro'>
        <h3 className='fuente fuente-familia-titulo fuente-xl'>Ingresar datos</h3>
        <form className='mt-1' onSubmit={handleSubmit(onSubmit)}>
          <input className='p-xy fuente fuente-familia-contenido fuente-xl fuente-bold fuente-primary'
            type='text' 
            placeholder='Ingresa ruc o dni' 
            {...register('documento')}
          />
          <button className='mt-1 custom-btn btn-1 fuente fuente-familia-titulo fuente-secundary fuente bold fuente-l' type='submit' onClick={ () => router.push('/documento')}>Enviar</button>
        </form>
      </div>
    </Layout>
  )
}

export default Contacto