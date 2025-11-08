import { body, validationResult } from "express-validator";

export const validateNewUser = [
  body("cc")
    .isNumeric()
    .withMessage("La cédula debe ser un número")
    .isLength({ min: 7, max: 10 })
    .withMessage("La cédula debe tener entre 7 y 10 dígitos"),
  body("nombre")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El nombre es requerido"),
  body("apellido")
    .isString()
    .withMessage("El apellido debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El apellido es requerido"),
  body("edad")
    .isNumeric()
    .withMessage("La edad debe ser un número")
    .isInt({ min: 0, max: 120 })
    .withMessage("La edad debe ser un número entero entre 0 y 120"),
  body("nombre_completo")
    .isString()
    .withMessage("El nombre completo debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El nombre completo es requerido"),
  body("lugar_nacimiento")
    .isString()
    .withMessage("El lugar de nacimiento debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El lugar de nacimiento es requerido"),
  body("sexo")
    .isString()
    .withMessage("El sexo debe ser una cadena de texto")
    .isIn(["M", "F"])
    .withMessage("El sexo debe ser M o F"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
