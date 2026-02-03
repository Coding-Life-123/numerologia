import express from "express";
import "dotenv/config";
import userRoutes from "./routes/userRotues.js";
import numRoutes from "./routes/numRoutes.js";
import payRoutes from "./routes/payRoutes.js"
import { startCronMemberships } from "./cron/validateMembership.js";
import { connectDB } from "./config/mongo.js";

const app = express();

app.use(express.json());

await connectDB();

app.use("/api/usuarios", userRoutes);
app.use("/api/producto", numRoutes);
app.use("/api/pagos", payRoutes);

const PORT = process.env.PORT;
startCronMemberships();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
