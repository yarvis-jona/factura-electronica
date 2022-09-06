import { useForm } from 'react-hook-form'

const FormModal = ({setModal, setProducto}) => {

    const { register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        setProducto(data)
        setModal(false)
    }

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input 
                    type="number" 
                    placeholder="Cantidad"
                    {...register('cantidad')} 
                />
            </div>
            <div>
                <textarea 
                    name="desc" 
                    cols="30" 
                    rows="10" 
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