import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/home-layout/Home";
import { SetDetails } from "./components/SetDetails";
import { AddSetForm } from "./components/createNewSet-layout/CreateSetForm";

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-set" element={<AddSetForm />} />
          <Route path="/set/:id" element={<SetDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
