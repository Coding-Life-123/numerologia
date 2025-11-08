import express from 'express'
import 'dotenv/config'
import userRoutes from './routes/userRotues';
import numRoutes from './routes/numRoutes';

const app = express();

app.use(express.json());

app.use('/api/usuarios', userRoutes);
app.use('/api/producto', numRoutes);