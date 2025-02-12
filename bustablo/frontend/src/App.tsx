import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content flex">
        <Sidebar />
        <div className="content flex-1 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
