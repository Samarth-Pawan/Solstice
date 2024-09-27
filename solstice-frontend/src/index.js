import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client'
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
