import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        amount:{
            type: Number,
            required: true,
            min: 0
        },
        method:{
            type: String,
            enum: ["card", "cash", "trasnfer", "mercadopago"],
            required: true
        },
        payment_date:{
            type: Date,
            default: Date.now,
            required: true
        },
        expire_date:{
            type: Date,
            required: false
        },
        descripcion: {
            type: String
        },
        estado: {
            type: String,
            enum: ["pendiente", "aprobado", "rechazado", "fallido"],
            default: "pendiente"
        },
        mpPreferenceId: {
            type: String
        },
        mpPaymentId: {
            type: String
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model("Payment", paymentSchema);