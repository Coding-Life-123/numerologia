import { body, param, validationResult } from "express-validator";

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
    .withMessage("El email es requerido"),
  body("fecha_nacimiento")
    .isString()
    .withMessage("La fecha de nacimiento debe ser una cadena de texto")
    .notEmpty()
    .withMessage("La fecha de nacimiento es requerido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUpdateUser = [
  param("id")
    .notEmpty()
    .withMessage("El Id es requerido")
    .isNumeric()
    .withMessage("El id debe ser de tipo numérico"),
  body("nombre")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
  body("email")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
  body("fecha_nacimiento")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
  body("estado")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto"),
]

