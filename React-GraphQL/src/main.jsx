import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    // Apollo Server standalone serves GraphQL at the server root by default.
    // Use the server URL (no /graphql) to avoid 'Failed to fetch' when paths differ.
    uri: "http://localhost:4000/",
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
