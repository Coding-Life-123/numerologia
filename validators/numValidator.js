import { body, validationResult } from "express-validator";

export const validateGetNums = [
  (req, res, next) => {
    next();
  },
];

// Espacio reservado para futuras validaciones, por ejemplo, para crear un número
export const validateNewNum = [
  body("numero")
    .isNumeric()
    .withMessage("El número debe ser un valor numérico")
    .notEmpty()
    .withMessage("El número es requerido"),
  body("descripcion")
    .optional()
    .isString()
    .withMessage("La descripción debe ser una cadena de texto"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
