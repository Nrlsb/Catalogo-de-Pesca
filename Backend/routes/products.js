import express from 'express';
import pool from '../db.js';

const router = express.Router();

// --- OBTENER PRODUCTOS (CON FILTROS Y ORDENAMIENTO) ---
// GET /api/products?search=...&category=...&sortBy=...&order=...
router.get('/', async (req, res) => {
  // Extraemos los parámetros de la consulta (query parameters)
  const { search, category, sortBy, order } = req.query;

  let query = 'SELECT * FROM products';
  const params = [];
  const whereClauses = [];

  // Construcción dinámica de la consulta para evitar inyección SQL

  // 1. Cláusula WHERE para la búsqueda por nombre (insensible a mayúsculas)
  if (search) {
    params.push(`%${search}%`);
    whereClauses.push(`name ILIKE $${params.length}`);
  }

  // 2. Cláusula WHERE para el filtro por categoría
  if (category && category !== 'All') {
    params.push(category);
    whereClauses.push(`category = $${params.length}`);
  }
  
  // Si hay cláusulas WHERE, se añaden a la consulta principal
  if (whereClauses.length > 0) {
    query += ` WHERE ${whereClauses.join(' AND ')}`;
  }

  // 3. Cláusula ORDER BY para el ordenamiento
  // Se usa una "whitelist" para asegurar que solo se pueda ordenar por columnas válidas
  const validSortColumns = ['name', 'price']; 
  const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'name'; // 'name' por defecto
  const sortOrder = order === 'desc' ? 'DESC' : 'ASC'; // 'ASC' por defecto
  
  query += ` ORDER BY ${sortColumn} ${sortOrder}`;

  try {
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
