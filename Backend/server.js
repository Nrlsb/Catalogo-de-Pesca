import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// --- Configuración de CORS para Producción ---
// 1. Definimos una "lista blanca" de orígenes permitidos.
const whitelist = [
  'http://localhost:5173', // Permitir el frontend en desarrollo (Vite)
  'http://localhost:3000', // Otro puerto común para desarrollo
];

// 2. Si hay una URL de producción en las variables de entorno, la añadimos.
if (process.env.FRONTEND_URL) {
  whitelist.push(process.env.FRONTEND_URL);
}

const corsOptions = {
  origin: function (origin, callback) {
    // 3. Comprobamos si el origen de la petición está en nuestra lista blanca.
    // `!origin` permite peticiones de la misma máquina (ej. Postman).
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por la política de CORS'));
    }
  },
  optionsSuccessStatus: 200 
};

// Middlewares
app.use(cors(corsOptions)); // 4. Aplicamos la configuración de CORS.
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de PescaShop funcionando!');
});

// Rutas de la API
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Usar middlewares de manejo de errores (deben ir al final)
app.use(notFound);
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

