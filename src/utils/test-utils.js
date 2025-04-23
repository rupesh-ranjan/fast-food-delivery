// test-utils.js
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import appStore from "../utils/appStore.js";
import { ThemeProvider } from "../utils/context/ThemeContext.jsx";

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={appStore}>
      <ThemeProvider>
        <Router>{children}</Router>
      </ThemeProvider>
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
