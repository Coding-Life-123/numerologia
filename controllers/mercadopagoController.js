import {
  crearPreferenciaModel,
  recibirNotificacionModel,
  verificarPagoModel,
} from "../models/mercadopagoModel.js";

export const crearPreferencia = async (req, res) => {
  const { monto, titulo } = req.body;
  const usuarioId = req.usuario?._id || req.usuario?.id;
  console.log(`\n[MP] INICIO: crearPreferencia | UsuarioID: ${usuarioId} | Monto: ${monto} | Título: ${titulo}`);

  if (!usuarioId) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  try {
    const resultado = await crearPreferenciaModel(usuarioId, monto, titulo);
    console.log(`[MP] ÉXITO: crearPreferencia | Preferencia Generada: ${resultado.id}`);
    res.json({ success: true, ...resultado });
  } catch (error) {
    console.log(`[MP] ERROR: crearPreferencia | UsuarioID: ${usuarioId} | Detalle:`, error.message);
    res.status(500).json({ error: "Error MP", detalle: error.message });
  }
};

export const recibirNotificacion = async (req, res) => {
  const { topic, id } = req.query;
  console.log(`\n[MP] INICIO: recibirNotificacion (Webhook) | Topic: ${topic} | ID: ${id}`);

  try {
    await recibirNotificacionModel(topic, id);
    console.log(`[MP] ÉXITO: recibirNotificacion | Webhook procesado correctamente para ID: ${id}`);
  } catch (error) {
    console.error(`[MP] ERROR: recibirNotificacion (Webhook) | Topic: ${topic} | ID: ${id} | Detalle:`, error.message);
  }

  res.status(200).send("OK");
};

export const verificarPago = async (req, res) => {
  const { payment_id } = req.query;
  console.log(`\n[MP] INICIO: verificarPago | PaymentID consultado: ${payment_id}`);

  try {
    const resultado = await verificarPagoModel(payment_id);
    console.log(`[MP] ÉXITO: verificarPago | Status MP: ${resultado.status || 'Desconocido'}`);
    res.json(resultado);
  } catch (error) {
    console.log(`[MP] ERROR: verificarPago | PaymentID: ${payment_id} | Detalle:`, error.message);
    res.status(500).json({ error: "Error Verificacion" });
  }
};
