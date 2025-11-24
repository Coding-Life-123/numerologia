import pool from "../config/db.js";

export async function newPaymentModel(id, params) {
  const { monto, metodo, fecha_pago, fecha_vencimiento } = params;
  console.log(monto, metodo);
  try {
    const [result] = await pool.execute(
      "INSERT INTO payments (usuario_id, monto, fecha_pago, fecha_vencimiento, metodo) VALUES (?, ?, ?, ?, ?)",
      [id, monto, fecha_pago, fecha_vencimiento, metodo]
    );
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error al procesar el pago: " + error.message);
  }
}

export async function getPaymentModel({ id }) {
  try {
    if (id) {
      const [rows] = await pool.execute(
        "SELECT * FROM payments WHERE usuario_id = ?",
        [id]
      );
      return rows;
    } else {
      const [rows] = await pool.execute("SELECT * FROM payments");
      return rows;
    }
  } catch (error) {
    throw new Error("Error al obtener los usuarios: " + error.message);
  }
}

export async function deletePaymentModel(params) {
    const {id, pay} = params;
  try {
    const [rows] = await pool.execute(
        "DELETE FROM payments WHERE usuario_id = ? AND id = ?",
        [id, pay]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw new Error("Error interno del servidor");
  }
}
