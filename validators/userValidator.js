import { body, header, param, validationResult } from "express-validator";
import userSchema from "../schemas/userSchema.js";
import mongoose from "mongoose";

export const validateNewUser = [
  body("nombre")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El nombre es requerido"),
  body("email")
    .isString()
    .withMessage("El email debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El email es requerido")
    .custom(async (email)=>{
      const user = await userSchema.findOne({
        email
      })

      if(user){
        throw new Error("Este email ya está registrado");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida"),
  body("fecha_nacimiento")
    .isString()
    .withMessage("La fecha de nacimiento debe ser una cadena de texto")
    .notEmpty()
    .withMessage("La fecha de nacimiento es requerido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
  },
];

export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Email no válido")
    .custom(async(email)=>{
      const user = userSchema.find({email: email});
      if(!user){
        throw new Error("Usuario no encontrado");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
  },
]

export const validateUpdateUser = [
  header("authorization")
    .notEmpty()
    .withMessage("Token es requerido")
    .isString()
    .withMessage("Token no válido"),
  body("nombre")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
  body("email")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .custom(async (email)=>{
      const user = await userSchema.findOne({
        email
      })

      if(user){
        throw new Error("Este email ya está registrado");
      }
      return true;
    }),
  body("fecha_nacimiento")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
  body("estado")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
  },
]

export const validateDeleteUser = [
  param("id")
    .notEmpty()
    .withMessage("el id es requerido")
    // .custom(async(id)=>{     
    //   if(!mongoose.Types.ObjectId.isValid(id)){
    //     throw new Error("el id no es válido");
    //   }
    // })
    .custom(async(id)=>{
      const user = await userSchema.findById(id);

      if(!user){
        throw new Error("Este usuario no existe");
      }
      return true
    }),
  body("nombre")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
  body("email")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .custom(async (email)=>{
      const user = await userSchema.findOne({
        email
      })

      if(!user){
        throw new Error("Este usuario no está registrado");
      }
      return true;
    }),
  body("fecha_nacimiento")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
  body("estado")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
  },
]

