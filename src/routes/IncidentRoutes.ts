import express from "express";
import { investigateNight } from "../agents/NightInvestigation";
import { incidents } from "../data/incidents";
import { askIncidentAI } from "../AI/askIncidentAI";

const router = express.Router();

router.get("/investigate", (req, res) => {
  try {
    const aiResult = investigateNight(incidents); // ✅ pass incidents

    res.json({
      incidents,
      ...aiResult,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error during investigation",
      error,
    });
  }
});

router.post("/ask", (req, res) => {
  try {
    const { question } = req.body;

    const result = askIncidentAI(question);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "AI error", err });
  }
});

export default router;