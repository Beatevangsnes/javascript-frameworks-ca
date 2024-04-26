import React from "react";
import { Link } from "react-router-dom";
import Products from "../../components/Products";  // Ensure this import is correct
import Search from "../../components/Search";

export function Home() {
  return (
    <>
      <Products />
    </>
  );
}

export default Home;