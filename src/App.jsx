import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Home, ProductPage, ContactPage, CheckoutSuccessPage, CartPage, CheckoutPage } from "./pages";



function App() {
  return (
      <CartProvider>
          <div className="">
              <Header />
              <main>
              <Routes>
                  <Route index element={<Home />} />
                  <Route path="product/:id" element={<ProductPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="checkoutSuccess" element={<CheckoutSuccessPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
              </Routes>
              </main>
              <Footer />
          </div>
      </CartProvider>
  );
}

export default App;
