import { getPreferenceClient, getPaymentClient } from "../config/mercadopago.js";
import Pago from "../schemas/paySchema.js";
import Usuario from "../schemas/userSchema.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function crearPreferenciaModel(usuarioId, monto, titulo) {
  const montoFinal = Number(monto) < 100 ? 2000 : Number(monto);
  const preference = getPreferenceClient();

  const response = await preference.create({
    body: {
      items: [
        {
          title: String(titulo || "Plan Numeris"),
          quantity: 1,
          unit_price: montoFinal,
          currency_id: "COP",
        },
      ],
      back_urls: {
        success: "http://localhost:5173/pagos/exito",
        failure: "http://localhost:5173/pagos/fallo",
        pending: "http://localhost:5173/pagos/pendiente",
      },
      auto_return: "approved",
      external_reference: usuarioId.toString(),
    },
  });

  const nuevoPago = new Pago({
    user_id: new mongoose.Types.ObjectId(usuarioId.toString()),
    amount: montoFinal,
    method: "mercadopago",
    descripcion: titulo || "Plan Numeris",
    estado: "pendiente",
    mpPreferenceId: response.id,
  });
  await nuevoPago.save();

  await Usuario.collection.updateOne(
    { _id: new mongoose.Types.ObjectId(usuarioId.toString()) },
    { $set: { status: "activo" } }
  );

  return {
    init_point: response.init_point,
    sandbox_init_point: response.sandbox_init_point,
    id: response.id,
  };
}

export async function recibirNotificacionModel(topic, paymentId) {
  if (topic !== "payment") return;

  const paymentClient = getPaymentClient();
  const payment = await paymentClient.get({ id: paymentId });

  if (payment.status === "approved") {
    const pago = await Pago.findOneAndUpdate(
      { mpPreferenceId: payment.preference_id },
      { estado: "aprobado", mpPaymentId: paymentId },
      { new: true }
    );

    if (pago) {
      await Usuario.collection.updateOne(
        { _id: new mongoose.Types.ObjectId(pago.user_id.toString()) },
        { $set: { status: "activo" } }
      );
    }
  }
}

export async function verificarPagoModel(paymentId) {
  const paymentClient = getPaymentClient();
  const payment = await paymentClient.get({ id: paymentId });

  if (payment.status !== "approved") {
    return { success: false, status: payment.status, usuario: null };
  }

  const pago = await Pago.findOneAndUpdate(
    { mpPreferenceId: payment.preference_id },
    { estado: "aprobado", mpPaymentId: paymentId },
    { new: true }
  );

  let usuarioActualizado = null;
  if (pago) {
    await Usuario.collection.updateOne(
      { _id: new mongoose.Types.ObjectId(pago.user_id.toString()) },
      { $set: { status: "activo" } }
    );
    usuarioActualizado = await Usuario.findById(pago.user_id);
  }

  return { success: true, status: "approved", usuario: usuarioActualizado };
}