import "./App.css";
import { Header } from "./components/Header";
import { Body } from "./components/Body";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact.jsx";
import Error from "./components/Error.jsx";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
    errorElement: <Error />,
  },
]);

export default App;
