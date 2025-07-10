import React, { useEffect, useState } from "react";
import { getMenuAPI } from "./constants";

export function useRestaurantMenu(restaurantId) {
    const [restaurantData, setRestaurantData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurantMenu = async () => {
            try {
                setLoading(true);
                setError(null);

                // Get dynamic API URL based on user's location
                const apiUrl = await getMenuAPI(restaurantId);
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setRestaurantData(data.data);
            } catch (err) {
                console.error("Error fetching restaurant menu:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (restaurantId) {
            fetchRestaurantMenu();
        }
    }, [restaurantId]);

    return { restaurantData, loading, error };
}
