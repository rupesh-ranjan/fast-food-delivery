function Shimmer() {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Search & Filter Shimmer */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl p-6 shadow-xl mb-8 gap-4 animate-pulse">
        <div className="w-full md:w-1/2">
          <div className="h-14 bg-gray-200 rounded-2xl"></div>
        </div>
        <div className="h-14 w-48 bg-gray-200 rounded-2xl"></div>
      </div>

      {/* Restaurant Grid Shimmer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="aspect-video bg-gray-200 animate-pulse"></div>
            <div className="p-5 space-y-4">
              <div className="h-6 bg-gray-200 rounded-full w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-full w-full"></div>
              <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shimmer;
