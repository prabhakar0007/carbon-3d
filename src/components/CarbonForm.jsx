import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Car, Zap, Utensils, Train, Plane } from 'lucide-react';
import { sanitizeValue } from '../utils/carbonFactors';

const activityTypes = [
  { id: 'car_km', label: 'Car (km)', icon: Car, unit: 'km' },
  { id: 'bus_km', label: 'Bus (km)', icon: Train, unit: 'km' },
  { id: 'flight_hour', label: 'Flight (hours)', icon: Plane, unit: 'hrs' },
  { id: 'electricity_kwh', label: 'Electricity (kWh)', icon: Zap, unit: 'kWh' },
  { id: 'meat_meal', label: 'Non-veg meals', icon: Utensils, unit: 'meals' },
];

/**
 * Form to log a new activity
 * @param {function} onAddEntry - callback to add entry
 */
export default function CarbonForm({ onAddEntry }) {
  const [selected, setSelected] = useState('car_km');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = sanitizeValue(value);
    if (num <= 0) return;
    onAddEntry({ type: selected, value: num });
    setValue('');
  };

  return (
    <div className="glass p-6 w-full max-w-md" role="region" aria-label="Log your activity">
      <h3 className="text-2xl font-bold mb-4" id="form-title">➕ Log Activity</h3>
      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Activity type selection">
        {activityTypes.map((act) => (
          <button
            key={act.id}
            onClick={() => setSelected(act.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
              selected === act.id ? 'bg-green-600 text-white' : 'bg-gray-800/50 text-gray-300'
            }`}
            aria-pressed={selected === act.id}
            aria-label={`Select ${act.label}`}
          >
            <act.icon size={18} /> {act.label}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4" aria-labelledby="form-title">
        <div>
          <label htmlFor="value-input" className="block text-sm opacity-80">
            Value ({activityTypes.find(a=>a.id===selected)?.unit})
          </label>
          <input
            id="value-input"
            type="number"
            step="0.1"
            min="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-gray-900/70 border border-gray-600 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-green-500 outline-none"
            aria-required="true"
            aria-label={`Enter value in ${activityTypes.find(a=>a.id===selected)?.unit}`}
            placeholder="e.g., 5"
          />
        </div>
        <button type="submit" className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-xl font-semibold transition">
          + Add & Calculate
        </button>
      </form>
    </div>
  );
}

CarbonForm.propTypes = {
  onAddEntry: PropTypes.func.isRequired,
};