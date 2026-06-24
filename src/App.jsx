import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
// import AdminHome from "./pages/Admin/AdminHome";
import Dashboard from "./pages/Admin/Dashboard";
// import { CartProvider } from "./components/Customer/Context/CartContext";
import Home from "./pages/Customer/Home";
// import Home from "./pages/Home";
// import Home from "./pages/User/Home";
import AddProduct from "./pages/Admin/AddProduct";
import Inventory from "./pages/Admin/Inventory";
import Products from "./pages/Admin/Products";
import Orders from "./pages/Admin/Orders";
import Stores from "./pages/Admin/Stores";
import Customers from "./pages/Admin/Customers";
import DeliveryPartners from "./pages/Admin/DeliveryPartners";
import Analytics from "./pages/Admin/Analytics";
import Coupons from "./pages/Admin/Coupons";
import Notifications from "./pages/Admin/Notifications";
import Settings from "./pages/Admin/Settings";
import Search from "./pages/Customer/Search";
import Profile from "./pages/Customer/Profile";
import Checkout from "./pages/Customer/Checkout";
import { CartProvider } from "./components/Customer/CartContext";
import AddStore from "./pages/Admin/AddStore";
import CreateCoupon from "./pages/Admin/CreateCoupon";
import Managers from "./pages/Admin/Managers";
import AddManager from "./pages/Admin/AddManager";
import { AuthProvider } from "./components/Auth/AuthContext";
import Login from "./pages/Admin/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ServerDown from "./pages/ServerDown";

const App = () => {
  return (
    <>
      <Toaster />
      <AuthProvider>
      <CartProvider>
        <Routes>
          {/* Customer Route */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/503" element={<ServerDown />} />

          {/* Admin Routes Grouped under /admin */}
          
          <Route >
            <Route path="/admin/login" element={<Login />} />
            {/* 'index' means this loads exactly on /admin */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Dashboard />} />
              {/* This loads on /admin/add-product */}
              <Route path="/admin/add-product" element={<AddProduct />} />
              <Route path="/admin/inventory" element={<Inventory />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/stores" element={<Stores />} />
              <Route path="/admin/customers" element={<Customers />} />
              <Route path="/admin/managers" element={<Managers />} />
              <Route path="/admin/add-manager" element={<AddManager />} />
              <Route path="/admin/delivery" element={<DeliveryPartners />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/coupons" element={<Coupons />} />
              <Route path="/admin/notifications" element={<Notifications />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/admin/stores/add" element={<AddStore />} />
              <Route path="/admin/coupons/add" element={<CreateCoupon />} />
            </Route>
          </Route>
        </Routes>
      </CartProvider>
      </AuthProvider>
    </>
  );
};

export default App;
