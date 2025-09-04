import React, { useState, useEffect } from 'react';

// --- Datos de ejemplo ---
const initialProducts = [
  {
    id: 1,
    name: 'Caña de Pescar "Río Pro"',
    category: 'Cañas',
    price: 89.99,
    description: 'Caña de fibra de carbono ultraligera, ideal para spinning en ríos y lagos. Longitud de 2.10m.',
    image: 'https://placehold.co/600x400/4f46e5/ffffff?text=Caña+de+Pescar',
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
    image: 'https://placehold.co/600x400/4f46e5/ffffff?text=Caña+Fly',
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
    <div className="bg-brand-card rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out border border-gray-700">
      <img src={product.image} alt={`Imagen de ${product.name}`} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col h-full">
        <span className="text-xs bg-brand-primary/20 text-brand-primary px-2 py-1 rounded-full self-start">{product.category}</span>
        <h3 className="text-lg font-semibold my-2 text-white">{product.name}</h3>
        <p className="text-brand-light text-sm mb-4 h-16 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-2xl font-bold text-brand-secondary">${product.price.toFixed(2)}</span>
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


// --- Componente Principal: App ---
export default function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Simula la carga de datos
  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="bg-brand-dark min-h-screen font-sans text-brand-light">
      {/* Encabezado */}
      <header className="bg-brand-card/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* He añadido una referencia a tu logo. Deberías colocar "1000153989.jpg" en la carpeta `public` de tu proyecto. */}
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
        {filteredProducts.length > 0 ? (
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
