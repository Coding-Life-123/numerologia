import { body, validationResult } from "express-validator";

export const validateLectura=[
  body("nombre")
    .isString()
    .withMessage("El nombre debe tener un valor de cadena de texto")
    .notEmpty()
    .withMessage("El nombre es requerido"),
  body("fecha_nacimiento")
    .isDate()
    .withMessage("La fecha de nacimiento debe ser una fecha válida")
    .notEmpty()
    .withMessage("La fecha de nacimiento es requerida"),
    (req, res, next)=>{
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()[0].msg});    
      }
      next();
    }
]