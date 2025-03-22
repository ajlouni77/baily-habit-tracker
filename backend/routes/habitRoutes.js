// routes/habitRoutes.js
const express = require("express");
const router = express.Router();
const Habit = require("../models/habitModel");
const verifyToken = require("../middleware/authMiddleware");

// إضافة عادة جديدة
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { name, description, category, tags } = req.body;
    const newHabit = new Habit({
      name,
      description,
      category,
      tags,
      userId: req.userId, // أخذ userId من التوكن
    });
    await newHabit.save();
    res
      .status(201)
      .json({ message: "Habit added successfully", habit: newHabit });
  } catch (error) {
    res.status(500).json({ message: "Error adding habit", error });
  }
});

// الحصول على جميع العادات للمستخدم
router.get("/", verifyToken, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ message: "Error fetching habits", error });
  }
});







router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const { completionStatus } = req.body;
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      { completionStatus },
      { new: true }
    );
    res.status(200).json(updatedHabit);
  } catch (error) {
    res.status(500).json({ message: "Error updating habit status", error });
  }
});

module.exports = router;
