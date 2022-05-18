import React from "react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import "typeface-roboto";
import "../styles/globals.css";
import "../styles/tailwind.css";
import Layout from "../components/ui/Layout";

import store from "../Redux/store";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout title="Home">
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
