import { useEffect, useState } from "react";
import RESTAURANTS_MOCK from "../components/mocks/restaurantsListMock.json";

export const useRestaurants = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            setLoading(true);
            setError(null);

            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Use mock data instead of API call
            const data = RESTAURANTS_MOCK;
            
            const restaurants =
                data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
                    ?.restaurants;

            setAllRestaurants(restaurants || []);
            setFilteredRestaurants(restaurants || []);
        } catch (err) {
            console.error("Error fetching restaurants:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        allRestaurants,
        filteredRestaurants,
        setFilteredRestaurants,
        loading,
        error,
        refetch: fetchData,
    };
};
