import { restaurants } from "../assets/data/restaurants-details.json";
import { RestaurantCard } from "./RestaurantCard";

export function Body() {
    return (
        <div className="body">
            {/* <Search /> */}
            <div className="search">Search</div>
            <div className="restaurants-container">
                {restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.info.id}
                        restaurantData={restaurant.info}
                    />
                ))}
            </div>
        </div>
    );
}
