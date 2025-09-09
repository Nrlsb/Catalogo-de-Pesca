import React from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';

/**
 * Componente que renderiza una cuadrícula de ProductCardSkeleton.
 * @param {object} props - Propiedades del componente.
 * @param {number} [props.count=8] - El número de skeletons a mostrar.
 */
const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
