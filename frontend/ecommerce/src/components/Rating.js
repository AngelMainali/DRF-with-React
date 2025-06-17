import React from 'react';

function Rating({ value, text, color = '#f8e825' }) {
  // value is rating from 0 to 5 (could be decimal like 4.5)
  // color is star color (default is a golden yellow)

  return (
    <div className="rating" style={{ display: 'flex', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ color, fontSize: '1.2rem', marginRight: '2px' }}>
          {value >= star ? (
            '★' // full star
          ) : value >= star - 0.5 ? (
            '⯨' // half star - fallback, or you can use custom SVG or icon library
          ) : (
            '☆' // empty star
          )}
        </span>
      ))}
      {text && <span style={{ marginLeft: '8px', color: '#555' }}>{text}</span>}
    </div>
  );
}

export default Rating;
