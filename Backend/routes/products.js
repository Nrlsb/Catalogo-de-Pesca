import express from 'express';
import pool from '../db.js';

const router = express.Router();

// --- OBTENER PRODUCTOS (CON FILTROS Y ORDENAMIENTO) ---
router.get('/', async (req, res, next) => { // Añadimos 'next'
  const { search, category, sortBy, order } = req.query;

  let query = 'SELECT * FROM products';
  const params = [];
  const whereClauses = [];

  if (search) {
    params.push(`%${search}%`);
    whereClauses.push(`name ILIKE $${params.length}`);
  }

  if (category && category !== 'All') {
    params.push(category);
    whereClauses.push(`category = $${params.length}`);
  }
  
  if (whereClauses.length > 0) {
    query += ` WHERE ${whereClauses.join(' AND ')}`;
  }

  const validSortColumns = ['name', 'price']; 
  const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'name';
  const sortOrder = order === 'desc' ? 'DESC' : 'ASC'; 
  
  query += ` ORDER BY ${sortColumn} ${sortOrder}`;

  try {
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    // En lugar de responder aquí, pasamos el error al manejador central
    next(error);
  }
});

// --- OBTENER UN PRODUCTO POR SU ID ---
router.get('/:id', async (req, res, next) => { // Añadimos 'next'
  const { id } = req.params;

  if (isNaN(id)) {
    // Creamos un error y lo pasamos al manejador
    const error = new Error('El ID del producto debe ser un número.');
    res.status(400);
    return next(error);
  }

  try {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      const error = new Error('Producto no encontrado.');
      res.status(404);
      return next(error);
    }
    
    res.json(rows[0]);
  } catch (error) {
    // Pasamos el error de la base de datos al manejador central
    next(error);
  }
});

export default router;

