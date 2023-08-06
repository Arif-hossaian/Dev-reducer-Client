import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components';
import Test from './components/Test';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
