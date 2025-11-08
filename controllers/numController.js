import crypto from "crypto";

export const getNums = async (req, res) => {
  try {
    // Aquí va la lógica para obtener los números
    res.json({ message: "Lista de números", nums: [] });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const newNum = async (req, res) => {
  try {
    const { numero, descripcion } = req.body;
    const numId = crypto.randomUUID();

    // Aquí iría la lógica para guardar en la base de datos, pero por ahora solo respondemos
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
