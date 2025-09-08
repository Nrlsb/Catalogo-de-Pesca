import React, { useState, useEffect } from 'react';

// --- Íconos para el Modal de Contacto ---
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8.4 8.4z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);


// --- Componente: Modal de Contacto ---
const ContactModal = ({ show, onClose, product }) => {
  if (!show) return null;

  const productName = product ? product.name : 'un producto';
  const whatsappLink = `https://api.whatsapp.com/send/?phone=5493496419473&text=Hola,%20estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(productName)}`;
  const instagramLink = "https://www.instagram.com/maxi_pesca2025/";

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-brand-card rounded-lg shadow-2xl w-full max-w-sm relative animate-fade-in-up p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute -top-4 -right-4 h-10 w-10 bg-brand-primary text-white rounded-full shadow-lg hover:bg-indigo-500 transition-transform duration-200 hover:scale-110 z-10"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">CONTACTANOS</h2>

        <div className="flex flex-col gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            <WhatsAppIcon />
            WHATSAPP
          </a>
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors duration-300"
          >
            <InstagramIcon />
            INSTAGRAM
          </a>
        </div>
      </div>
       <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};


// --- Componente: Modal de Detalles del Producto ---
const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const displayPrice = typeof product.price === 'number' 
    ? `$${product.price.toLocaleString('es-AR')}` 
    : product.price;

  const descriptionPoints = product.description.split('. ').filter(point => point);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-brand-card rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute -top-4 -right-4 h-10 w-10 bg-brand-primary text-white rounded-full shadow-lg hover:bg-indigo-500 transition-transform duration-200 hover:scale-110 z-10"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <div className="md:w-1/2 p-6 flex justify-center items-center bg-brand-dark/50 rounded-l-lg">
          <img 
            src={product.image || 'https://placehold.co/600x400/1f2937/d1d5db?text=Producto'} 
            alt={`Imagen de ${product.name}`} 
            className="max-w-full max-h-96 object-contain"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1f2937/d1d5db?text=Error+Imagen'; }}
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <h2 className="text-3xl font-bold text-white mb-4">{product.name}</h2>
          <span className="text-sm bg-brand-primary/20 text-brand-primary px-3 py-1 rounded-full self-start mb-6">{product.category}</span>
          
          <div className="text-brand-light space-y-3">
             <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2 mb-3">Especificaciones</h4>
             <ul className="list-disc list-inside space-y-2">
                {descriptionPoints.map((point, index) => (
                  <li key={index}>{point.trim()}</li>
                ))}
             </ul>
          </div>
          
           <div className="mt-auto pt-6">
             <span className="text-3xl font-bold text-brand-secondary">{displayPrice}</span>
           </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};


// --- Componente: Tarjeta de Producto ---
const ProductCard = ({ product, onDetailsClick, onConsultClick }) => {
  return (
    <div className="bg-brand-card rounded-lg shadow-lg overflow-hidden border border-gray-700 flex flex-col text-center transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <div className="p-4 bg-white">
          <img 
            src={product.image || 'https://placehold.co/600x400/1f2937/d1d5db?text=Producto'} 
            alt={`Imagen de ${product.name}`} 
            className="w-full h-40 object-contain" 
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1f2937/d1d5db?text=Error+Imagen'; }}
          />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-white h-12 flex items-center justify-center">{product.name}</h3>
        <p className="text-brand-light text-sm my-2">Haga clic para más opciones</p>
        
        <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-600">
          <button 
            onClick={() => onDetailsClick(product)}
            className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-opacity-50 transition-colors duration-200">
            Detalles
          </button>
           <button
            onClick={() => onConsultClick(product)}
            className="bg-brand-secondary text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-opacity-50 transition-colors duration-200 flex items-center justify-center"
           >
            Consultar
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Componente: Barra de Búsqueda y Filtros ---
const SearchAndFilter = ({ searchTerm, setSearchTerm, filterCategory, setFilterCategory, categories }) => {
  return (
    <div className="bg-brand-card/80 backdrop-blur-sm p-4 rounded-lg shadow-lg mb-8 sticky top-24 z-10 border border-gray-700">
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
  
  // Estados para los modales
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [selectedProductContact, setSelectedProductContact] = useState(null);

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
    const matchesSearchTerm = name.toLowerCase().includes(searchTerm.toLowerCase());
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
            <a href="#" className="text-brand-light hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-md transition-colors">Inicio</a>
            <a href="#" className="text-brand-light hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-md transition-colors">Ofertas</a>
            <a href="#" className="text-brand-light hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-md transition-colors">Contacto</a>
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
          <LoadingSpinner />
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

