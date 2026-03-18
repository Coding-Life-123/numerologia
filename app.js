import express from "express";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import numRoutes from "./routes/numRoutes.js";
import payRoutes from "./routes/payRoutes.js"
import { startCronMemberships } from "./cron/validateMembership.js";
import { connectDB } from "./config/mongo.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const app = express();

app.use(express.json());

await connectDB();

app.use("/api/usuarios", userRoutes);
app.use("/api/producto", numRoutes);
app.use("/api/pagos", payRoutes);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT;
startCronMemberships();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Documentación Swagger disponible en: http://localhost:${PORT}/api-docs`);
});
