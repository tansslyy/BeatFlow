import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { TrackPage } from "./pages/TrackPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/track/:slug" element={<TrackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
