import { createUser, deleteUserModel, estadoUserModel, getPasswordModel, getUserByEmailModel, getUsersModel, updateUsersModel, setResetCodeModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import transporter from "../services/nodemail.js";
import userSchema from "../schemas/userSchema.js";

export const newUser = async (req, res) => {
  try {
    console.log("Contraseña enviada:", req.body.password);
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);   
    const usuario = await createUser(req.body, res);
    console.log(usuario)
    const token = jwt.sign(
      { uid: usuario._id, },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Éxito en userController - newUser: Usuario creado exitosamente.");
    res.status(201).json({usuario, token, msg: "Hola puta"});
  } catch (error) {
    console.log("Error en userController - newUser:", error);
    res.status(500).json({ Error: error });
  };
};

export const getUsers = async (req, res) => {
  try {
    const users = await getUsersModel(req.params);
    console.log("Éxito en userController - getUsers: Usuarios obtenidos.");
    res.status(200).json({ message: "Lista de usuarios", users: users });
  } catch (error) {
    console.log("Error en userController - getUsers:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  };
};

export const loginUser = async (req, res) => {
  try {
    console.log("Cuerpo de la petición en login:", req.body);
    const passHash = await getPasswordModel(req.body.email);
    if (!passHash) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const inputPass = req.body.password;
    console.log(passHash.password)
    console.log(inputPass)
    const isValid = await bcrypt.compare(inputPass, passHash.password);

    if (!isValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const user = await getUserByEmailModel(req.body.email);
    const token = jwt.sign(
      {
        uid: user[0]._id,
        uRole: user[0].role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Éxito en userController - loginUser: Usuario autenticado.");
    return res.status(200).json({ messaje: "Inicio de sesión exitoso!", user, token });
  } catch (error) {
    console.log("Error en userController - loginUser:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmailModel(email);
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Generar código de 6 dígitos (000000 - 999999)
    const code = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    const expireDate = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    await setResetCodeModel(email, code, expireDate);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Código de recuperación de contraseña - Numerología",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
          <h2>Recuperación de Contraseña</h2>
          <p>Has solicitado restablecer tu contraseña. Utiliza el siguiente código de 6 dígitos:</p>
          <h1 style="color: #4A90E2; letter-spacing: 5px;">${code}</h1>
          <p>Este código expirará en 15 minutos.</p>
          <p>Si no solicitaste esto, puedes ignorar este correo.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    console.log("Éxito en userController - requestPasswordReset: Código de recuperación enviado a", email);
    return res.status(200).json({ message: "Código enviado al correo" });
  } catch (error) {
    console.log("Error en userController - requestPasswordReset:", error);
    return res.status(500).json({ message: "Error al solicitar el código de recuperación" });
  }
};

export const resetPasswordUser = async(req, res)=>{
  const { email, code, newPassword } = req.body;
  
  if (!email || !code || !newPassword) {
    return res.status(400).json({ message: "Email, código y nueva contraseña son requeridos" });
  }

  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.resetCode !== code) {
      return res.status(400).json({ message: "El código ingresado es incorrecto" });
    }

    if (new Date() > user.codeExpireDate) {
      return res.status(400).json({ message: "El código ha expirado" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    user.resetCode = null;
    user.codeExpireDate = null;
    await user.save();

    console.log("Éxito en userController - resetPasswordUser: Contraseña restablecida.");
    return res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    console.log("Error en userController - resetPasswordUser:", error);
    return res.status(500).json({ message: "Error interno al restablecer la contraseña" });
  }
}

export const updateUser = async (req, res) => {
  const {id} = req.params;
  if(req.body.estado){
    res.status(500).json({ message: "Error, no se aceptan estados"});
    return
  }
  try{
    const userUpdated = await updateUsersModel(id, req.body);
    console.log("Éxito en userController - updateUser: Usuario modificado.");
    res.status(200).json(userUpdated);
  }catch(error){
    console.log("Error en userController - updateUser:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  };
};

export const deleteUser = async (req, res) => {
  const {id} = req.params;
  try{
    const userDelete = await deleteUserModel(id);
    console.log("Éxito en userController - deleteUser: Usuario eliminado.");
    res.status(200).json(userDelete);
  }catch(error){
    console.log("Error en userController - deleteUser:", error);
    res.status(500).json({message: "Error interno del servidor"});
  };
};

export const estadoUser = async(req, res)=>{
  const {id} = req.params;
  try{
    const estadoUpdated = await estadoUserModel(id, req.body);
    console.log("Éxito en userController - estadoUser: Estado modificado.");
    res.status(200).json(estadoUpdated);
  }catch(error){
    console.log("Error en userController - estadoUser:", error);
    res.status(500).json({ message: "Error interno del servidor" }); 
  };
};