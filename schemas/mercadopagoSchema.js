import mongoose from "mongoose";
const pagoSchema = new mongoose.Schema({
usuarioId: { type: String, required: true },
monto: { type: Number, required: true },
fecha: { type: Date, default: Date.now },
descripcion: { type: String, default: "" },
estado: {
type: String,
enum: ["pendiente", "aprobado", "rechazado", "en_proceso"],
default: "pendiente",
},
metodoPago: { type: String, default: "" },
moneda: { type: String, default: "COP" },
mpPaymentId: { type: String, default: "" },
mpPreferenceId: { type: String, default: "" },
});
const Pago = mongoose.model("Pago", pagoSchema);
export default Pago;
export const obtenerPagos = async () => await Pago.find();
export const obtenerPagosUsuario = async (idUsuario) => await Pago.find({ usuarioId: idUsuario });
export const registrarPago = async (data) => { const pago = new Pago(data); return await pago.save(); };
export const eliminarPago = async (id) => await Pago.findByIdAndDelete(id);
export const verificarEstadoUsuario = async (idUsuario) => {
const tienePagos = await Pago.exists({ usuarioId: idUsuario });
return { usuarioId: idUsuario, estado: tienePagos ? "Activo" : "Sin pagos" };
};