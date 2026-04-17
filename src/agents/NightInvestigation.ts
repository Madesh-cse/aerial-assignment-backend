import { getBadgeLogs } from "../tools/badgeTools";
import { getVehiclePath } from "../tools/vechicleTools";
import { getDronePatrolLogs } from "../tools/droneTools";

/**
 * Convert "02:15 AM" → minutes for sorting
 */
const parseTime = (t: string) => {
  const [time, meridian] = t.split(" ");
  let [h, m] = time.split(":").map(Number);

  if (meridian === "PM" && h !== 12) h += 12;
  if (meridian === "AM" && h === 12) h = 0;

  return h * 60 + m;
};

/**
 * Build human-readable AI narrative
 */
const buildParagraphSummary = (items: any[], location: string) => {
  const sorted = [...items].sort(
    (a, b) => parseTime(a.time) - parseTime(b.time)
  );

  const startTime = sorted[0].time;
  const endTime = sorted[sorted.length - 1].time;

  const flow = sorted
    .map((i) => `${i.type.toLowerCase()} at ${i.time}`)
    .join(", followed by ");

  const isPattern = sorted.length >= 3;

  return `Between ${startTime} and ${endTime}, multiple activities were detected at ${location}. The sequence began with ${flow}. ${
    isPattern
      ? "The close timing and repeated activity suggest a coordinated pattern requiring further investigation."
      : "These events appear to be isolated but still require monitoring."
  }`;
};

/**
 * Group incidents by location
 */
const groupByLocation = (incidents: any[]) => {
  const grouped: Record<string, any[]> = {};

  for (const inc of incidents) {
    if (!grouped[inc.location]) {
      grouped[inc.location] = [];
    }
    grouped[inc.location].push(inc);
  }

  return grouped;
};

/**
 * MAIN AI INVESTIGATION ENGINE
 */
export const investigateNight = (incidents: any[]) => {
  const badge = getBadgeLogs(incidents);
  const vehicle = getVehiclePath(incidents);
  const drone = getDronePatrolLogs(incidents);

  const location = drone.location || badge.location || "Unknown";

  let confidence = 0;
  const reasoningSteps: string[] = [];
  const signals: string[] = [];

  // -----------------------------
  // 🧠 SIGNAL ENGINE
  // -----------------------------

  if (badge.location === drone.location) {
    confidence += 30;
    signals.push("BADGE_MATCH");
    reasoningSteps.push(`Badge activity detected at ${badge.location}`);
  }

  if (vehicle.suspicious) {
    confidence += 30;
    signals.push("VEHICLE_SUSPICIOUS");
    reasoningSteps.push(
      `Suspicious vehicle movement near ${vehicle.location}`
    );
  }

  if (drone.movementConfirmed) {
    confidence += 40;
    signals.push("DRONE_CONFIRMATION");
    reasoningSteps.push(
      `Repeated drone activity confirmed at ${drone.location}`
    );
  }

  // -----------------------------
  // 🚨 ALERT TYPE
  // -----------------------------
  let alertType: "NORMAL" | "WARNING" | "CRITICAL" = "NORMAL";

  if (confidence >= 80) alertType = "CRITICAL";
  else if (confidence >= 50) alertType = "WARNING";

  const needsEscalation = confidence >= 70;

  // -----------------------------
  // ⏱ PARSE INCIDENT TIMELINE
  // -----------------------------
  const grouped = groupByLocation(incidents);

  const timelineBlocks: string[] = [];

  Object.entries(grouped).forEach(([loc, items]) => {
    const summaryText = buildParagraphSummary(items, loc);
    timelineBlocks.push(summaryText);
  });

  const timelineSummary = timelineBlocks.join("\n\n");

  // -----------------------------
  // 🧠 FINAL AI SUMMARY (NARRATIVE STYLE)
  // -----------------------------
  const summary =
    alertType === "CRITICAL"
      ? `🚨 CRITICAL ALERT DETECTED\n\n${timelineSummary}\n\nThis pattern indicates a high-risk coordinated activity requiring immediate intervention.`
      : alertType === "WARNING"
      ? `⚠ SUSPICIOUS ACTIVITY DETECTED\n\n${timelineSummary}\n\nContinued monitoring is recommended due to unusual activity patterns.`
      : `✅ NORMAL ACTIVITY\n\n${timelineSummary}\n\nNo significant threat detected during the observation window.`;

  // -----------------------------
  // 📌 FOLLOW UP ACTION
  // -----------------------------
  const followUp = needsEscalation
    ? `Immediate inspection required at ${location}`
    : "Continue passive monitoring";

  // -----------------------------
  // 📤 RESPONSE PAYLOAD
  // -----------------------------
  return {
    summary,
    confidence,
    alertType,
    location,
    signals,
    reasoningSteps,
    followUp,
    timestamp: new Date().toISOString(),
  };
};