import express from "express";
import Log from "../models/Log.js";

const router = express.Router();

// GET /api/logs — return recent logs
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 }).limit(5); // latest 5 logs
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs", error });
  }
});

export default router;
