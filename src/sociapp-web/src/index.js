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
import UserProfile from './pages/UserProfile/UserProfile';
import Home from './pages/Home/Home';
import Users from './pages/Users/Users';
import Post from './pages/Post/Post';
import Chat from './pages/Chat/Chat';

import 'tw-elements';
import NewPost from './pages/NewPost/NewPost';
import FriendRequests from './pages/FriendRequests/FriendRequests';

const container = document.getElementById('root');
const root = createRoot(container);

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
          <Route path="users" element={<Users />} />
          <Route path="userprofile/:userEmail" element={<UserProfile />} />
          <Route path="friendrequests" element={<FriendRequests />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider> 
);