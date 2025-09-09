import React from 'react';

/**
 * Componente que muestra un marcador de posición esquelético para una tarjeta de producto.
 * Utiliza una animación de pulso para indicar que el contenido se está cargando.
 */
const ProductCardSkeleton = () => (
  <div className="bg-brand-card rounded-lg shadow-lg overflow-hidden border border-gray-700 flex flex-col">
    {/* Placeholder para la imagen */}
    <div className="p-4 bg-gray-700/50 animate-pulse h-40 w-full"></div>
    
    <div className="p-4 flex flex-col flex-grow">
      {/* Placeholder para el nombre del producto */}
      <div className="h-6 bg-gray-700/50 rounded w-3/4 mx-auto animate-pulse mb-4"></div>
      
      {/* Placeholder para el texto secundario */}
      <div className="h-4 bg-gray-700/50 rounded w-1/2 mx-auto animate-pulse mb-4"></div>
      
      {/* Placeholder para los botones */}
      <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-600">
        <div className="h-10 bg-gray-700/50 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-700/50 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default ProductCardSkeleton;
