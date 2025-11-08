import crypto from "crypto";

export const getNums = async (req, res) => {
  try {
    // Placeholder for getting nums
    res.json({ message: "Lista de números", nums: [] });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const newNum = async (req, res) => {
  try {
    const { numero, descripcion } = req.body;
    const numId = crypto.randomUUID();

    // Suponiendo que aquí tienes un modelo o lógica de base de datos.
    // Por ahora, simplemente devuelva el éxito
    res.status(201).json({
      message: "Número creado exitosamente",
      num: {
        id: numId,
        numero,
        descripcion,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
