import { numeroALetras } from '../helpers'

import {
    SELECCIONAR_DOC,
    INGRESAR_DOC,
    AGREGAR_PRODUCTOS,
    RESUMEN,
    LIMPIAR,
    CANCELAR_LEYENDA
} from '../type'

const appReducer = (state, action) => {
    switch (action.type) {
        case SELECCIONAR_DOC:
            const {tipoDoc, serie, correlativo} = action.payload
            return{
                ...state,
                correlativo: correlativo.toString(),
                tipoDoc,
                serie
            }
        case INGRESAR_DOC:
            return {
                ...state,
                client: action.payload
            }
        case AGREGAR_PRODUCTOS:
            return{
                ...state,
                details: [...state.details, action.payload]
            }
        case RESUMEN:
            const {subtotalres, igvres, totalres} = action.payload
            return{
                ...state,
                mtoOperGravadas: subtotalres,
                mtoIGV: igvres,
                valorVenta: subtotalres,
                totalImpuestos: igvres,
                subTotal: totalres,
                mtoImpVenta: totalres,
                legends: [{code: "1000", value: numeroALetras(totalres, 'PEN')}]
            }
        case LIMPIAR:
            return {
                ...state,
                tipoDoc: null,
                serie: null,
                correlativo: null,
                client: {},
                mtoOperGravadas: null,
                mtoIGV: null,
                valorVenta: null,
                totalImpuestos: null,
                subTotal: null,
                mtoImpVenta: null,
                details: [],
                legends: []
            }
        case CANCELAR_LEYENDA:
            return {
                ...state,
                legends: []
            }
        default:
            return state;
    }
}

export default appReducer