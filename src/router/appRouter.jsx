import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Body from "../components/Body.jsx";
import About from "../components/About.jsx";
import Cart from "../components/Cart.jsx";
import Contact from "../components/Contact.jsx";
import Error from "../components/Error.jsx";
import RestaurantMenu from "../components/RestaurantMenu.jsx";
import { lazy, Suspense } from "react";

const Grocery = lazy(() => import("../components/Grocery.jsx"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      { path: "/restaurant/:restaurantId", element: <RestaurantMenu /> },
    ],
    errorElement: <Error />,
  },
]);
