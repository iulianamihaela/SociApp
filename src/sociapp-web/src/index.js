import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './pages/Layout/Layout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';

import 'tw-elements';
import NewPost from './pages/NewPost/NewPost';

const container = document.getElementById('root');
const root = createRoot(container);
// const history = syncHistoryWithStore(createBrowserHistory, store)

root.render(
  <Provider store={store}>
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="newpost" element={<NewPost />} />
          <Route path="home" element={<Home />} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider> 
);