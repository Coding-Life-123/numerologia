import pool from "../config/db.js";

export async function createLectureModel({ id, tipo, lectura, fecha_lectura }) {
  try {
    const [result] = await pool.execute(
      "INSERT INTO lectures (usuario_id, tipo, contenido, fecha_lectura) VALUES (?, ?, ?, ?)",
      [id, tipo, lectura, fecha_lectura]
    );
    return result;
  } catch (error) {
    throw new Error("Error al crear el número: " + error);
  }
}

export async function getLectureModel(id, lectureId) {
  try {
    if(lectureId){
      const [rows] = await pool.execute("SELECT * FROM lectures WHERE usuario_id = ? AND id = ?", [id, lectureId]);

      return rows;
    }
    const [rows] = await pool.execute("SELECT * FROM lectures WHERE usuario_id = ?", [id]);

    return rows;
  } catch (error) {
    throw new Error("Error al obtener los números: " + error);
  }
}
