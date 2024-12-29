
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import HomePage from './pages/HomePage';
import PagenotFound from './pages/PagenotFound';
import Policy from './pages/Policy';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/auth/ForgotPassword';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<PrivateRoute/>}>  <Route path='' element={<Dashboard/>} /></Route> 
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PagenotFound />} />


      </Routes>


    </>
  );
}

export default App;
