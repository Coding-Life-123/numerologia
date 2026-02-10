import { createUser, deleteUserModel, estadoUserModel, getPasswordModel, getUserByEmailModel, getUsersModel, updateUsersModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const newUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);   
    const usuario = await createUser(req.body, res);
    console.log(usuario)
    const token = jwt.sign(
      { uid: usuario._id, },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({usuario, token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error });
  };
};

export const getUsers = async (req, res) => {
  
  try {
    const users = await getUsersModel(req.params);
    res.status(200).json({ message: "Lista de usuarios", users: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  };
};

export const loginUser = async (req, res)=>{
  const passHash = await getPasswordModel(req.body.email);
  const inputPass = req.body.password;
  console.log(passHash.password)
  console.log(inputPass)
  const isValid = await bcrypt.compare(inputPass, passHash.password);
  if(!isValid){
    res.status(500).json({ message: "Contraseña incorrecta" });
  }
  try{
    const user = await getUserByEmailModel(req.body.email);    
    const token = jwt.sign(
      { uid: user[0]._id, },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({messaje:"Inicio de sesión exitoso!", user, token})
  }catch(error){
    console.log("error controlador login")
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

export const updateUser = async (req, res) => {
  const {id} = req.params;
  if(req.body.estado){
    res.status(500).json({ message: "Error, no se aceptan estados"});
    return
  }
  try{
    const userUpdated = await updateUsersModel(id, req.body);
    console.log(userUpdated);
    res.status(200).json(userUpdated);
  }catch(error){
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  };
};

export const deleteUser = async (req, res) => {
  const {id} = req.params;
  try{
    const userDelete = await deleteUserModel(id);
    console.log(userDelete);
    res.status(200).json(userDelete);
  }catch(error){
    console.log(error);
    res.status(500).json({message: "Error interno del servidor"});
  };
};

export const estadoUser = async(req, res)=>{
  const {id} = req.params;
  try{
    const estadoUpdated = await estadoUserModel(id, req.body);
    res.status(200).json(estadoUpdated);
  }catch(error){
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" }); 
  };
};