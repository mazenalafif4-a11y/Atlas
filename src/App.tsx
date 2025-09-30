import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Submit } from './pages/Submit';
import { Status } from './pages/Status';
import { HowItWorks } from './pages/HowItWorks';
import { Authorities } from './pages/Authorities';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/status" element={<Status />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/authorities" element={<Authorities />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;