import { body, param, validationResult } from "express-validator";
import paySchema from "../schemas/paySchema.js";
import mongoose from "mongoose";
import userSchema from "../schemas/userSchema.js";

export const validatePayUser = [
    param("id")
        .notEmpty()
        .withMessage("El id es requerido")
        .custom(async(id)=>{                       
            if(!mongoose.Types.ObjectId.isValid(id)){
                throw new Error("ID inválido")
            }
            return true
        })
        .bail()
        .custom(async(id)=>{

            const user = await userSchema.findById(id);
            if(!user){
                throw new Error("Usuario no encontrado")
            }
            return true
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array()[0].msg });
        }
        next();
      }
]

export const validateDeletePay = [
    param("id")
        .notEmpty()
        .withMessage("El id es requerido")
        .custom(async(id)=>{                       
            if(!mongoose.Types.ObjectId.isValid(id)){
                throw new Error("ID inválido")
            }
            return true
        })
        .bail()
        .custom(async(id)=>{

            const user = await userSchema.findById(id);
            if(!user){
                throw new Error("Usuario no encontrado")
            }
            return true
        }),
    param("pay")
        .notEmpty()
        .withMessage("El id del pago es requerido")
        .custom(async(pay)=>{
            if(!mongoose.Types.ObjectId.isValid(pay)){
                throw new Error("ID inválido")
            }
            return true
        })
        .custom(async(pay)=>{
            const exists = await paySchema.findById(pay);

            if(!exists){
                throw new Error("Pago no encontrado")
            }
            return true
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array()[0].msg });
        }
        next();
      }
]