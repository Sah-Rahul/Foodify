import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/clientUi/Navbar";
import Footer from "./components/clientUi/Footer";
import Home from "./components/clientUi/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-[80vh] pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
