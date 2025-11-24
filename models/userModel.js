import pool from "../config/db.js";

export async function createUser({
  nombre,
  email,
  fecha_nacimiento
}) {
  console.log(`${nombre}\n${email}\n${fecha_nacimiento}\ninactivo`);
  try {
    const [result] = await pool.execute(
      "INSERT INTO users (nombre, email, fecha_nacimiento, estado) VALUES (?, ?, ?, ?)",
      [nombre, email, fecha_nacimiento, "inactivo"]
    );
    return result;
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message);
  };
};

export async function getUsersModel(params = {}) {
  const {id} = params;
  console.log(id);
  try {
    if(id){
      const [rows] = await pool.execute(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );
      return rows;
    }else{
      const [rows] = await pool.execute("SELECT * FROM users");
      return rows;
    }    
  } catch (error) {
    throw new Error("Error al obtener los usuarios: " + error.message);
  };
};

export async function updateUsersModel(id, params = {}){
  const fields = params;

  if(Object.keys(fields).length === 0){
    throw new Error("No hay campos para actualizar");
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

    return rows;
  }catch(error){
    console.log(error);
    throw new Error("Error interno del servidor");
  };
};

export async function deleteUserModel(id) {
  try{
    const [rows] = await pool.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    
    return rows;
  }catch(error){
    console.log(error);
    throw new Error("Error interno del servidor");
  };
};

export async function estadoUserModel(id, {estado}){
  try{
    const [rows] = await pool.execute(
      "UPDATE users SET estado = ? WHERE id = ?",
      [estado, id]
    );
    
    return rows;
  }catch(error){
    console.log(error);
    throw new Error("Error interno del servidor");
  };
};