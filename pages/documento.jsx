import { useContext, useState, useEffect, useCallback } from 'react'
import appContext from '../context/appContext'
import Layout from "../components/layout"
import Tabla from '../components/tabla'
import FormModal from '../components/formModal'
import ConfirmarEmision from '../components/confirmarEmision'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    backgroundColor: '#757575',
    boxShadow: '0px 9px 14px -5px rgba(0,0,0,0.42)'
  },
};

const customStyles2 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    backgroundColor: '#FFEE58',
    boxShadow: '0px 9px 14px -5px rgba(0,0,0,0.42)'
  },
};

Modal.setAppElement('#__next');

const Documento = () => {

  const AppContext = useContext(appContext)
  const { tipoDoc, company, client, agregarProducto } = AppContext

  

  /* Modal */
  const [ modal, setModal ] = useState(false)
  const [ modal2, setModal2 ] = useState(false)
  const [ producto, setProducto ] = useState({})

  const ejecutarAgregarProducto = useCallback( () => {
    agregarProducto(producto)
  }, [producto])

  useEffect( () => {
    if(producto?.monto){
      ejecutarAgregarProducto()
    }
  }, [producto, ejecutarAgregarProducto])


  return (
    <Layout>
        <div>
          <h3 className='centro p-xy fuente fuente-familia-titulo fuente-xl fuente-primary border-botton'>Datos de la Empresa</h3>
          <div className='contenedor-div mt-1'>
            <div>
              <p className='fuente fuente-familia-contenido fuente-xl fuente-bold'>{company.razonSocial}</p>
              <p className='fuente fuente-familia-contenido fuente-l'>{company.address.direccion}</p>
            </div>
            <div className='centro borde-1 p-xy'>
              <p className='fuente fuente-familia-contenido fuente-xl fuente-bold'>{ tipoDoc === "01" ? "Factura Electronica" : "Boleta de venta"}</p>
              <p className='fuente fuente-familia-titulo fuente-xl'>RUC</p>
              <p className='fuente fuente-familia-contenido fuente-xl'>{company.ruc}</p>
            </div>
          </div>
          
        </div>
        <div>
          <h3 className='border-botton centro mt-1 p-xy fuente fuente-familia-titulo fuente-xl fuente-primary'>Datos del cliente</h3>
          <div className='centro p-xy mt-1'>
            <p className='fuente fuente-familia-contenido fuente-xl fuente-info-1 fuente-bold'>{client.rznSocial}</p>
            <p className='fuente fuente-familia-contenido fuente-xl fuente-bold mt-1'>{client.numDoc}</p>
          </div>
        </div>
        <div className='centro p-xy border-botton'>
          <button className='custom-btn btn-1 fuente fuente-familia-titulo fuente-l fuente-secundary' onClick={ () => setModal(true) }>Agregar Producto</button>
        </div>
        
        <Tabla setModal2={setModal2}/>

        {modal && (
          <Modal
            isOpen={modal}
            style={customStyles}
          >
            <FormModal setModal={setModal} setModal2={setModal2} setProducto={setProducto}/>
          </Modal>
        )}

        {modal2 && (
          <Modal
            isOpen={modal2}
            style={customStyles2}
          >
            <ConfirmarEmision setModal2={setModal2} />
          </Modal>
        )}
    </Layout>
  )
}

export default Documento