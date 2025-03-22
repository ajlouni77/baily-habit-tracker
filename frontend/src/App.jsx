// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HabitList from "./pages/HabitList";
import AddHabit from "./pages/AddHabit";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HabitList />} />
          <Route path="/add-habit" element={<AddHabit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
