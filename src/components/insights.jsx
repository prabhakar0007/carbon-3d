import React from 'react';
import PropTypes from 'prop-types';
import { Lightbulb } from 'lucide-react';
import { factors } from '../utils/carbonFactors';

export default function Insights({ footprintTotal, activities }) {
  // Find highest contributor
  let tip = '';
  if (activities.length === 0) {
    tip = 'Log your first activity to get personalized insights!';
  } else {
    // Compute which activity emits most
    const maxEntry = activities.reduce((a, b) => (a.value * factors[a.type] > b.value * factors[b.type]) ? a : b);
    const maxType = maxEntry.type;
    const maxAmount = maxEntry.value * factors[maxType];
    if (footprintTotal > 500) tip = `✈️ Your ${maxType.replace('_', ' ')} is huge! Try reducing it by 20% to save ${(maxAmount*0.2).toFixed(1)} kg.`;
    else if (footprintTotal > 200) tip = `🚗 Your ${maxType.replace('_', ' ')} is the main contributor. Try public transport or carpool.`;
    else if (footprintTotal > 50) tip = `💡 Switch to LED, unplug devices – save 40 kg CO₂/year.`;
    else tip = '🌱 You are a climate hero! Keep it up!';
  }

  return (
    <div className="glass p-6 w-full flex items-start gap-3" role="note" aria-label="Personalized insight">
      <Lightbulb className="text-yellow-400 mt-1" />
      <div>
        <h4 className="font-bold">Personalised Insight</h4>
        <p className="opacity-90">{tip}</p>
      </div>
    </div>
  );
}
Insights.propTypes = {
  footprintTotal: PropTypes.number.isRequired,
  activities: PropTypes.array.isRequired,
};