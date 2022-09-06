import axios from 'axios'
import { useContext } from 'react'
import appcontext from '../context/appContext'
import clienteAxios from '../axios/axios'
import tokenSend from '../axios/token'
import { useRouter } from 'next/router'

const ConfirmarEmision = ({setModal2}) => {

    const AppContext = useContext(appcontext)
    const { state, tipoDoc, correlativo, resetearState } = AppContext

    const router = useRouter()

    /* Modificar la base de datos */
    const actualizarCorrelativo = async () => {
        const relativo = Number(correlativo)

        const filtro = tipoDoc === "01" ? {count_factura: relativo - 1} : {count_boleta: relativo - 1}

        const cuerpo = tipoDoc === "01" ? {count_factura: relativo} : {count_boleta: relativo}
        /* mandar la peticion de actualizacion a la api */
        await axios.put('/api/registro', [filtro, cuerpo])
    }

    /* Confirmar el envio del documento(boleta o factura) */
    const confirmarFacBol = async() => {
        /* Obtener el token desde next.config env */
        const token = process.env.TOKEN
        /* Mandar el token al cliente axios */
        if(token){
            tokenSend(token)
        }

        try {
            /* Mandar la peticion del documento (boleta o factura) */
            const respuesta = await clienteAxios.post('/invoice/send', state)
            const { success } = respuesta.data.sunatResponse
            console.log(respuesta.data.sunatResponse)

            if(success === true){
                /* Configuracio para obetener el pdf */
                const archivo = await clienteAxios.post('/invoice/pdf', state, {responseType: 'blob', headers:{'Accept': 'application/pdf'}})
                const blob = new Blob([archivo.data])
                const url = window.URL.createObjectURL(blob)
                
                /* mostrar el pdf */
                window.open(url)

                /* Modificar la base de datos */
                actualizarCorrelativo()

                /* Resetear para hacer un nuevo documento */
                resetearState()

                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const cancelarFacBol = () => {
        setModal2(false)
    }

  return (
    <div>
        <p>¿Estas seguro de emitir el documento?</p>
        <div>
            <button onClick={ () => cancelarFacBol() }>Cancelar</button>
            <button onClick={ () => confirmarFacBol() }>Confirmar</button>
        </div>
    </div>
  )
}

export default ConfirmarEmision