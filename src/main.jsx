import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async"; // ✅ Importa HelmetProvider correctamente
import App from "./App.jsx";

// ✅ Obtén correctamente el contenedor del DOM
const container = document.getElementById("root");

// ✅ Asegura que `createRoot()` solo se llame una vez
if (!container.__reactRoot) {
  container.__reactRoot = createRoot(container);
}

container.__reactRoot.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
