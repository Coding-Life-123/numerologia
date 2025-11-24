import { newPaymentModel } from "../models/payModel.js";

export const newPayment = async(req, res) => {
    const {id} = req.params;
    try{
        const newPay = await newPaymentModel(id, req.body);
        res.status(201).json({newPay});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error interno del servidor"});
    }
}