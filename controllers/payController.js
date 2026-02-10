import { deletePaymentModel, getPaymentModel, newPaymentModel } from "../models/payModel.js";
import { estadoUserModel, getEstadoModel } from "../models/userModel.js";

export const newPayment = async(req, res) => {
    const {id} = req.params;
    try{
        const fecha_pago = new Date();

        const fecha_vencimiento = new Date(fecha_pago);
        fecha_vencimiento.setMonth(fecha_vencimiento.getMonth() + 1);

        const payData = {
            ...req.body,
            fecha_pago: fecha_pago.toISOString().split("T")[0],
            fecha_vencimiento: fecha_vencimiento.toISOString().split("T")[0]
        };

        const newPay = await newPaymentModel(id, payData);
        const userPaid = await estadoUserModel(id, {"estado":"activo"})
        res.status(201).json({newPay, userPaid});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error interno del servidor", error});
    }
}

export const getPayment = async (req, res) => {
  console.log(req.params.id);
  try {
    const payments = await getPaymentModel(req.params);
    res.status(200).json({ message: "Lista de pagos", payments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor", error });
  };
};

export const deletePayment = async(req, res)=>{
    try{
        const deletedPay = await deletePaymentModel(req.params);
        res.status(200).json(deletedPay);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"});
    };
};

export const getEstado = async(req, res)=>{
    try{
        const estadoPay = await getEstadoModel(req.params);
        res.status(200).json(estadoPay);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor"})
    }
}