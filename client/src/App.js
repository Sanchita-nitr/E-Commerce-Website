
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import HomePage from './pages/HomePage';
import PagenotFound from './pages/PagenotFound';
import Policy from './pages/Policy';
import Register from './pages/auth/Register';
import { ToastContainer} from 'react-toastify';
import Login from './pages/auth/Login';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
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
