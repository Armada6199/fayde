"use client";
import React from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Providers from "./components/Providers";
import "../styles/styles.css";
function layout({ children }) {
  return (
    <html>
      <head></head>
      <body>
        <Providers>
          <Header />
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}

export default layout;
