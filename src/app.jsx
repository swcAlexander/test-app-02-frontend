import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import PromotePage from './pages/PromotePage';
import IncomePage from './pages/IncomePage';
import HelpPage from './pages/HelpPage';
import { Layout } from './componens/layout/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EventsPage />} />
          <Route path="income" element={<IncomePage />} />
          <Route path="promote" element={<PromotePage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
