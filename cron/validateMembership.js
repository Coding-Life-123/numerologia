import nodeCron from "node-cron";
import Usuario from "../schemas/userSchema.js";
import Pago from "../schemas/paySchema.js";

export const startCronMemberships = () => {
  nodeCron.schedule("0 0 * * *", async () => {
    console.log("⏰ Ejecutando validación diaria de membresías...");

    try {
      const hoy = new Date();

      // Buscar pagos aprobados cuya fecha de expiración ya pasó
      const pagosVencidos = await Pago.find({
        estado: "aprobado",
        expire_date: { $lt: hoy },
      });

      if (pagosVencidos.length === 0) {
        console.log("✅ No hay membresías vencidas hoy.");
        return;
      }

      // Extraer IDs de usuarios únicos
      const usuariosVencidos = [...new Set(pagosVencidos.map((p) => p.user_id.toString()))];

      for (const userId of usuariosVencidos) {
        await Usuario.findByIdAndUpdate(userId, { $set: { status: "inactivo" } });
      }

      console.log(`⚠️ ${usuariosVencidos.length} usuarios pasaron a estado inactivo.`);
    } catch (error) {
      console.error("❌ Error ejecutando CronMemberships:", error.message);
    }
  });
};