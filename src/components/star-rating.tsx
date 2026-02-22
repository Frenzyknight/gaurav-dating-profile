"use client";

interface StarRatingProps {
  rating: number;
  max?: number;
  color?: string;
}

export function StarRating({ rating, max = 5, color = "#FFE600" }: StarRatingProps) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className="star-item"
          style={{
            opacity: i < rating ? 1 : 0.2,
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill={i < rating ? color : "none"}
            stroke={color}
            strokeWidth="2"
            strokeLinejoin="miter"
            strokeLinecap="square"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
      ))}
    </div>
  );
}
