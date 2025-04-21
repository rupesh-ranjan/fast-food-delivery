import React from "react";

const MenuShimmer = () => {
  const renderSection = (itemCount) => (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-5 w-40 bg-gray-200 rounded"></div>
        <div className="h-6 w-6 bg-gray-200 rounded"></div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: itemCount }).map((_, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded-lg">
            <div className="w-full h-40 bg-gray-200 rounded-lg mb-3"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 animate-pulse">
      {/* Restaurant Header */}
      <div className="mb-6">
        <div className="h-8 w-64 bg-gray-200 rounded mb-3"></div>
        <div className="flex gap-4 mb-3">
          <div className="h-5 w-24 bg-gray-200 rounded"></div>
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
          <div className="h-5 w-36 bg-gray-200 rounded"></div>
        </div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        {["All", "Veg", "Non-Veg"].map((_, index) => (
          <div key={index} className="h-10 w-20 bg-gray-200 rounded-full"></div>
        ))}
      </div>

      {/* Menu Sections */}
      {renderSection(3)}
      {renderSection(2)}
      {renderSection(4)}
      {renderSection(3)}
      {renderSection(2)}
    </div>
  );
};

export default MenuShimmer;
