import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-16">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-primary"></div>
    <p className="ml-4 text-xl text-brand-light">Cargando productos...</p>
  </div>
);

export default LoadingSpinner;
