// // backend/server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const habitRoutes = require("./routes/habitRoutes");
// const authRoutes = require("./routes/authRoutes");
// const cors = require("cors");

// // تحميل المتغيرات البيئية
// dotenv.config();

// const app = express();

// // السماح بالـ CORS
// app.use(cors());

// // إعداد الحزم الخاصة بالـ Express
// // app.use(express.json());

// // الاتصال بـ MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log("Error connecting to MongoDB:", err));

// // إعداد المنفذ
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cors());

// // إعداد المسارات
// app.use("/api/habits", habitRoutes);
// app.use("/api/auth", authRoutes);

// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });















// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const habitRoutes = require("./routes/habitRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

// تحميل المتغيرات البيئية
dotenv.config();

const app = express();

// السماح بالـ CORS
app.use(cors());

// إعداد الحزم الخاصة بالـ Express
app.use(express.json());

// الاتصال بـ MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// إعداد المسارات
app.use("/api/habits", habitRoutes);
app.use("/api/auth", authRoutes);

// إعداد المنفذ
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



dotenv.config();
// const app = express();
app.use(express.json());
app.use(cors());
