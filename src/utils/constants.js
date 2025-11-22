// Function to get user's current location
export const getUserLocation = () => {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            // Fallback to default location (Hyderabad)
            resolve({ lat: 17.4444751, lng: 78.3858388 });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                console.warn(
                    "Geolocation failed, using default location:",
                    error
                );
                // Fallback to default location (Hyderabad)
                resolve({ lat: 17.4444751, lng: 78.3858388 });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000, // 5 minutes cache
            }
        );
    });
};

// Function to generate API URLs with dynamic coordinates
export const getMenuAPI = async (restaurantId) => {
    const { lat, lng } = await getUserLocation();
    return `/api/swiggy/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;
};

export const getRestaurantAPI = async () => {
    const { lat, lng } = await getUserLocation();
    return `/api/swiggy/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
};

// Legacy constants for backward compatibility (will be deprecated)
export const MENU_API =
    "/api/swiggy/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4444751&lng=78.3858388&restaurantId=";

export const RESTAURANT_API =
    "/api/swiggy/dapi/restaurants/list/v5?lat=17.4444751&lng=78.3858388&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

export const GITHUB_API = "https://api.github.com/users/rupesh-ranjan";

export const RESTAURANT_IMG_CDN_URL =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const navItems = [
    ["Home", "/"],
    ["About", "/about"],
    ["Contact", "/contact"],
    ["Cart", "/cart"],
    ["Grocery", "/grocery"],
];
