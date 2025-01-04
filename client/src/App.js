
import { Route, Routes } from 'react-router-dom';
import AdminRoute from './components/Routes/AdminRoute';
import PrivateRoute from './components/Routes/Private';
import About from './pages/About';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Users from './pages/Admin/Users';
import Contact from './pages/Contact';
import HomePage from './pages/HomePage';
import PagenotFound from './pages/PagenotFound';
import Policy from './pages/Policy';
import Search from './pages/Search';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/user/Dashboard';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import ProductDetails from './pages/ProductDetail';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/products/:slug' element={<ProductDetails/>} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/products' element={<Products />} />
          <Route path='admin/products/:slug' element={<UpdateProduct />} />
          <Route path='admin/users' element={<Users />} />
        </Route>
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PagenotFound />} />


      </Routes>


    </>
  );
}

export default App;
