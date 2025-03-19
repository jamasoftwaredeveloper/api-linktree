import { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export const createAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, handle: handleclient } = req.body;
    const slug = (await import("slug")).default;
    const handle = slug(handleclient, "");
    const userExists = await User.findOne({ $or: [{ email }, { handle }] });

    if (userExists) {
      const error = new Error("El email ó el handle, ya no están disponible.");
      res.status(409).json({ message: error.message, status: 409 });
      return;
    }

    // Opción 1
    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = slug(handle);
    user.save();

    // res.render -> envia datos a una vista (anteriormente)
    res
      .status(201)
      .json({ message: "Creado exitosamente el usuario", status: 201 });
    // Opción2
    // await User.create(req.body);
  } catch (err) {
    res.status(500).json({ message: err.message, status: 500 });
    return;
  }
};

export const loginAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("El email no concide con ningún usuario.");
      res.status(404).json({ message: error.message, status: 401 });
      return;
    }
    const resultCheckPassword = await checkPassword(password, user.password);

    if (!resultCheckPassword) {
      const error = new Error("Revisar el correo o la contraseña, no validas");
      res.status(401).json({ message: error.message, status: 401 });
      return;
    }
    const token = generateJWT({ id: user._id, email: user.email });

    res.status(200).json({ message: "Autenticado..", status: 200, token });
  } catch (err) {
    res.status(500).json({ message: err.message, status: 500 });
    return;
  }
};
