import pool from "../config/db.js";

// Función para crear un nuevo número
export async function createNum({ numero, descripcion }) {
  try {
    const [result] = await pool.execute(
      "INSERT INTO nums (numero, descripcion) VALUES (?, ?)",
      [numero, descripcion]
    );
    return result.insertId; // Retorna el ID del nuevo registro
  } catch (error) {
    throw new Error("Error al crear el número: " + error.message);
  }
}

// Función para obtener todos los números
export async function getNums() {
  try {
    const [rows] = await pool.execute("SELECT * FROM nums");
    return rows;
  } catch (error) {
    throw new Error("Error al obtener los números: " + error.message);
  }
}
