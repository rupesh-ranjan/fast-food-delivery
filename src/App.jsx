import "./App.css";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    // some API call to fetch user data
    const data = {
      name: "Rupesh Ranjan",
    };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <Header />
        <main className="pt-20 min-h-screen">
          <Outlet />
        </main>
      </UserContext.Provider>
    </Provider>
  );
}

export default App;
