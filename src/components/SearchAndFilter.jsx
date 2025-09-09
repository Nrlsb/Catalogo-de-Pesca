import React from 'react';

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

export default SearchAndFilter;
