import type { AppProps } from "next/app";
import React from "react";
// Styles
import GlobalStyle from "../styles/globalStyles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
