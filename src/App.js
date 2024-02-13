import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Bloggers from './components/Bloggers';
import RecentPosts from './components/RecentPosts';
import CreateUser from './components/CreateUser';
import CreatePost from './components/CreatePost';
import AllPosts from './components/AllPosts';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Bloggers />} />
            <Route path="/recent-posts" element={<RecentPosts />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/all-post" element={<AllPosts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
