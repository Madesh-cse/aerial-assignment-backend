export const getDronePatrolLogs = (incidents: any[]) => {
  // check repeated incidents in same location
  const locationCount: Record<string, number> = {};

  incidents.forEach((i) => {
    locationCount[i.location] = (locationCount[i.location] || 0) + 1;
  });

  // find most repeated location
  let maxLocation = "Unknown";
  let maxCount = 0;

  for (const loc in locationCount) {
    if (locationCount[loc] > maxCount) {
      maxLocation = loc;
      maxCount = locationCount[loc];
    }
  }

  return {
    location: maxLocation,
    movementConfirmed: maxCount > 1, // repeated activity
  };
};