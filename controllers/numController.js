import pedirLectura from "../services/numAI.js";
import { createLectureModel, getLectureModel } from "../models/numModel.js";

export const getLecture = async(req, res)=>{
  const {id, lectureId} = req.params
  console.log(id, lectureId)
  try{
    const resLecture = await getLectureModel(id, lectureId);
    res.status(200).json(resLecture);
  }catch(error){
    console.log(error);
    res.status(500).json("error interno del servidor");
  }
}

export const dailyLecture = async(req, res)=>{
  try{
    const{ nombre, fecha_nacimiento, estado } = req.body;
    if(estado != "activo"){
      res.status(500).json({message:"Su membresía ha caducado"})
      return
    }
    
    const contexto = `quiero que hagas una lectura numerológica basado en los datos que te voy a enviar de cumpleaños y nombre, esta será una lectura diaria, recuerda que debes basarte en los números, por ejemplo si alguien se llama luis sería 12 22 9 20, y debes reducir todo a un número para ponerlo del 0 al 9, entonces 12 22 9 20 pasaría a ser 3 4 9 2, luego 7 11, 7 2, 9 como separando los números y sumando uno a uno hasta quedar con una sola cifra, pero no hace falta que muestres este proceso de suma, debes ser compacto con el mensaje, de aproximadamente 30 palabras, pero con permiso de alargarte a 45 máximo`;

    const lectura = await pedirLectura(nombre, fecha_nacimiento, contexto);

    const hoy = new Date().toISOString().split("T")[0];

    const content = {
      id: req.params.id,
      tipo:"diaria",
      lectura,
      fecha_lectura:hoy
    }

    console.log(content);

    const guardarLectura = await createLectureModel(content);

    res.status(201).json(content, guardarLectura);
  } catch (error){
    console.log(error);
    res.status(500).json({message: "Error interno del servidor"});
  }
};

export const mainLecture = async(req, res)=>{
  try{
    const{ nombre, fecha_nacimiento } = req.body;

    const contexto = `quiero que hagas una lectura numerológica basada en los datos que te voy a enviar de cumpleaños y nombre, esta será una lectura principal, algo detallado pero sin llegar a ser tan profundo, ya que es un producto de prueba gratis, recuerda que debes basarte en los números, por ejemplo si alguien se llama luis sería 12 22 9 20, y debes reducir todo a un número para ponerlo del 0 al 9, entonces 12 22 9 20 pasaría a ser 3 4 9 2, luego 7 11, 7 2, 9 como separando los números y sumando uno a uno hasta quedar con una sola cifra, pero no hace falta que muestres este proceso de suma, debes ser compacto con el mensaje, de minimo 40 palabras, pero con permiso de alargarte a 55 máximo`;

    const lectura = await pedirLectura(nombre, fecha_nacimiento, contexto);

    const hoy = new Date().toISOString().split("T")[0];

    const content = {
      id: req.params.id,
      tipo:"principal",
      lectura,
      fecha_lectura:hoy
    }

    console.log(content);

    const guardarLectura = await createLectureModel(content)

    res.status(201).json(guardarLectura);
  } catch (error){
    console.log(error);
    res.status(500).json({message: "Error interno del servidor"});
  }
};