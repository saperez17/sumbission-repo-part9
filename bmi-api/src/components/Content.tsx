import React from "react";
import Part from "components/Part";
import { CoursePart } from "types";

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }:ContentProps) => {
  return (
    <div>
    {courseParts.map(coursePart => (
      <Part key={coursePart.name} coursePart={coursePart} />
      // <p key={coursePart.name}>
      //   {coursePart.name} {coursePart.exerciseCount}
      // </p>
    ))}
  </div>
  );
};

export default Content;
