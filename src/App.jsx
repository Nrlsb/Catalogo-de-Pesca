import React, { useState, useEffect } from 'react';
import ContactModal from './components/ContactModal';
import ProductModal from './components/ProductModal';
import ProductCard from './components/ProductCard';
import SearchAndFilter from './components/SearchAndFilter';
import ProductGridSkeleton from './components/ProductGridSkeleton';
import useDebounce from './hooks/useDebounce';

// --- Componente Principal: App ---
export default function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Mantiene el valor instantáneo del input
  const [filterCategory, setFilterCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para los modales
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [selectedProductContact, setSelectedProductContact] = useState(null);

  // Usamos el hook useDebounce para obtener un valor que solo se actualiza 
  // 500ms después de que el usuario deja de escribir.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/products`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        console.error("Error al obtener los productos:", e);
        setError("No se pudieron cargar los productos. Asegúrate de que el servidor backend esté funcionando.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(p => p.category))].sort();

  const filteredProducts = products.filter(product => {
    const name = product.name || '';
    // La lógica de filtrado ahora usa el término de búsqueda "debounced"
    const matchesSearchTerm = name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearchTerm && matchesCategory;
  });
  
  const handleDetailsClick = (product) => setSelectedProductDetails(product);
  const handleConsultClick = (product) => setSelectedProductContact(product);
  const closeModals = () => {
    setSelectedProductDetails(null);
    setSelectedProductContact(null);
  };

  return (
    <div className="bg-brand-dark min-h-screen font-sans text-brand-light">
       <header className="bg-brand-card/90 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/1000153989.jpg" alt="PescaShop Logo" className="h-12 w-auto rounded-full" />
            <div>
              <h1 className="text-2xl font-bold text-white">Maxi Pesca</h1>
              <p className="text-sm text-gray-400">Tu tienda especialista en reels de pesca</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <button 
              onClick={() => setSelectedProductContact(true)} 
              className="text-brand-light hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-md transition-colors">
              Contacto
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-left">Gama Alta</h2>
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categories={categories}
        />

        {loading ? (
          <ProductGridSkeleton />
        ) : error ? (
          <div className="text-center py-16 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p className="text-xl">{error}</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onDetailsClick={handleDetailsClick}
                onConsultClick={handleConsultClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-brand-card rounded-lg">
             <p className="text-brand-light text-xl">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </main>

      <footer className="bg-brand-card mt-12 border-t border-gray-700">
        <div className="container mx-auto px-6 py-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Maxi Pesca. Todos los derechos reservados.</p>
        </div>
      </footer>

      <ProductModal product={selectedProductDetails} onClose={closeModals} />
      <ContactModal show={!!selectedProductContact} onClose={closeModals} product={selectedProductContact} />
    </div>
  );
}


