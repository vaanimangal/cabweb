import { Star } from 'lucide-react';
import './Stars.css';

export function Stars({ value, size = 14, className = '' }) {
  return (
    <span className={`stars-container ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span 
            key={i} 
            className="star-wrapper" 
            style={{ width: size, height: size }}
          >
            {/* Background empty star */}
            <Star 
              size={size} 
              className="star-empty" 
              fill="none" 
              strokeWidth={2} 
            />
            {/* Foreground filled star clip */}
            <span
              className="star-fill-clip"
              style={{ width: `${fill * 100}%` }}
            >
              <Star 
                size={size} 
                className="star-filled" 
                fill="currentColor" 
                strokeWidth={0} 
              />
            </span>
          </span>
        );
      })}
    </span>
  );
}