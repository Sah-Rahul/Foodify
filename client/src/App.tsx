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

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-[80vh] pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search-food/:id" element={<SearchFood />} />
          <Route path="/resturent/:id" element={<ResturentMenu />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/order" element={<Order />} />

         //  admin routes 
          <Route path="/admin/resturent" element={<Resturent />} />
          <Route path="/admin/menu" element={<AddMenu />} />
          <Route path="/admin/orders" element={<Orders />} />

        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
