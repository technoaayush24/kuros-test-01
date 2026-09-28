const express = require("express");
const path = require("path");
const crypto = require("crypto");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// Heavy API endpoint
app.get("/api/compute", (req, res) => {
    let result = "";
    for (let i = 0; i < 50000; i++) {
        result = crypto.createHash("sha256").update(result + i).digest("hex");
    }
    res.json({ hash: result, time: Date.now() });
});

// Data API
app.get("/api/data", (req, res) => {
    const data = Array.from({length: 1000}, (_, i) => ({
        id: i, name: `Item ${i}`, value: Math.random()
    }));
    res.json(data);
});

// Health check
app.get("/health", (req, res) => res.send("OK"));

// Serve frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express server on ${PORT}`));
