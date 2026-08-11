const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("InterviewForge AI Backend Running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});