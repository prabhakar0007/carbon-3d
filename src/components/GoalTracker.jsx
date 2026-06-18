import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function GoalTracker({ current, goal, onGoalChange }) {
  const [editing, setEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(goal);

  const progress = Math.min((current / goal) * 100, 100);

  const handleSave = () => {
    if (newGoal > 0) onGoalChange(newGoal);
    setEditing(false);
  };

  return (
    <div className="mt-4 text-left" role="region" aria-label="Goal tracker">
      <div className="flex justify-between items-center">
        <span className="text-sm opacity-70">🎯 Goal: {goal} kg CO₂e</span>
        <button onClick={() => setEditing(true)} className="text-xs bg-gray-700 px-2 py-1 rounded">Change</button>
      </div>
      <div className="w-full bg-gray-700 h-2 rounded-full mt-1">
        <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
      </div>
      {editing && (
        <div className="mt-2 flex gap-2">
          <input type="number" value={newGoal} onChange={(e) => setNewGoal(parseFloat(e.target.value) || 0)} className="bg-gray-800 border border-gray-600 px-2 py-1 rounded w-24" />
          <button onClick={handleSave} className="bg-green-600 px-3 py-1 rounded text-sm">Save</button>
        </div>
      )}
    </div>
  );
}
GoalTracker.propTypes = {
  current: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
  onGoalChange: PropTypes.func.isRequired,
};