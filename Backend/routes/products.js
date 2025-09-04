import express from 'express';
import pool from '../db.js';

const router = express.Router();

// --- OBTENER TODOS LOS PRODUCTOS ---
// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
