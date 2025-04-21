import MenuItem from "./MenuItem";
const MenuAccordion = ({ category, isOpen, setShowIndex }) => {
  const itemCards = category?.itemCards || [];
  const title = category?.title || "Menu Category";
  const count = itemCards.length;

  return (
    <div className="border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => {
          isOpen ? setShowIndex(-1) : setShowIndex();
        }}
      >
        <h3 className="text-lg font-semibold text-gray-800">
          {title} {count > 0 ? `(${count})` : ""}
        </h3>
        <span className="text-2xl">{isOpen ? "−" : "+"}</span>
      </div>

      {isOpen && (
        <div className="p-4 border-t">
          {itemCards.length > 0 ? (
            itemCards.map((item) => {
              const info = item?.card?.info || {};
              return <MenuItem key={info.id} info={info} />;
            })
          ) : (
            <div className="text-gray-500 text-center py-4">
              No items available in this category
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuAccordion;
