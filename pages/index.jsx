import { useContext } from "react"
import Layout from "../components/layout"
import appContext from "../context/appContext"
import { useRouter } from 'next/router'
import axios from "axios"

export default function Home() {

  /* Definiendo el context */
  const AppContext = useContext(appContext)
  const { ingresarFacBol } = AppContext

  const router = useRouter()

  const handlerDoc = async (datos) => {
    const { tipoDoc, serie } = datos

    const respuesta = await axios('/api/registro')
    const { count_boleta, count_factura } = respuesta.data[0]

    const docs =  tipoDoc === "01" ? {tipoDoc: "01", serie: "F001", correlativo: count_factura + 1 } : {tipoDoc: "03", serie: "B001", correlativo: count_boleta +1}
    
    ingresarFacBol(docs)
    // nos dirigimos a contacto
    router.push('/contacto')
  }

  return (
    <Layout>
      <div className="contenedor-centro">
        <h1 className="fuente fuente-familia-titulo fuente-xl fuente-primary">¿Cliente desea?</h1>
        <button className="custom-btn btn-1 fuente fuente-familia-contenido fuente-xl" onClick={ () => handlerDoc({tipoDoc: "01", serie: "F001"})} >Factura</button>
        <button className="custom-btn btn-1 fuente fuente-familia-contenido fuente-xl" onClick={ () => handlerDoc({tipoDoc: "03", serie: "B001"}) }>Boleta</button>
      </div>
    </Layout>
  )
}
