import express from 'express';
import pool from '../db.js';

const router = express.Router();

// --- OBTENER TODAS LAS CATEGORÍAS ÚNICAS ---
router.get('/', async (req, res, next) => { // Añadimos 'next'
  try {
    const { rows } = await pool.query('SELECT DISTINCT category FROM products ORDER BY category ASC');
    const categories = rows.map(row => row.category);
    res.json(categories);
  } catch (error) {
    // Pasamos el error al manejador central
    next(error);
  }
});

export default router;

