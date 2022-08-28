import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import "./common.css"

import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from './pages/login/login';
import Home from './pages/home/home';
import Casino from './pages/casino/casino';
import Gacha from './pages/gacha/gacha';
import Collection from './pages/collection/collection';
import Stats from './pages/stats/stats';
import Achievements from './pages/achievements/achievements';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/casino' element={<Casino />} />
      <Route path='/gacha' element={<Gacha />} />
      <Route path='/collection' element={<Collection />} />
      <Route path='/stats' element={<Stats />} />
      <Route path='/achievements' element={<Achievements />} />
    </Routes>
   </BrowserRouter>
  </>
);
