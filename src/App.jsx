
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./App.css";
import Products from "./pages/Products";
import { useEffect, useState } from "react";
import Cart from "./pages/Cart";
import { Route, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import Toast from "./components/Toast";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";

// Safely read data from localStorage.
const readStorage = (key) => {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : [];
  } catch {
    return [];
  }
};

// Support older Fake Store product data as well as DummyJSON data.
const normalizeProduct = (product) => ({
  ...product,
  title: product.title || product.name || "Untitled Product",
  thumbnail:
    product.thumbnail ||
    product.images?.[0] ||
    product.image ||
    "",
  rating:
    typeof product.rating === "object"
      ? product.rating?.rate
      : product.rating,
});

const App = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = readStorage("cart");

    if (!Array.isArray(savedCart)) return [];

    return savedCart.map((item) => ({
      ...normalizeProduct(item),
      quantity:
        Number.isFinite(item.quantity) && item.quantity > 0
          ? item.quantity
          : 1,
    }));
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = readStorage("wishlist");

    if (!Array.isArray(savedWishlist)) return [];

    return savedWishlist.map(normalizeProduct);
  });

  const [toast, setToast] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  const addToCart = (product) => {
    const normalizedProduct = normalizeProduct(product);
    const existingItem = cart.find(
      (item) => item.id === normalizedProduct.id
    );

    if (
      existingItem &&
      Number.isFinite(normalizedProduct.stock) &&
      existingItem.quantity >= normalizedProduct.stock
    ) {
      setToast({
        message: "Maximum available stock reached.",
        type: "error",
      });
      return;
    }

    setCart((prev) => {
      const alreadyAdded = prev.some(
        (item) => item.id === normalizedProduct.id
      );

      if (alreadyAdded) {
        return prev.map((item) =>
          item.id === normalizedProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        { ...normalizedProduct, quantity: 1 },
      ];
    });

    setToast({
      message: "Product added to cart successfully!",
      type: "success",
    });
  };

  const removeFromCart = (product) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== product.id)
    );
  };

  const increment = (product) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== product.id) return item;

        if (
          Number.isFinite(item.stock) &&
          item.quantity >= item.stock
        ) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  const decrement = (product) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleWishlist = (product) => {
    const normalizedProduct = normalizeProduct(product);

    setWishlist((prev) =>
      prev.some((item) => item.id === normalizedProduct.id)
        ? prev.filter(
          (item) => item.id !== normalizedProduct.id
        )
        : [...prev, normalizedProduct]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <>
      <ScrollToTop />
      <Navbar
        cart={cart}
        wishlist={wishlist}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <div className="h-[120px] md:h-[68px]" aria-hidden="true" />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              wishlist={wishlist}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
            />
          }
        />

        {/* All Products Page */}
        <Route
          path="/products"
          element={
            <Products
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
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
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              increment={increment}
              decrement={decrement}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Checkout
                cart={cart}
                clearCart={clearCart}
                setToast={setToast}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
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
