import { request, Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";
import { AuthRequest, ProfileRequest } from "../interfaces/auth/IGetUser";
import IUser from "../interfaces/auth/IUser";

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
    res.status(201).json({ message: "Creado exitosamente el usuario" });
    // Opción2
    // await User.create(req.body);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
      res.status(404).json({ message: error.message });
      return;
    }
    const resultCheckPassword = await checkPassword(password, user.password);

    if (!resultCheckPassword) {
      const error = new Error("Revisar el correo o la contraseña, no validas");
      res.status(401).json({ message: error.message });
      return;
    }
    const token = generateJWT({ id: user._id, email: user.email });

    res.status(200).json({ message: "Autenticado..", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

export const getUser = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  var user = await User.findOne({ _id: req.user_id }).select(
    "name handle email description"
  );
  if (!user) {
    const error = new Error("El usuario no exito");
    res.status(409).json({ message: error.message, status: 404 });
    return;
  }
  res.status(200).json({ message: "Usuario autentica", user });
};

export const updateUser = async (
  req: ProfileRequest,
  res: Response
): Promise<void> => {
  try {

    const { description, handle: handleclient, email } = req.body;
    const slug = (await import("slug")).default;
    const handle = slug(handleclient, "");
    const handleExists = await User.findOne({ handle });

    if (handleExists && handleExists.email !== email) {
      const error = new Error("Handle, ya no están disponible.");
      res.status(409).json({ message: error.message, status: 409 });
      return;
    }

    // Opción 1
    const user = await User.findOneAndUpdate(
      { email }, // Filtro
      { handle, description }, // Datos a actualizar
      { new: true, runValidators: true } // Retorna el usuario actualizado
    ).select("handle description email");

    res.status(201).json({ message: "Perfil actualizado", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { image } = req.body;

    // res.render -> envia datos a una vista (anteriormente)
    res.status(201).json({ message: "Creado exitosamente el usuario" });
    // Opción2
    // await User.create(req.body);
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};


