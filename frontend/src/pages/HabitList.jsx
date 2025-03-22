// src/pages/HabitList.js
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ دالة جلب البيانات من السيرفر
  const fetchHabits = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/api/habits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHabits(response.data);
      setFilteredHabits(response.data);
      setError("");
    } catch (error) {
      setError("Error fetching habits.");
    }
  }, []);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  // ✅ دالة البحث والتصفية
  useEffect(() => {
    let filtered = habits;
    if (searchQuery) {
      filtered = filtered.filter(
        (habit) =>
          habit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          habit.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (habit) => habit.category === selectedCategory
      );
    }
    setFilteredHabits(filtered);
  }, [searchQuery, selectedCategory, habits]);

  // ✅ دالة تحديث حالة الإنجاز
  const handleCompletionToggle = async (habitId, currentStatus) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }
    try {
      await axios.patch(
        `http://localhost:5000/api/habits/${habitId}`,
        { completionStatus: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // تحديث الحالة بدون جلب البيانات مجددًا
      const updatedHabits = habits.map((habit) =>
        habit._id === habitId
          ? { ...habit, completionStatus: !currentStatus }
          : habit
      );
      setHabits(updatedHabits);
      setFilteredHabits(updatedHabits);
    } catch (error) {
      setError("Error updating habit status.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Habits</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ مربع البحث */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search habits..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* ✅ قائمة التصنيفات */}
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option value="All">All Categories</option>
          <option value="Health">Health</option>
          <option value="Productivity">Productivity</option>
          <option value="Mindfulness">Mindfulness</option>
        </select>
      </div>

      {/* ✅ عرض العادات */}
      <ul>
        {filteredHabits.length > 0 ? (
          filteredHabits.map((habit) => (
            <li
              key={habit._id}
              className="flex justify-between items-center p-4 border-b"
            >
              <div>
                <h2 className="font-semibold">{habit.name}</h2>
                <p>{habit.description}</p>
              </div>
              <div>
                <button
                  onClick={() =>
                    handleCompletionToggle(habit._id, habit.completionStatus)
                  }
                  className={`px-4 py-2 rounded ${
                    habit.completionStatus ? "bg-green-500" : "bg-gray-500"
                  } text-white`}
                >
                  {habit.completionStatus ? "Completed" : "Mark as Completed"}
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No habits found.</p>
        )}
      </ul>
    </div>
  );
};

export default HabitList;
