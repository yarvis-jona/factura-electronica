import { Schema, model, models } from 'mongoose'

const RegistroSchema = new Schema(
    {
        count_factura: {
            type: Number,
            required: true,
        },
        count_boleta: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default models.Registro || model("Registro", RegistroSchema)
