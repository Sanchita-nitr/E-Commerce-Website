
import { Route, Routes } from 'react-router-dom';
import AdminRoute from './components/Routes/AdminRoute';
import PrivateRoute from './components/Routes/PrivateRoute';
import About from './pages/About';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminOrders from './pages/Admin/AdminOrders';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Users from './pages/Admin/Users';
import CartPage from './pages/CartPage';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import Contact from './pages/Contact';
import Details from './pages/Details';
import HomePage from './pages/HomePage';
import PagenotFound from './pages/PagenotFound';
import PaymentDetails from './pages/PaymentDetails';
import Policy from './pages/Policy';
import Search from './pages/Search';
import WishlistPage from './pages/WishlistPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/user/UserProfile';
import Dashboard from './pages/user/UserDashboard';
import Orders from './pages/user/UserOrders';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path='/paymentdetails' element={<PaymentDetails />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:slug" element={<Details />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/orders" element={<Orders />} />
          </Route>
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </>
  );
}

export default App;
