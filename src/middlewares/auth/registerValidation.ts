import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Middleware de validación para las operaciones de SpecialPrice
export const validateBodyAuth = {
  // Validación para crear y actualizar SpecialPrice
  register: [
    body("handle")
      .isLength({ min: 6 })
      .withMessage("El handle, debe ser minimo 6 caracteres")
      .notEmpty()
      .withMessage("El handle, no debe estar vacio.")
      .isLength({ max: 40 })
      .withMessage("El handle, debe ser maximo 40 caracteres"),
    body("name")
      .isLength({ min: 3 })
      .withMessage("El nombre, debe tener minimo 3 caracteres")
      .notEmpty()
      .withMessage("El nombre, no debe estar vacio."),
    body("email")
      .notEmpty()
      .withMessage("El email, no debe estar vacio.")
      .isEmail()
      .withMessage("El email, debe ser tipo email."),
    body("password")
      .notEmpty()
      .withMessage("La contraseña, no debe estar vacia.")
      .isLength({ min: 8 })
      .withMessage("La contraseña, debe tener minimo 8 caracteres."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
  login: [
    body("email").notEmpty().withMessage("El email, no debe estar vacio."),
    body("password")
      .notEmpty()
      .withMessage("La contraseña, no debe estar vacia."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
};
