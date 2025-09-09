import express from 'express';
import pool from '../db.js';

const router = express.Router();

// --- OBTENER TODAS LAS CATEGORÍAS ÚNICAS ---
// GET /api/categories
router.get('/', async (req, res) => {
  try {
    // Consulta optimizada para obtener solo los nombres de categoría únicos
    const { rows } = await pool.query('SELECT DISTINCT category FROM products ORDER BY category ASC');
    // Mapeamos para devolver un array de strings, que es más ligero
    const categories = rows.map(row => row.category);
    res.json(categories);
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
