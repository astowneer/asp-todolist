import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
    <ToastContainer position="bottom-right" toastClassName="notification" />
  </StrictMode>
);
