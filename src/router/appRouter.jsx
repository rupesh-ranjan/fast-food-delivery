import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Body from "../components/Body.jsx";
import About from "../components/About.jsx";
import AboutClass from "../components/AboutClass.jsx";
import Contact from "../components/Contact.jsx";
import Error from "../components/Error.jsx";
import RestaurantMenu from "../components/RestaurantMenu.jsx";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Body /> },
      // { path: "/about", element: <About /> },
      { path: "/about", element: <AboutClass /> },
      { path: "/contact", element: <Contact /> },
      { path: "/restaurant/:restaurantId", element: <RestaurantMenu /> },
    ],
    errorElement: <Error />,
  },
]);
