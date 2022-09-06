import { useContext } from 'react'
import appContext from '../context/appContext'

const Tabla = ({setModal2}) => {

    const AppContext = useContext(appContext)
    const {details, agregarResumen} = AppContext

    const subTotal = details.map(det => det.mtoValorVenta)
    const subtotalres = subTotal.length > 0 ? subTotal.reduce((a,b) => a + b) : 0

    const igv = details.map(det => det.igv)
    const igvres = igv.length > 0 ? igv.reduce((a,b) => a + b) : 0

    const total = details.map(det => det.mtoPrecioUnitario*det.cantidad)
    const totalres = total.length > 0 ? total.reduce((a,b) => a + b) : 0

    /* agregando los resumenes total y el segundo modal */
    const datosFinales = () => {
        agregarResumen({subtotalres, igvres, totalres})
        setModal2(true)
    }

  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Cantidad</th>
                    <th>Descripción</th>
                    <th>(S/.) Valor Unitario</th>
                    <th>(S/.) Valor Total</th>
                </tr>
            </thead>
            <tbody>
                {details.map((detail, i) => (
                    <tr key={i}>
                        <td>{detail.cantidad}</td>
                        <td>{detail.descripcion}</td>
                        <td>{detail.mtoValorUnitario.toFixed(4)}</td>
                        <td>{detail.mtoValorVenta.toFixed(4)}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="3">SUBTOTAL (S/.)</td>
                    <td>{subtotalres.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colSpan="3">IGV (S/.)</td>
                    <td>{igvres.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colSpan="3">TOTAL (S/.)</td>
                    <td>{totalres.toFixed(2)}</td>
                </tr>
                
            </tfoot>
        </table>
        <hr />
        <button 
            onClick={ () => datosFinales() }
        >
            Emitir
        </button>
    </div>
  )
}

export default Tabla