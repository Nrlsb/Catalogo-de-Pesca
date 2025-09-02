import React, { useState, useEffect } from 'react';

// --- Datos de ejemplo ---
// En una aplicación real, esto vendría de una API.
const initialProducts = [
  {
    id: 1,
    name: 'Caña de Pescar "Río Pro"',
    category: 'Cañas',
    price: 89.99,
    description: 'Caña de fibra de carbono ultraligera, ideal para spinning en ríos y lagos. Longitud de 2.10m.',
    image: 'https://placehold.co/600x400/3498db/ffffff?text=Caña+de+Pescar',
  },
  {
    id: 2,
    name: 'Carrete Spinning "Tornado 3000"',
    category: 'Carretes',
    price: 125.50,
    description: 'Carrete de alta velocidad con 8 rodamientos de acero inoxidable. Freno delantero preciso.',
    image: 'https://placehold.co/600x400/2ecc71/ffffff?text=Carrete',
  },
  {
    id: 3,
    name: 'Señuelo Articulado "Depredador"',
    category: 'Señuelos',
    price: 15.75,
    description: 'Señuelo de natación realista con múltiples articulaciones. Perfecto para la pesca de dorados y tarariras.',
    image: 'https://placehold.co/600x400/e74c3c/ffffff?text=Señuelo',
  },
  {
    id: 4,
    name: 'Línea de Pesca Trenzada "Invisible"',
    category: 'Líneas',
    price: 22.00,
    description: 'Línea trenzada de 8 hebras, 0.20mm de diámetro y alta resistencia a la abrasión. Bobina de 150m.',
    image: 'https://placehold.co/600x400/9b59b6/ffffff?text=Línea',
  },
  {
    id: 5,
    name: 'Caja de Aparejos "Organizador Total"',
    category: 'Accesorios',
    price: 35.00,
    description: 'Caja robusta con compartimentos ajustables para señuelos, anzuelos y otros accesorios.',
    image: 'https://placehold.co/600x400/f1c40f/ffffff?text=Caja',
  },
  {
    id: 6,
    name: 'Anzuelos Triples "Garra de Acero"',
    category: 'Anzuelos',
    price: 9.50,
    description: 'Paquete de 10 anzuelos triples extra afilados, tamaño #4. Ideales para señuelos.',
    image: 'https://placehold.co/600x400/e67e22/ffffff?text=Anzuelos',
  },
  {
    id: 7,
    name: 'Caña de Fly Cast "Brisa Andina"',
    category: 'Cañas',
    price: 150.00,
    description: 'Caña de 4 tramos para pesca con mosca, número #5. Acción media-rápida.',
    image: 'https://placehold.co/600x400/3498db/ffffff?text=Caña+Fly',
  },
  {
    id: 8,
    name: 'Carrete de Baitcasting "Precisión X"',
    category: 'Carretes',
    price: 180.99,
    description: 'Carrete de bajo perfil con freno magnético para lances precisos y largos.',
    image: 'https://placehold.co/600x400/2ecc71/ffffff?text=Carrete+Bait',
  }
];

// --- Componente: Ícono de Carrito ---
const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

// --- Componente: Tarjeta de Producto ---
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <img src={product.image} alt={`Imagen de ${product.name}`} className="w-full h-48 object-cover" />
      <div className="p-4">
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{product.category}</span>
        <h3 className="text-lg font-semibold my-2 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 h-16">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 flex items-center gap-2">
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
    <div className="bg-white p-4 rounded-lg shadow-md mb-8 sticky top-4 z-10">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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


// --- Componente Principal: App ---
export default function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Simula la carga de datos cuando el componente se monta
  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  // Extrae las categorías únicas de los productos
  const categories = [...new Set(products.map(p => p.category))];

  // Filtra los productos según la búsqueda y la categoría seleccionada
  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Encabezado */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">
            <span role="img" aria-label="fishing-pole" className="mr-2">🎣</span>
            PescaShop
          </h1>
          <nav>
            <a href="#" className="text-gray-600 hover:text-blue-600 mx-3">Inicio</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 mx-3">Ofertas</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 mx-3">Contacto</a>
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
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
             <p className="text-gray-500 text-xl">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </main>

      {/* Pie de Página */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-6 py-4 text-center">
          <p>&copy; 2025 PescaShop. Todos los derechos reservados.</p>
          <p>Tu tienda de confianza para equipamiento de pesca.</p>
        </div>
      </footer>
    </div>
  );
}
