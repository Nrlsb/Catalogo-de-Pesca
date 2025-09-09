import { useState, useEffect } from 'react';

/**
 * Hook para obtener todas las categorías de productos disponibles.
 * Realiza una única llamada al endpoint específico de categorías.
 * @returns {{categories: Array}}
 */
export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        // Apuntamos al nuevo endpoint optimizado
        const response = await fetch(`${apiUrl}/api/categories`);
        if (!response.ok) throw new Error('Error al obtener las categorías');
        
        const data = await response.json();
        setCategories(data);
      } catch (e) {
        console.error("Error al obtener las categorías:", e);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  return { categories };
}

