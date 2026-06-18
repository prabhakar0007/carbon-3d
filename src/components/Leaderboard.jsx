import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Leaderboard({ currentUserScore }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load dummy users from localStorage
    const stored = localStorage.getItem('leaderboard');
    let data = stored ? JSON.parse(stored) : [];
    // Add current user if not present
    if (!data.find(u => u.name === 'You')) {
      data.push({ name: 'You', score: currentUserScore });
    } else {
      data = data.map(u => u.name === 'You' ? { ...u, score: currentUserScore } : u);
    }
    data.sort((a, b) => a.score - b.score);
    setUsers(data.slice(0, 10));
    localStorage.setItem('leaderboard', JSON.stringify(data));
  }, [currentUserScore]);

  return (
    <div className="glass p-6 w-full" role="region" aria-label="Leaderboard">
      <h3 className="text-xl font-bold mb-2">🏆 Leaderboard (Lowest wins)</h3>
      <ul className="space-y-1">
        {users.map((u, i) => (
          <li key={i} className="flex justify-between border-b border-gray-700 py-1">
            <span>{i+1}. {u.name}</span>
            <span>{u.score} kg</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
Leaderboard.propTypes = {
  currentUserScore: PropTypes.number.isRequired,
};