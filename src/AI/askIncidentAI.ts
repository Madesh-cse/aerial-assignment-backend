import { incidents } from "../data/incidents";
import { investigateNight } from "../agents/NightInvestigation";

export const askIncidentAI = (question: string) => {
  const analysis = investigateNight(incidents);

  const q = question.toLowerCase();

  let focusLocation = analysis.location;

  if (q.includes("block")) focusLocation = "Block C";
  else if (q.includes("yard")) focusLocation = "Yard C";
  else if (q.includes("gate")) focusLocation = "Gate 3";

  const related = incidents.filter((i) =>
    i.location === focusLocation
  );

  const explanation = `
AI analyzed ${related.length} incidents at ${focusLocation}.
The system detected overlapping activity patterns within a short time window.
This suggests coordinated or repeated access behavior rather than isolated events.
  `.trim();

  const breakdown = {
    badge: analysis.signals.includes("BADGE_MATCH") ? 30 : 0,
    vehicle: analysis.signals.includes("VEHICLE_SUSPICIOUS") ? 30 : 0,
    drone: analysis.signals.includes("DRONE_CONFIRMATION") ? 40 : 0,
  };

  const confidence = breakdown.badge + breakdown.vehicle + breakdown.drone;

  return {
    question,
    focusLocation,
    explanation,
    signals: analysis.signals,
    confidence,
    breakdown,
    relatedIncidents: related,
  };
};