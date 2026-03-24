import {
  crearPreferenciaModel,
  recibirNotificacionModel,
  verificarPagoModel,
} from "../models/mercadopagoModel.js";

export const crearPreferencia = async (req, res) => {
  const { monto, titulo } = req.body;
  const usuarioId = req.usuario?._id || req.usuario?.id;

  if (!usuarioId) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  try {
    const resultado = await crearPreferenciaModel(usuarioId, monto, titulo);
    res.json({ success: true, ...resultado });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error MP", detalle: error.message });
  }
};

export const recibirNotificacion = async (req, res) => {
  const { topic, id } = req.query;

  try {
    await recibirNotificacionModel(topic, id);
  } catch (error) {
    console.error("Error Webhook:", error);
  }

  res.status(200).send("OK");
};

export const verificarPago = async (req, res) => {
  const { payment_id } = req.query;

  try {
    const resultado = await verificarPagoModel(payment_id);
    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error Verificacion" });
  }
};
