import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Client from "shopify-buy";
import "../public/app.css";
import "./styles/index.css";
const client = Client.buildClient({
  storefrontAccessToken: "b4d7cc0c1651dc07c6914769ae59c4ec",
  domain: "clovenut.myshopify.com",
});

ReactDOM.render(<App client={client} />, document.getElementById("root"));
