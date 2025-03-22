const express = require("express");
const router = express.Router();

// مثال على المسار لتسجيل الدخول
router.post("/login", (req, res) => {
  // هنا يمكنك إضافة منطق التحقق من بيانات المستخدم
  res.send("Login Route");
});

// مثال على مسار للتسجيل
router.post("/signup", (req, res) => {
  // هنا يمكنك إضافة منطق إنشاء مستخدم جديد
  res.send("Signup Route");
});

module.exports = router;
