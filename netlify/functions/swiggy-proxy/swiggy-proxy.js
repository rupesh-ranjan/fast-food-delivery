import { get } from "axios";

export async function handler(event) {
  const { lat = "17.4444751", lng = "78.3858388" } =
    event.queryStringParameters;

  const swiggyURL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

  try {
    const response = await get(swiggyURL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `${error} Failed to fetch from Swiggy` }),
    };
  }
}
