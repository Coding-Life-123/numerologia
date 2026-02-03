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
            enum: ["card", "cash", "trasnfer"],
            required: true
        },
        payment_date:{
            type: Date,
            default: Date.now,
            required: true
        },
        expire_date:{
            type: Date,
            required: true
        }
    },
    {
        timestamps:true
    }
)