import React from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

function BasePage({ children }) {
  return (
    <div className="App">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}

export default BasePage;
