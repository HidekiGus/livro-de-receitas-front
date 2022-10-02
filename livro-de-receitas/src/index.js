import ReactDOM from "react-dom";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./reset.css";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>

      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.querySelector(".root"));