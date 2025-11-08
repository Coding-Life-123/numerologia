import express from "express";
import "dotenv/config";
import userRoutes from "./routes/userRotues.js";
import numRoutes from "./routes/numRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/usuarios", userRoutes);
app.use("/api/producto", numRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
