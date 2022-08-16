import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import "./common.css"

import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from './pages/login/login';
import Home from './pages/home/home';
import Casino from './pages/casino/casino';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/casino' element={<Casino />} />
    </Routes>
   </BrowserRouter>
  </>
);
