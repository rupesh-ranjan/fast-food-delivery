import MenuItem from "./MenuItem";

const MenuAccordion = ({ category, isOpen, setShowIndex, darkMode }) => {
  const itemCards = category?.itemCards || [];
  const title = category?.title || "Menu Category";
  const count = itemCards?.length;

  return (
    <div
      className={`border rounded-xl shadow-sm hover:shadow-md transition-shadow ${
        darkMode
          ? "bg-gray-800 border-gray-700 hover:shadow-gray-700"
          : "bg-white hover:shadow-gray-200"
      }`}
    >
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => {
          isOpen ? setShowIndex(-1) : setShowIndex();
        }}
      >
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {title} {count > 0 ? `(${count})` : ""}
        </h3>
        <span
          className={`text-2xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </div>

      {isOpen && (
        <div
          className={`p-4 ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } border-t`}
        >
          {itemCards?.length > 0 ? (
            itemCards?.map((item) => {
              const info = item?.card?.info || {};
              return <MenuItem key={info.id} info={info} />;
            })
          ) : (
            <div
              className={`text-center py-4 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No items available in this category
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuAccordion;
