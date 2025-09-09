import { useState, useEffect } from 'react';

/**
 * Hook personalizado para obtener la lista de productos.
 * Encapsula toda la lógica de fetching, incluyendo los estados
 * de carga y error, haciendo los componentes más limpios y reutilizables.
 *
 * @returns {{products: Array, loading: boolean, error: string|null}}
 * Un objeto que contiene la lista de productos, el estado de carga y
 * un posible mensaje de error.
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // La URL de la API se obtiene de las variables de entorno de Vite.
        // Si no está definida, se usa un valor por defecto para desarrollo local.
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/products`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        console.error("Error al obtener los productos:", e);
        setError("No se pudieron cargar los productos. Asegúrate de que el servidor backend esté funcionando.");
      } finally {
        // Independientemente del resultado, la carga ha finalizado.
        setLoading(false);
      }
    };

    fetchProducts();
    // El array de dependencias vacío `[]` asegura que el efecto se ejecute solo una vez,
    // cuando el componente que usa el hook se monta por primera vez.
  }, []);

  return { products, loading, error };
}
