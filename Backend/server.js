import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import { notFound, errorHandler } from './middleware/errorHandler.js'; // 1. Importar middlewares

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de PescaShop funcionando!');
});

// Rutas de la API
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// 2. Usar middlewares de manejo de errores (deben ir al final)
app.use(notFound);
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

