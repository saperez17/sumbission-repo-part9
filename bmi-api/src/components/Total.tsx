import React from "react";

interface TotalProps {
  coursesCount: number;
}

const Total = ({coursesCount}:TotalProps) => {
  return (
    <p>Number of exercises {coursesCount}</p>
  );
};

export default Total;
