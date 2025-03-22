// src/pages/EditHabit.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditHabit = () => {
  const { id } = useParams(); // الحصول على ID العادة من URL
  const navigate = useNavigate();
  const [habit, setHabit] = useState({
    name: "",
    description: "",
    category: "",
    completionStatus: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHabit = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:5000/api/habits/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setHabit(response.data);
      } catch (error) {
        setError("Error fetching habit");
      }
    };
    fetchHabit();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHabit({ ...habit, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:5000/api/habits/${id}`, habit, {
        headers: {
          Authorization: token,
        },
      });
      navigate("/habit-list");
    } catch (error) {
      setError("Error updating habit");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Habit</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Habit Name</label>
          <input
            type="text"
            name="name"
            value={habit.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            name="description"
            value={habit.description}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={habit.category}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditHabit;
