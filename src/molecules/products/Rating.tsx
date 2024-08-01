import React from "react";
import { Rate } from "antd";

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  // Convert rating (e.g., 3.5) to a number of stars
  const stars = Math.round(rating * 2) / 2;

  return <Rate disabled allowHalf defaultValue={stars} />;
};

export default Rating;
