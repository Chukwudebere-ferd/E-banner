const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/api/status", (req, res) => {
  res.json({ status: "online", message: "Backend is running" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
