
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./App.css";
import Products from "./pages/Products";
import { useState } from "react";
import useCartStore from "./store/cartStore";
import Cart from "./pages/Cart";
import { Route, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import Toast from "./components/Toast";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const { cart, wishlist, addToCart, removeFromCart, incrementQuantity, decrementQuantity, toggleWishlist, clearCart } = useCartStore();

  const [toast, setToast] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  const handleAddToCart = (product) => {
    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    if (
      existingItem &&
      Number.isFinite(product.stock) &&
      existingItem.quantity >= product.stock
    ) {
      setToast({
        message: "Maximum available stock reached.",
        type: "error",
      });
      return;
    }

    addToCart(product);
    setToast({
      message: "Product added to cart successfully!",
      type: "success",
    });
  };

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <>
      <ScrollToTop />
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <div className="h-[120px] md:h-[68px]" aria-hidden="true" />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        {/* All Products Page */}
        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Checkout setToast={setToast} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route path="/blog" element={<Blog />} />

        <Route path="/blog/:slug" element={<BlogDetails />} />

      </Routes>

      <Footer />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default App;
