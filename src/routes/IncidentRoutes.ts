import express from "express";
import { investigateNight } from "../agents/NightInvestigation";
import { incidents } from "../data/incidents";

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

export default router;