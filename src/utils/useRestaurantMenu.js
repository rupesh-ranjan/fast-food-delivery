import React, { useEffect, useState } from "react";
import MENU_MOCK from "../components/mocks/restaurantMenuMock.json";
import RESTAURANT_DETAILS from "../assets/data/restaurants-details.json";
import { CUISINE_MENU_ITEMS } from "./mockMenuData";

export function useRestaurantMenu(restaurantId) {
    const [restaurantData, setRestaurantData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurantMenu = async () => {
            try {
                setLoading(true);
                setError(null); 

                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Use mock data instead of API call
                // Deep copy to avoid mutating the original mock
                const data = JSON.parse(JSON.stringify(MENU_MOCK));
                
                // Find the specific restaurant details
                const restaurantDetail = RESTAURANT_DETAILS.restaurants.find(
                    (res) => res.id === restaurantId
                );

                if (restaurantDetail && data.data && data.data.cards) {
                    // Update Restaurant Info Card (Index 2 usually contains the info)
                    const infoCard = data.data.cards.find(c => c.card?.card?.info?.id);
                    if (infoCard) {
                        const info = infoCard.card.card.info;
                        info.name = restaurantDetail.name;
                        info.city = "Hyderabad"; // Default or from detail if available
                        info.cloudinaryImageId = restaurantDetail.cloudinaryImageId;
                        info.costForTwoMessage = restaurantDetail.costForTwo;
                        info.cuisines = restaurantDetail.cuisines;
                        info.avgRating = restaurantDetail.avgRating;
                        info.sla.deliveryTime = restaurantDetail.deliveryTime;
                        info.id = restaurantDetail.id;
                    }

                    // Update Header Name (Index 0 usually)
                    if (data.data.cards[0]?.card?.card?.text) {
                         data.data.cards[0].card.card.text = restaurantDetail.name;
                    }

                    // Inject Cuisine Specific Menu Items
                    // Try to find a matching cuisine from our mock data
                    let selectedCuisineItems = null;
                    let cuisineName = "Recommended";

                    for (const cuisine of restaurantDetail.cuisines) {
                        if (CUISINE_MENU_ITEMS[cuisine]) {
                            selectedCuisineItems = CUISINE_MENU_ITEMS[cuisine];
                            cuisineName = cuisine;
                            break;
                        }
                    }

                    // Fallback to North Indian if no match, or keep Pizza if it's a Pizza place
                    if (!selectedCuisineItems && !restaurantDetail.cuisines.includes("Pizzas")) {
                         selectedCuisineItems = CUISINE_MENU_ITEMS["North Indian"];
                         cuisineName = "North Indian";
                    }

                    if (selectedCuisineItems) {
                        // Find the Regular Menu Group
                        // Usually cards[2] -> groupedCard -> cardGroupMap -> REGULAR -> cards
                        // We need to find the card that has "itemCards"
                        const groupedCard = data.data.cards.find(c => c.groupedCard);
                        if (groupedCard?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
                             const menuCards = groupedCard.groupedCard.cardGroupMap.REGULAR.cards;
                             
                             // Find the first category with itemCards (usually "Recommended")
                             const recommendedCard = menuCards.find(c => c.card?.card?.itemCards);
                             
                             if (recommendedCard) {
                                 // Update Title
                                 recommendedCard.card.card.title = `Recommended ${cuisineName}`;
                                 
                                 // Map our generic items to the Swiggy Item structure
                                 recommendedCard.card.card.itemCards = selectedCuisineItems.map(item => ({
                                     card: {
                                         info: {
                                             id: item.id,
                                             name: item.name,
                                             description: item.description,
                                             imageId: item.imageId,
                                             price: item.price,
                                             defaultPrice: item.price,
                                             isVeg: item.isVeg,
                                             inStock: 1,
                                             ratings: {
                                                 aggregatedRating: {
                                                     rating: "4.2",
                                                     ratingCountV2: "100"
                                                 }
                                             }
                                         }
                                     }
                                 }));
                             }
                        }
                    }
                }
                
                // Assuming setRestaurant should be setRestaurantData to match the state variable
                setRestaurantData(data.data);
            } catch (err) {
                console.error("Error fetching menu:", err); // Updated console message
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
