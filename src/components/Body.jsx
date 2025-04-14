import { useEffect, useState } from "react";
import { restaurants } from "../assets/data/restaurants-details.json";
import { RestaurantCard } from "./RestaurantCard";

export function Body() {
    const [restaurantsData, setRestaurantsData] = useState(restaurants);
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4444751&lng=78.3858388&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await JSON.parse(data);
        console.log(json);
    }

    function handleClick() {
        setRestaurantsData(
            restaurantsData.filter((restaurant) => restaurant.avgRating > 4.5)
        );
    }
    return (
        <div className="body">
            <div className="filter">
                <button className="filter-btn" onClick={handleClick}>
                    Top Rated Restaurant
                </button>
            </div>
            {/* <Search /> */}
            <div className="search">Search</div>
            <div className="restaurants-container">
                {restaurantsData.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurantData={restaurant}
                    />
                ))}
            </div>
        </div>
    );
}
