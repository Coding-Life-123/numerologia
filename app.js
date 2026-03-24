import express from "express";
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

app.use(express.json());

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
