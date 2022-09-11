import { useReducer } from 'react'
import appContext from "./appContext"
import appReducer from './appReducer'
import axios from 'axios'
import { getCurrentDate } from '../helpers'


import {
  SELECCIONAR_DOC,
  INGRESAR_DOC,
  AGREGAR_PRODUCTOS,
  RESUMEN,
  LIMPIAR,
  CANCELAR_LEYENDA
} from '../type'

/* Definir state inicial */
const INITIAL_STATE = {
    ublVersion: "2.1",
    tipoOperacion: "0101",
    tipoDoc: null,
    serie: null,
    correlativo: null,
    fechaEmision: getCurrentDate(),
    formaPago: {
      moneda: "PEN",
      tipo: "Contado"
    },
    tipoMoneda: "PEN",
    client: {},
    company: {
      ruc: 20854253303,
      razonSocial: "Comercial Quiroz",
      nombreComercial: "Comercial Quiroz",
      address: {
        direccion: "Jr. huallaga 434.",
        provincia: "Lima",
        departamento: "Lima",
        distrito: "Lima",
        ubigeo: "150101"
      }
    },
    mtoOperGravadas: null,
    mtoIGV: null,
    valorVenta: null,
    totalImpuestos: null,
    subTotal: null,
    mtoImpVenta: null,
    details: [],
    legends: [],
};

const AppState = ({children}) => {

  const [ state, dispatch ] = useReducer(appReducer, INITIAL_STATE)
  const { tipoDoc, correlativo, company, client, details } = state

  const ingresarFacBol = (datos) => {
    try {
      dispatch({
        type: SELECCIONAR_DOC,
        payload: datos
      })
    } catch (error) {
      console.log(error)
    }
  }

  const consultarCliente = async(data) => {

    const doc = data.length <= 8 ? "dni" : "ruc"

    const tokenId = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InlhcnZpcy5qb25hQGdtYWlsLmNvbSJ9.ugfw-HGZwrHBQJA3Eo4gLrJKFMKeF_pDfDC1iHJVbM8"

    const url = `https://dniruc.apisperu.com/api/v1/${doc}/${data}?token=${tokenId}`

    const respuesta = await axios(url)
    const res = await respuesta.data
    console.log(res)

    /* Elegir el documento */

    const client = res.ruc ? {
      tipoDoc: "6",
      numDoc: Number(res.ruc),
      rznSocial: res.razonSocial,
      address: {
        direccion: res.direccion,
        provincia: res.provincia,
        departamento: res.departamento,
        distrito: res.distrito,
        ubigueo: res.ubigeo
      }
    } : {
      tipoDoc: "1",
      numDoc: Number(res.dni),
      rznSocial: res.nombres,
      address: null
    }

    try {
      dispatch({
        type: INGRESAR_DOC,
        payload: client
      })
    } catch (error) {
      console.log(error)
    }

  }

  const agregarProducto = data => {

    const {cantidad, descripcion, monto} = data

    let amount = Number(cantidad)
    let price = Number(monto)

    const producto = {
      codProducto: "CJ01",
      unidad: "NIU",
      descripcion: descripcion,
      cantidad: amount,
      mtoValorUnitario: (price/amount)/1.18,
      mtoValorVenta: (price/amount)/1.18*amount,
      mtoBaseIgv: (price/amount)/1.18*amount,
      porcentajeIgv: 18,
      igv: (price/amount)/1.18*amount*18*(1/100),
      tipAfeIgv: 10,
      totalImpuestos: (price/amount)/1.18*amount*18*(1/100),
      mtoPrecioUnitario: price/amount
    }

    try {
      dispatch({
        type: AGREGAR_PRODUCTOS,
        payload: producto
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  const agregarResumen = (data) => {
    try {
      dispatch({
        type: RESUMEN,
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }

  const resetearState = () => {
    try {
      dispatch({
        type: LIMPIAR
      })
    } catch (error) {
      console.log(error)
    }
  }

  const cancelarLeyenda = () => {
    try {
      dispatch({
        type: CANCELAR_LEYENDA
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <appContext.Provider
        value={{
          state,
          tipoDoc,
          correlativo,
          company,
          client,
          details,
          ingresarFacBol,
          consultarCliente,
          agregarProducto,
          agregarResumen,
          resetearState,
          cancelarLeyenda
        }}
    >
        {children}
    </appContext.Provider>
  )
}

export default AppState