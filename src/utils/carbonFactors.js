/**
 * Emission factors (kg CO₂e per unit)
 * Sources: IPCC, EPA, and Climatiq average
 */
export const factors = {
  car_km: 0.171,
  bus_km: 0.089,
  train_km: 0.041,
  flight_hour: 90,
  electricity_kwh: 0.85,
  meat_meal: 3.2,
  veg_meal: 1.5,
  vegan_meal: 0.8,
};

/**
 * Calculate total carbon footprint from an array of activity entries
 * @param {Array} entries - [{ type: string, value: number }]
 * @returns {number} total kg CO₂e (rounded to 2 decimals)
 */
export const calculateFootprint = (entries) => {
  if (!Array.isArray(entries)) return 0;
  let total = 0;
  entries.forEach(entry => {
    const { type, value } = entry;
    if (factors[type] && typeof value === 'number' && value > 0) {
      total += value * factors[type];
    }
  });
  return parseFloat(total.toFixed(2));
};

/**
 * Sanitize input: ensure positive number within reasonable bounds
 */
export const sanitizeValue = (value) => {
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) return 0;
  // Max reasonable limit: 1000 for car km, etc.
  return Math.min(num, 10000);
};