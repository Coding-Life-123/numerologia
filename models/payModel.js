import mongoose from "mongoose";
import paymentSchema from "../schemas/paySchema.js"

export async function newPaymentModel(id, params) {
  const { monto, metodo, fecha_pago, fecha_vencimiento } = params;
  console.log(monto, metodo);
  try {
    /*const [result] = await pool.execute(
      "INSERT INTO payments (usuario_id, monto, fecha_pago, fecha_vencimiento, metodo) VALUES (?, ?, ?, ?, ?)",
      [id, monto, fecha_pago, fecha_vencimiento, metodo]
    );*/

    const payment = paymentSchema.create({
      user_id: id,
      amount: monto,
      method: metodo,
      payment_date: fecha_pago,
      expire_date: fecha_vencimiento
    })

    return payment;
  } catch (error) {
    console.log(error);
    throw new Error("Error al procesar el pago: " + error.message);
  }
}

export async function getPaymentModel({ id }) {
  try {
    if (id) {
      /*const [rows] = await pool.execute(
        "SELECT * FROM payments WHERE usuario_id = ?",
        [id]
      );*/

      const payment = await paymentSchema.find({
        user_id:id
      })
      return payment;
    } else {
      /*const [rows] = await pool.execute("SELECT * FROM payments");*/

      const payment = await paymentSchema.find()
      return payment;
    }
  } catch (error) {
    throw new Error("Error al obtener los usuarios: " + error.message);
  }
}

export async function deletePaymentModel(params) {
  const {id, pay} = params;

  if(
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(pay)
  ){
    throw new Error("ID inválido");
  }
  try {
    /*const [rows] = await pool.execute(
        "DELETE FROM payments WHERE usuario_id = ? AND id = ?",
        [id, pay]
    );*/

    const payment = await paymentSchema.findOneAndDelete({
      _id: pay,
      user_id: id
    })
    return payment;
  } catch (error) {
    console.log(error);
    throw new Error("Error interno del servidor");
  }
}
