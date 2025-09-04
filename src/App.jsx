import React, { useState, useEffect } from 'react';

// --- Componente: Ícono de Carrito ---
const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

// --- Componente: Tarjeta de Producto ---
const ProductCard = ({ product }) => {
  // Asegurarse de que el precio se muestre correctamente si es un número o un texto.
  const displayPrice = typeof product.price === 'number' 
    ? `$${product.price.toFixed(2)}` 
    : product.price;

  return (
    <div className="bg-brand-card rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out border border-gray-700">
      <img 
        src={product.image || 'https://placehold.co/600x400/1f2937/d1d5db?text=Producto'} 
        alt={`Imagen de ${product.name}`} 
        className="w-full h-48 object-cover" 
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1f2937/d1d5db?text=Error+Imagen'; }}
      />
      <div className="p-4 flex flex-col h-full">
        <span className="text-xs bg-brand-primary/20 text-brand-primary px-2 py-1 rounded-full self-start">{product.category}</span>
        <h3 className="text-lg font-semibold my-2 text-white">{product.name}</h3>
        <p className="text-brand-light text-sm mb-4 h-24 flex-grow overflow-auto">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-bold text-brand-secondary">{displayPrice}</span>
          <button className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50 transition-colors duration-200 flex items-center gap-2">
            <ShoppingCartIcon />
            <span className="hidden sm:inline">Añadir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Componente: Barra de Búsqueda y Filtros ---
const SearchAndFilter = ({ searchTerm, setSearchTerm, filterCategory, setFilterCategory, categories }) => {
  return (
    <div className="bg-brand-card/80 backdrop-blur-sm p-4 rounded-lg shadow-lg mb-8 sticky top-4 z-10 border border-gray-700">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar cañas, señuelos, carretes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-3 bg-brand-dark border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-3 bg-brand-dark border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
        >
          <option value="All">Todas las categorías</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

// --- Componente de Carga ---
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-primary"></div>
    <p className="ml-4 text-xl text-brand-light">Cargando productos...</p>
  </div>
);

// --- Componente Principal: App ---
export default function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga de datos desde la API del backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Usamos una variable de entorno para la URL de la API, con un valor por defecto para desarrollo local
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        console.error("Error al obtener los productos:", e);
        setError("No se pudieron cargar los productos. Asegúrate de que el servidor backend esté funcionando y que la URL de la API sea correcta.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const name = product.name || '';
    const matchesSearchTerm = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="bg-brand-dark min-h-screen font-sans text-brand-light">
      {/* Encabezado */}
      <header className="bg-brand-card/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/1000153989.jpg" alt="PescaShop Logo" className="h-12 w-auto" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-yellow-300">
              PescaShop
            </h1>
          </div>
          <nav>
            <a href="#" className="text-brand-light hover:text-brand-secondary mx-3 transition-colors">Inicio</a>
            <a href="#" className="text-brand-light hover:text-brand-secondary mx-3 transition-colors">Ofertas</a>
            <a href="#" className="text-brand-light hover:text-brand-secondary mx-3 transition-colors">Contacto</a>
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="container mx-auto px-6 py-8">
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          categories={categories}
        />

        {/* Malla de Productos */}
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-16 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p className="text-xl">{error}</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-brand-card rounded-lg">
             <p className="text-brand-light text-xl">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </main>

      {/* Pie de Página */}
      <footer className="bg-brand-card mt-12 border-t border-gray-700">
        <div className="container mx-auto px-6 py-6 text-center">
          <p>&copy; 2025 PescaShop. Todos los derechos reservados.</p>
          <p className="text-sm text-gray-400">Tu tienda de confianza para equipamiento de pesca.</p>
        </div>
      </footer>
    </div>
  );
}

