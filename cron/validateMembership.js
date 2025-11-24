import nodeCron from "node-cron";
import pool from "../config/db.js";

export const startCronMemberships = () => {
    nodeCron.schedule("0 0 * * *", async()=>{
        console.log("Ejecutando validación diaria de membresías...");

        try{
            const hoy = new Date().toISOString().split("T")[0];

            const [pagosVencidos] = await pool.execute(
                `SELECT usuario_id FROM pagos WHERE fecha_vencimiento < ?`,
                [hoy]
            );

            if(pagosVencidos.length=== 0){
                console.log("No hay pagos vencidos hoy");
                return;
            }

            for(const pago of pagosVencidos){
                await pool.execute(
                    `UPDATE users SET estado = 'inactivo' WHERE id = ?`,
                    [pago.usuario_id]
                );
            }

            console.log(`${pagosVencidos.length} usuarios pasaron a inactivo.`);
        }catch(error){
            console.error("Error ejecutando CronMemberships:", error);
        }
    });
};