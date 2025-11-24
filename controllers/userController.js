import { createUser, getUsersModel, updateUsersModel } from "../models/userModel.js";

export const newUser = async (req, res) => {
  try {
    const usuario = await createUser(req.body, res);
    console.log(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error });
  }
};

export const getUsers = async (req, res) => {
  console.log(req.params.id);
  try {
    const users = await getUsersModel(req.params);
    res.status(200).json({ message: "Lista de usuarios", users: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  const {id} = req.params;
  console.log(req.body);
  try{
    const userUpdated = await updateUsersModel(id, req.body);
    console.log(userUpdated);
    res.status(200).json(userUpdated)
  }catch(error){
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};