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
    color: 'black'
  },
};

Modal.setAppElement('#__next');

const Documento = () => {

  const AppContext = useContext(appContext)
  const { company, client, agregarProducto } = AppContext

  

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
        <hr />
        <div>
          <h3>Datos de la Empresa</h3>
          <p>{company.razonSocial}</p>
          <p>{company.ruc}</p>
          <p>{company.address.direccion}</p>
        </div>
        <hr />
        <div>
          <h3>Datos del cliente</h3>
          <p>{client.rznSocial}</p>
          <p>{client.numDoc}</p>
        </div>
        <hr />

        <button onClick={ () => setModal(true) }>Agregar Producto</button>

        <hr />

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
            style={customStyles}
          >
            <ConfirmarEmision setModal2={setModal2} />
          </Modal>
        )}
    </Layout>
  )
}

export default Documento