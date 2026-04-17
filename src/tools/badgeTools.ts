export const getBadgeLogs = (incidents: any[]) => {
  // pick first incident location as badge scan
  return {
    location: incidents[0]?.location || "Unknown",
  };
};