import "./App.css";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default App;
