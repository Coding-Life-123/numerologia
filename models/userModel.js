import pool from "../config/db.js";

// Función para crear un nuevo usuario
export async function createUser({
  cc,
  nombre,
  apellido,
  edad,
  nombre_completo,
  lugar_nacimiento,
  sexo,
}) {
  try {
    const [result] = await pool.execute(
      "INSERT INTO users (cc, nombre, apellido, edad, nombre_completo, lugar_nacimiento, sexo) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [cc, nombre, apellido, edad, nombre_completo, lugar_nacimiento, sexo]
    );
    return result.insertId; // Retorna el ID del nuevo registro
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message);
  }
}

// Función para obtener todos los usuarios
export async function getUsers() {
  try {
    const [rows] = await pool.execute("SELECT * FROM users");
    return rows;
  } catch (error) {
    throw new Error("Error al obtener los usuarios: " + error.message);
  }
}
