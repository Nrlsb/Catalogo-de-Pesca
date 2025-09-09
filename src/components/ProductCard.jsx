import React from 'react';

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

export default ProductCard;
