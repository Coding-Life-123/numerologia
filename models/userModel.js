import pool from "../config/db.js";

// Función para crear un nuevo usuario
export async function createUser({
  nombre,
  email,
  fecha_nacimiento
}) {
  console.log(`${nombre}\n${email}\n${fecha_nacimiento}\ninactivo`)
  try {
    const [result] = await pool.execute(
      "INSERT INTO users (nombre, email, fecha_nacimiento, estado) VALUES (?, ?, ?, ?)",
      [nombre, email, fecha_nacimiento, "inactivo"]
    );
    return result.insertId; // Retorna el ID del nuevo registro
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message);
  }
}

// Función para obtener todos los usuarios
export async function getUsersModel(params = {}) {
  const {id} = params;
  console.log(id)
  try {
    if(id){
      const [rows] = await pool.execute(
        "SELECT * FROM users WHERE id = ?",
        [id]
      )
      return rows
    }else{
      const [rows] = await pool.execute("SELECT * FROM users");
      return rows;
    }    
  } catch (error) {
    throw new Error("Error al obtener los usuarios: " + error.message);
  }
}

export async function updateUsersModel(id, params = {}){
  const fields = params;
  console.log(fields)

  if(Object.keys(fields).length === 0){
    throw new Error("No hay campos para actualizar")
  };

  const columns = Object.keys(fields)
    .map(key => `${key} = ?`)
    .join(", ");

  const values = Object.values(fields);

  try{
    const [rows] = await pool.execute(
      `UPDATE users SET ${columns} WHERE id = ?`,
      [...values, id]
    );

    return rows
  }catch(error){
    console.log(error)
    return "Error interno del servidor"
  }
};