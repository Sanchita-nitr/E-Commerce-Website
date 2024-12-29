
import { Route, Routes } from 'react-router-dom';
import AdminRoute from './components/Routes/AdminRoute';
import PrivateRoute from './components/Routes/Private';
import About from './pages/About';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Contact from './pages/Contact';
import HomePage from './pages/HomePage';
import PagenotFound from './pages/PagenotFound';
import Policy from './pages/Policy';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/user/Dashboard';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<PrivateRoute />}>  <Route path='user' element={<Dashboard />} /></Route>
        <Route path='/dashboard' element={<AdminRoute />}>  <Route path='admin' element={<AdminDashboard />} /></Route>
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
