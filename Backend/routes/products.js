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

// --- OBTENER UN PRODUCTO POR SU ID ---
// GET /api/products/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Validamos que el ID sea un número para mayor seguridad
  if (isNaN(id)) {
    return res.status(400).json({ message: 'El ID del producto debe ser un número.' });
  }

  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}:`, error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;

