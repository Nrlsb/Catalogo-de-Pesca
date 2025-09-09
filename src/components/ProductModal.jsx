import React from 'react';

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

export default ProductModal;
