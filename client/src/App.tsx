import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { SetDetails } from "./components/SetDetails";

interface Set {
  name: string;
  description: string;
  _id: string;
}

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/set/:id" element={<SetDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
