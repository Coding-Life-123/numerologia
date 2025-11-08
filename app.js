import express from 'express'
import 'dotenv/config'

const app = express();

app.use(express.json());

app.use('/api/usuarios', userRoutes);
app.use('/api/producto', numRoutes);