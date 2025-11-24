import crypto from "crypto";
import pedirLectura from "../services/numAI.js";

export const getNums = async (req, res) => {
  try {
    res.json({ message: "Lista de números", nums: [] });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const newNum = async (req, res) => {
  try {
    const { numero, descripcion } = req.body;
    const numId = crypto.randomUUID();
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const dailyLecture = async(req, res)=>{
  try{
    const{ nombre, fecha_nacimiento } = req.body;

    const lectura = await pedirLectura(nombre, fecha_nacimiento)

    res.status(201).json({lectura})
  } catch (error){
    console.log("error en numController llamada IA")
    res.status(500).json({message: "Error interno del servidor"});
  }
};