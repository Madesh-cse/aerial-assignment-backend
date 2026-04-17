export const getVehiclePath = (incidents: any[]) => {
  // check if any Yard activity exists
  const yardIncident = incidents.find((i) =>
    i.location.toLowerCase().includes("yard")
  );

  return {
    location: yardIncident?.location || "Unknown",
    suspicious: !!yardIncident, // true if found
  };
};