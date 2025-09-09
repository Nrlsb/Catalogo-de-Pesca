import { useState, useEffect } from 'react';

/**
 * Hook personalizado para obtener la lista de productos del servidor,
 * aplicando filtros y ordenamiento.
 *
 * @param {string} searchTerm - El término de búsqueda.
 * @param {string} category - La categoría a filtrar.
 * @param {string} sortOption - La opción de ordenamiento (ej: "price-asc").
 * @returns {{products: Array, loading: boolean, error: string|null}}
 */
export function useProducts(searchTerm, category, sortOption) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Se activa el estado de carga en cada nueva petición
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        
        // Descomponemos la opción de ordenamiento en columna y dirección
        const [sortBy, order] = sortOption.split('-');

        // Construimos los parámetros de la URL de forma segura
        const params = new URLSearchParams({ sortBy, order });
        if (searchTerm) {
          params.append('search', searchTerm);
        }
        if (category && category !== 'All') {
          params.append('category', category);
        }

        const response = await fetch(`${apiUrl}/api/products?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null); // Limpiamos errores previos si la petición es exitosa
      } catch (e) {
        console.error("Error al obtener los productos:", e);
        setError("No se pudieron cargar los productos. Asegúrate de que el servidor backend esté funcionando.");
        setProducts([]); // Vaciamos los productos en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // Este efecto se ejecutará cada vez que cambie uno de estos valores
  }, [searchTerm, category, sortOption]);

  return { products, loading, error };
}

