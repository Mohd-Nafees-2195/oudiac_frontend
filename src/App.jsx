import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
// import AdminHome from "./pages/Admin/AdminHome";
import Dashboard from "./pages/Admin/Dashboard";
// import { CartProvider } from "./components/Customer/Context/CartContext";
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
import { CartProvider } from "./components/Customer/CartContext";
import AddStore from "./pages/Admin/AddStore";
import CreateCoupon from "./pages/Admin/CreateCoupon";
import Managers from "./pages/Admin/Managers";
import AddManager from "./pages/Admin/AddManager";
import { AuthProvider } from "./components/Auth/AuthContext";
import Login from "./pages/Admin/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ServerDown from "./pages/ServerDown";
import AdminOtpVarify from "./pages/Admin/AdminOtpVarify";
import AddNew from "./pages/Admin/AddNew";
import LandingPage from "./pages/Customer/LandingPage";
import LoginPage from "./pages/Customer/LoginPage";
import CustomerOtpVarify from "./pages/Customer/CustomerOtpVarify";
import CustomerServerDown from "./pages/Customer/CustomerServerDown";
import Home from "./pages/Customer/Home";
import { AppProvider } from "./components/Customer/context/AppContext";
import BrowsePage from "./pages/Customer/BrowsePage";
import CartPage from "./pages/Customer/CartPage";
import ProductPage from "./pages/Customer/ProductPage";
import AddAddressPage from "./pages/Customer/AddAddress";
import AddAddress from "./pages/Customer/AddAddress";
import PaymentPage from "./pages/Customer/PaymentPage";
import PaymentStatus from "./pages/Customer/PaymentStatus";
import MyList from "./pages/Customer/MyList";
import MyOrders from "./pages/Customer/MyOrders";

const App = () => {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <AppProvider>
          <Routes>
            {/* Customer Route */}
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/server-dwon" element={<CustomerServerDown />} />
            <Route path="/otp-verify" element={<CustomerOtpVarify />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment-status" element={<PaymentStatus />} />
            <Route path="/product/:id/:categoryId" element={<ProductPage />} />
            {/* Start with product page */}

            {/* Admin Routes Grouped under /admin */}

            <Route>
              <Route path="/503" element={<ServerDown />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/otp-verify" element={<AdminOtpVarify />} />
              {/* 'index' means this loads exactly on /admin */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<Dashboard />} />
                {/* This loads on /admin/add-product */}
                <Route path="/admin/add-product" element={<AddProduct />} />
                <Route path="/admin/inventory" element={<Inventory />} />
                <Route path="/admin/products" element={<Products />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/add-new" element={<AddNew />} />
                <Route path="/admin/stores" element={<Stores />} />
                <Route path="/admin/customers" element={<Customers />} />
                <Route path="/admin/managers" element={<Managers />} />
                <Route path="/admin/add-manager" element={<AddManager />} />
                <Route path="/admin/delivery" element={<DeliveryPartners />} />
                <Route path="/admin/analytics" element={<Analytics />} />
                <Route path="/admin/coupons" element={<Coupons />} />
                <Route
                  path="/admin/notifications"
                  element={<Notifications />}
                />
                <Route path="/admin/settings" element={<Settings />} />
                <Route path="/admin/stores/add" element={<AddStore />} />
                <Route path="/admin/coupons/add" element={<CreateCoupon />} />
              </Route>
            </Route>
          </Routes>
        </AppProvider>
      </AuthProvider>
    </>
  );
};

export default App;
