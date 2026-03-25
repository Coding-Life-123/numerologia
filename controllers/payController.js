import { deletePaymentModel, getPaymentModel, newPaymentModel } from "../models/payModel.js";
import { estadoUserModel, getEstadoModel } from "../models/userModel.js";

export const newPayment = async(req, res) => {
    const {id} = req.params;
    console.log(`\n[PAGOS] INICIO: newPayment | UsuarioID: ${id} | Body:`, req.body);
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
        console.log(`[PAGOS] ÉXITO: newPayment | Pago de MongoDB registrado con _id: ${newPay._id}`);
        res.status(201).json({newPay, userPaid});
    }catch(error){
        console.log(`[PAGOS] ERROR: newPayment | UsuarioID: ${id} | Body:`, req.body, `| Detalle:`, error.message || error);
        res.status(500).json({message:"Error interno del servidor", error});
    }
}

export const getPayment = async (req, res) => {
  console.log(`\n[PAGOS] INICIO: getPayment | Params:`, req.params);
  try {
    const payments = await getPaymentModel(req.params);
    console.log(`[PAGOS] ÉXITO: getPayment | Pagos encontrados: ${payments.length || 0}`);
    res.status(200).json({ message: "Lista de pagos", payments });
  } catch (error) {
    console.log(`[PAGOS] ERROR: getPayment | Params:`, req.params, `| Detalle:`, error.message || error);
    res.status(500).json({ message: "Error interno del servidor", error });
  };
};

export const deletePayment = async(req, res)=>{
    console.log(`\n[PAGOS] INICIO: deletePayment | Params:`, req.params);
    try{
        const deletedPay = await deletePaymentModel(req.params);
        console.log(`[PAGOS] ÉXITO: deletePayment | Pago eliminado.`);
        res.status(200).json(deletedPay);
    }catch(error){
        console.log(`[PAGOS] ERROR: deletePayment | Params:`, req.params, `| Detalle:`, error.message || error);
        res.status(500).json({message: "Error interno del servidor"});
    };
};

export const getEstado = async(req, res)=>{
    console.log(`\n[PAGOS] INICIO: getEstado | UsuarioID: ${req.params.id}`);
    try{
        const estadoPay = await getEstadoModel(req.params);
        console.log(`[PAGOS] ÉXITO: getEstado | Estado obtenido exitosamente.`);
        res.status(200).json(estadoPay);
    }catch(error){
        console.log(`[PAGOS] ERROR: getEstado | UsuarioID: ${req.params.id} | Detalle:`, error.message || error);
        res.status(500).json({message: "Error interno del servidor"})
    }
}