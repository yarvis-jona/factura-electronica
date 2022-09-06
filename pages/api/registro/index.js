import { dbConnect } from '../../../utils/mongoose'
import Registro from '../../../models/Registro'

dbConnect()

export default async function handler(req, res) {
  const { method, body } = req

  switch (method) {
    case "GET":
      try {
        const registros = await Registro.find()
        return res.status(200).json(registros)
        console.log(registros)
      } catch (error) {
        return res.status(400).json({ msg: error.message })
      }

    case "PUT":
      try {
        const registros = await Registro.findOneAndUpdate(body[0], body[1],{
          new: true,
          runValidators: true
        })
        return res.status(200).json(registros)
      } catch (error) {
        return res.status(400).json({msg: error.message})
      }
  }
}
