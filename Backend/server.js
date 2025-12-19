const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../dist")));

// API Endpoint placeholder (optional future use)
app.get("/api/status", (req, res) => {
  res.json({ status: "online", message: "Backend is running" });
});

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
