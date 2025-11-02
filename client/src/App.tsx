import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/clientUi/Navbar";
import Footer from "./components/clientUi/Footer";
import Home from "./components/clientUi/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Profile from "./components/clientUi/Profile";
import SearchFood from "./components/clientUi/SearchFood";
import ResturentMenu from "./components/clientUi/ResturentMenu";
import Cart from "./components/clientUi/Cart";
import Resturent from "./admin/Resturent";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import Order from "./components/clientUi/Order";
import { Toaster } from "sonner";
import {
  AdminRoute,
  AuthRoute,
  ProtectedRoute,
} from "./components/clientUi/ProtectedRoutes";
import { useUserStore } from "./zustand/useUserStore";
import { useEffect } from "react";
import Loading from "./components/clientUi/Loading";

const App = () => {
  const { checkAuthentication, isCheckingAuth } = useUserStore();
  // checking auth every time when page is loaded
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <Loading />;
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-[80vh] pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-food/:id" element={<SearchFood />} />
          <Route path="/resturent/:id" element={<ResturentMenu />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/resturent"
            element={
              <AdminRoute>
                <Resturent />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/menu"
            element={
              <AdminRoute>
                <AddMenu />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <Orders />
              </AdminRoute>
            }
          />

          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                {" "}
                <Signup />
              </AuthRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <AuthRoute>
                {" "}
                <ForgotPassword />{" "}
              </AuthRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
