import React from 'react';
import PropTypes from 'prop-types';
import { Share2 } from 'lucide-react';

export default function ShareButton({ total }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Carbon Footprint',
        text: `I emit ${total} kg CO₂e. Join me in reducing it! #CarbonTracker`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`My CO₂: ${total} kg CO₂e. Track yours too!`);
      alert('Link copied! Share it.');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="mt-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full text-sm flex items-center gap-2 transition"
      aria-label="Share your carbon footprint"
    >
      <Share2 size={16} /> Share
    </button>
  );
}

ShareButton.propTypes = {
  total: PropTypes.number.isRequired,
};
