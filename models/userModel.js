//import pool from "../config/db.js";
import userSchema from "../schemas/userSchema.js";

export async function createUser({
  nombre,
  email,
  password,
  fecha_nacimiento
}) {
  console.log(`${nombre}\n${email}\n${password}\n${fecha_nacimiento}\ninactivo`);
  try {
    /*const [result] = await pool.execute(
      "INSERT INTO users (nombre, email, fecha_nacimiento, estado) VALUES (?, ?, ?, ?)",
      [nombre, email, fecha_nacimiento, "inactivo"]
    );*/
    const result = await userSchema.create({
      name: nombre,
      email: email,
      password: password,
      birth_date: fecha_nacimiento
    })
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
      /*const [rows] = await pool.execute(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );
      return rows;*/

      const user = await userSchema.findById(id);
      return user;
    }else{
      /*const [rows] = await pool.execute("SELECT * FROM users");
      return rows;*/
      const users = await userSchema.find();
      return users;
    }    
  } catch (error) {
    throw new Error("Error al obtener los usuarios: " + error.message);
  };
};

export async function getUserByEmailModel(email){
  try{
    const user = await userSchema.find({email:email})
    return user
  }catch(error){
    console.log(error)
    throw new Error("Error interno del servidor")
  }
}

export async function getPasswordModel(email){
  try{
    const password = await userSchema.findOne({email: email}).select("password");
    return password;
  }catch(error){
    console.log(error);
    throw new Error("Error interno del servidor");
  }
}

export async function updateUsersModel(id, params = {}){
  const fields = params;

  if(Object.keys(fields).length === 0){
    throw new Error("No hay campos para actualizar");
  };

  console.log(fields)

  // const columns = Object.keys(fields)
  //   .map(key => `${key} = ?`)
  //   .join(", ");

  // const values = Object.values(fields);

  try{
  //   const [rows] = await pool.execute(
  //     `UPDATE users SET ${columns} WHERE id = ?`,
  //     [...values, id]
  //  );

    const user = await userSchema.findByIdAndUpdate(
      id,
      { $set:fields },
      { new:true, runValidators:true }
    );
    return user;
  }catch(error){
    console.log(error);
    throw new Error("Error interno del servidor");
  };
};

export async function deleteUserModel(id) {
  try{
    // const [rows] = await pool.execute(
    //   "DELETE FROM users WHERE id = ?",
    //   [id]
    // );
    
    const user = await userSchema.findByIdAndDelete(
      id
    )

    return user;
  }catch(error){
    console.log(error);
    throw new Error("Error interno del servidor");
  };
};

export async function estadoUserModel(id, estado){
  try{
    // const [rows] = await pool.execute(
    //   "UPDATE users SET estado = ? WHERE id = ?",
    //   [estado, id]
    // );
    
    const user = await userSchema.findByIdAndUpdate(
      id,
      {$set: estado}
    )

    return user;
  }catch(error){
    console.log(error);
    throw new Error("Error interno del servidor");
  };
};

export async function getEstadoModel({id}){
  try{
    /*const [rows] = await pool.execute(
      "SELECT u.estado AS estado_usuario, p.fecha_vencimiento FROM users u LEFT JOIN payments p ON p.usuario_id = u.id WHERE u.id = ? ORDER BY p.fecha_vencimiento DESC LIMIT 1;",
      [id]
    );*/

    const status = await userSchema.findById(id).select("status");

    return status;
  }catch(error){
    console.log(error);
    throw new Error("Error interno del servidor");
  };
};

export async function setResetCodeModel(email, code, expireDate) {
  try {
    const user = await userSchema.findOneAndUpdate(
      { email: email },
      { 
        $set: { 
          resetCode: code, 
          codeExpireDate: expireDate 
        } 
      },
      { new: true }
    );
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error al guardar el código de reset");
  }
}

export async function clearResetCodeModel(email) {
  try {
    await userSchema.findOneAndUpdate(
      { email: email },
      { 
        $set: { 
          resetCode: null, 
          codeExpireDate: null 
        } 
      }
    );
  } catch (error) {
    console.log(error);
  }
}