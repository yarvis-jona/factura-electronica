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
      <h3>Ingresar datos</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          type='text' 
          placeholder='Ingresa ruc o dni' 
          {...register('documento')}
        />
        <button type='submit' onClick={ () => router.push('/documento')}>Enviar</button>
      </form>
    </Layout>
  )
}

export default Contacto