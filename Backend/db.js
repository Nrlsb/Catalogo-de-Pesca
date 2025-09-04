import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Configuración de la conexión a la base de datos de Supabase
// Render inyectará DATABASE_URL automáticamente si usas su servicio de PostgreSQL.
// Para Supabase, la seteamos manualmente en las variables de entorno de Render.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
