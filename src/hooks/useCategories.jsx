import { useState, useEffect } from 'react';

/**
 * Hook para obtener todas las categorías de productos disponibles.
 * Realiza una única llamada para poblar el filtro de categorías.
 * @returns {{categories: Array}}
 */
export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllProductsForCategories = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        // Hacemos una llamada sin filtros para obtener todos los productos
        const response = await fetch(`${apiUrl}/api/products`);
        if (!response.ok) throw new Error('Error al obtener las categorías');
        
        const data = await response.json();
        // Extraemos las categorías únicas y las ordenamos
        const uniqueCategories = [...new Set(data.map(p => p.category))].sort();
        setCategories(uniqueCategories);
      } catch (e) {
        console.error("Error al obtener las categorías:", e);
        setCategories([]);
      }
    };
    fetchAllProductsForCategories();
  }, []); // El array vacío asegura que se ejecute solo una vez

  return { categories };
}
