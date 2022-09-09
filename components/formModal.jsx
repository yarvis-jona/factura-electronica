import { useForm } from 'react-hook-form'
import styles from '../styles/FormModal.module.css'

const FormModal = ({setModal, setProducto}) => {

    const { register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        setProducto(data)
        setModal(false)
    }

  return (
    <div className='fuente fuente-primary fuente-familia-contenido fuente-l'>
        <form className={styles.forma} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input 
                    type="number" 
                    placeholder="Cantidad"
                    {...register('cantidad')} 
                />
            </div>
            <div>
                <textarea 
                    className={styles.textoarea}
                    name="desc" 
                    cols="30" 
                    rows="5" 
                    placeholder="Descripción"
                    {...register('descripcion')}
                ></textarea>
            </div>
            <div>
                <input 
                    type="number"
                    step="0.01"
                    placeholder="Monto"
                    {...register('monto')} 
                />
            </div>
            <div>
                <button type="submit" >Agregar</button>
            </div>
        </form>
    </div>
  )
}

export default FormModal