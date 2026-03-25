import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import lectureRoutes from "./routes/lectureRoutes.js";
import mercadopagoRoute from "./routes/mercadopagoRoutes.js";
import payRoutes from "./routes/payRoutes.js"
import { startCronMemberships } from "./cron/validateMembership.js";
import { connectDB } from "./config/mongo.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const app = express();

app.use(express.json()); // <-- ¡Esto faltaba!
// Middleware manual de CORS (necesario para que DevTunnels no bloquee el preflight)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", req.headers["access-control-request-headers"] || "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});
app.use(morgan("dev"));

await connectDB();

app.use("/api/usuarios", userRoutes);
app.use("/api/producto", lectureRoutes);
app.use("/api/pagos", payRoutes);
app.use("/api/mercadopago", mercadopagoRoute);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT;
startCronMemberships();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Documentación Swagger disponible en: http://localhost:${PORT}/api-docs`);
});
