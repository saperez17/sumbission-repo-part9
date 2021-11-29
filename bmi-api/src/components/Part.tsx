import React from "react";
import { CoursePart } from "types";
import { assertNever } from "utils";

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  const renderPart = (part: CoursePart) => {
    switch (part.type) {
      case "normal":
        return (
          <div>
            <p>
              <b>
                {part.name} {part.exerciseCount}
              </b>
            </p>
            <p><i>{part.description}</i></p>
          </div>
        );

      case "groupProject":
        return (
          <div>
            <p>
              <b>
                {part.name} {part.exerciseCount}
              </b>
            </p>
            <p>{part.groupProjectCount}</p>
          </div>
        );

      case "submission":
        return (
          <div>
            <p>
              <b>
                {part.name} {part.exerciseCount}
              </b>
            </p>
            <p><i>{part.description}</i></p>
            <p>{part.exerciseSubmissionLink}</p>
          </div>
        );

      case "special":
        return (
          <div>
            <p>
              <b>
                {part.name} {part.exerciseCount}
              </b>
            </p>
            <p>
              <i>{part.description}</i>
            </p>
            <p>
              <i>Requirements:</i>{" "}
              {part.requirements.map((req) => (
                <>{`${req} `}</>
              ))}
            </p>
          </div>
        );

      default:
        return assertNever(part);
    }
  };

  return <div>{renderPart(coursePart)}</div>;
};

export default Part;
