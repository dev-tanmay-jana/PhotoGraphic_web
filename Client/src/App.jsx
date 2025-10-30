import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Service from './pages/Service.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Contact from './pages/Contact.jsx';
import Error from './pages/Error.jsx';
import Logout from './pages/Logout.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
// App.jsx
import AdminLayout from './components/layouts/AdminLayout.jsx';
import { AdminUsers } from './pages/AdminUsers.jsx';
import { AdminContacts } from './pages/AdminContacts.jsx';
import { AdminUpdate } from './pages/AdminUpdate.jsx';

import './App.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/service' element={<Service />} />
            <Route path='/contact' element={<Contact />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<Error />} />
            <Route path='/admin' element={<AdminLayout />} >
            {/* Admin specific routes can be added here */}
                <Route path="users" element={<AdminUsers />} />
                <Route path="contacts" element={<AdminContacts />} />
                <Route path="users/update/:id" element={<AdminUpdate />} />
            </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;