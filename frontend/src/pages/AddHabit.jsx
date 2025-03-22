// src/pages/AddHabit.js
import React, { useState } from "react";
import axios from "axios";

const AddHabit = () => {
  const [habitData, setHabitData] = useState({
    name: "",
    description: "",
    category: "",
    tags: [],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setHabitData({ ...habitData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/habits/add",
        habitData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSuccess("Habit added successfully");
      setError("");
    } catch (error) {
      setError("Error adding habit");
      setSuccess("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Habit</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Habit Name"
          value={habitData.name}
          onChange={handleChange}
          className="p-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={habitData.description}
          onChange={handleChange}
          className="p-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={habitData.category}
          onChange={handleChange}
          className="p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Habit
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default AddHabit;
