import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Navbar from "./components/Nabvar";
import Home from "./pages/Home";
import ByName from "./pages/ByName";
import ByCurrency from "./pages/ByCurrency";
import ByLanguage from "./pages/ByLanguage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/por-nombre" element={<ByName />} />
        <Route path="/por-divisa" element={<ByCurrency />} />
        <Route path="/por-idioma" element={<ByLanguage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}