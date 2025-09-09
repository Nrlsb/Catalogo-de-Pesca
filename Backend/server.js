import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // Habilita CORS para permitir peticiones desde el frontend
app.use(express.json()); // Permite al servidor entender JSON

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de PescaShop funcionando!');
});

// Rutas de la API
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

