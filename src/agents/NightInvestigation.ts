import { getBadgeLogs } from "../tools/badgeTools";
import { getVehiclePath } from "../tools/vechicleTools";
import { getDronePatrolLogs } from "../tools/droneTools";

// ⏱ convert time → minutes for comparison
const parseTime = (t: string) => {
  const [time, meridian] = t.split(" ");
  let [h, m] = time.split(":").map(Number);

  if (meridian === "PM" && h !== 12) h += 12;
  if (meridian === "AM" && h === 12) h = 0;

  return h * 60 + m;
};

export const investigateNight = (incidents: any[]) => {
  const badge = getBadgeLogs(incidents);
  const vehicle = getVehiclePath(incidents);
  const drone = getDronePatrolLogs(incidents);

  const location = drone.location || badge.location || "Unknown";

  let confidence = 0;
  const reasoningSteps: string[] = [];
  const signals: string[] = [];

  // 🕒 TIME WINDOW ANALYSIS (IMPORTANT UPGRADE)
  const sorted = [...incidents].sort(
    (a, b) => parseTime(a.time) - parseTime(b.time)
  );

  const startTime = sorted[0]?.time;
  const endTime = sorted[sorted.length - 1]?.time;

  const timeWindow = `${startTime} - ${endTime}`;

  // 📍 LOCATION CLUSTER SCORE
  const sameLocationCount = incidents.filter(
    (i) => i.location === location
  ).length;

  if (sameLocationCount >= 2) {
    confidence += 20;
    signals.push("LOCATION_CLUSTER");
    reasoningSteps.push(
      `${sameLocationCount} incidents detected at ${location} within short duration`
    );
  }

  // 🚨 BADGE + DRONE CORRELATION
  if (badge.location === drone.location) {
    confidence += 30;
    signals.push("BADGE_DRONE_MATCH");
    reasoningSteps.push(
      `Badge scan aligns with drone detection at ${location}`
    );
  }

  // 🚗 VEHICLE ANOMALY SCORING (IMPROVED LOGIC)
  if (vehicle.suspicious) {
    confidence += 25;
    signals.push("VEHICLE_ANOMALY");
    reasoningSteps.push(
      `Irregular vehicle movement observed near ${vehicle.location}`
    );
  }

  // 🚁 DRONE CONFIRMATION
  if (drone.movementConfirmed) {
    confidence += 25;
    signals.push("DRONE_CONFIRMATION");
    reasoningSteps.push(
      `Drone repeatedly confirmed movement at ${drone.location}`
    );
  }

  // 🔥 SEQUENCE DETECTION (NEW FEATURE)
  const sequence = incidents.map((i) => i.type).join(" → ");

  if (
    sequence.includes("Vehicle Movement") &&
    sequence.includes("Badge Scan") &&
    sequence.includes("Unauthorized Access")
  ) {
    confidence += 20;
    signals.push("COORDINATED_SEQUENCE");
    reasoningSteps.push(
      `Suspicious sequence detected: ${sequence}`
    );
  }

  // 🎯 FINAL ALERT TYPE
  let alertType: "NORMAL" | "WARNING" | "CRITICAL" = "NORMAL";

  if (confidence >= 80) alertType = "CRITICAL";
  else if (confidence >= 50) alertType = "WARNING";

  const needsEscalation = confidence >= 70;

  // 🧠 HUMAN-STYLE SUMMARY (IMPROVED)
  const summary =
    alertType === "CRITICAL"
      ? `[${timeWindow}] CRITICAL ALERT: Multiple correlated incidents detected at ${location}. Pattern suggests coordinated activity involving vehicle movement, badge scan, and unauthorized access.`
      : alertType === "WARNING"
      ? `[${timeWindow}] WARNING: Suspicious activity cluster detected at ${location}.`
      : `[${timeWindow}] NORMAL: No strong anomaly detected at ${location}.`;

  return {
    summary,
    confidence,
    alertType,
    location,
    signals,
    reasoningSteps,
    followUp: needsEscalation
      ? `Immediate inspection required at ${location}. Multiple signals indicate possible coordinated intrusion.`
      : "Continue monitoring. No escalation required at this time.",
    timestamp: new Date().toISOString(),
  };
};