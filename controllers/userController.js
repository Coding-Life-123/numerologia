import crypto from "crypto";

export const newUser = async (req, res) => {
  try {
    const { cc } = req.query;
    const { nombre, apellido, edad, nombre_completo, lugar_nacimiento, sexo } =
      req.body;
    const userId = crypto.randomUUID();

    // Suponiendo que aquí tienes un modelo o lógica de base de datos.
    // Por ahora, simplemente devuelva el éxito
    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: {
        id: userId,
        cc,
        nombre,
        apellido,
        edad,
        nombre_completo,
        lugar_nacimiento,
        sexo,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getUsers = async (req, res) => {
  try {
    // Placeholder for getting users
    res.json({ message: "Lista de usuarios", users: [] });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
