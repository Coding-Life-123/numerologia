import crypto from "crypto";

export const newUser = async (req, res) => {
  try {
    const { cc } = req.query;
    const { nombre, apellido, edad, nombre_completo, lugar_nacimiento, sexo } =
      req.body;
    const userId = crypto.randomUUID();

    // Aquí iría la lógica para guardar el usuario en la base de datos, pero por ahora solo respondemos
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
    // Aquí va la lógica para obtener los usuarios
    res.json({ message: "Lista de usuarios", users: [] });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
