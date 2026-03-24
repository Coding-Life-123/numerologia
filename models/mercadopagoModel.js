import { configureMercadoPago, mercadopago } from "../config/mercadopago.js";
import Pago from "../models/pagos.js";
import Usuario from "../models/usuario.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function crearPreferenciaModel(usuarioId, monto, titulo) {
  configureMercadoPago();
  const montoFinal = Number(monto) < 100 ? 2000 : Number(monto);

  const response = await mercadopago.preferences.create({
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
    external_reference: usuarioId.toString(),
  });

  const nuevoPago = new Pago({
    usuarioId: usuarioId.toString(),
    monto: montoFinal,
    descripcion: titulo || "Plan Numeris",
    estado: "pendiente",
    mpPreferenceId: response.body.id,
  });
  await nuevoPago.save();

  await Usuario.collection.updateOne(
    { _id: new mongoose.Types.ObjectId(usuarioId.toString()) },
    { $set: { estado: 1 } }
  );

  return {
    init_point: response.body.init_point,
    sandbox_init_point: response.body.sandbox_init_point,
    id: response.body.id,
  };
}

export async function recibirNotificacionModel(topic, paymentId) {
  if (topic !== "payment") return;

  configureMercadoPago();
  const payment = await mercadopago.payment.findById(paymentId);

  if (payment.body.status === "approved") {
    const pago = await Pago.findOneAndUpdate(
      { mpPreferenceId: payment.body.preference_id },
      { estado: "aprobado", mpPaymentId: paymentId },
      { new: true }
    );

    if (pago) {
      await Usuario.collection.updateOne(
        { _id: new mongoose.Types.ObjectId(pago.usuarioId) },
        { $set: { estado: 1 } }
      );
    }
  }
}

export async function verificarPagoModel(paymentId) {
  configureMercadoPago();
  const payment = await mercadopago.payment.findById(paymentId);

  if (payment.body.status !== "approved") {
    return { success: false, status: payment.body.status, usuario: null };
  }

  const pago = await Pago.findOneAndUpdate(
    { mpPreferenceId: payment.body.preference_id },
    { estado: "aprobado", mpPaymentId: paymentId },
    { new: true }
  );

  let usuarioActualizado = null;
  if (pago) {
    await Usuario.collection.updateOne(
      { _id: new mongoose.Types.ObjectId(pago.usuarioId) },
      { $set: { estado: 1 } }
    );
    usuarioActualizado = await Usuario.findById(pago.usuarioId);
  }

  return { success: true, status: "approved", usuario: usuarioActualizado };
}