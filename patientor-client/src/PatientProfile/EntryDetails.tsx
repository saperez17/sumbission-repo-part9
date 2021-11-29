import React from "react";
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry } from "../types";
import { assertNever } from "../utils";
import { Segment, Icon } from "semantic-ui-react";

interface EntryDetailsProps {
  entry: Entry;
}

const HealthCheckEntrySegment:React.FC<{entry:HealthCheckEntry }> = ({entry}) => {
  return (
    <Segment>
      <div
        style={{
          display: "flex",
          alignContent: "center",
        }}
      >
        <h3>
            {entry.date}
            <Icon name="user doctor" />
        </h3>
      </div>
      <p>
        <i>{entry.specialist}</i>. {entry.description}
      </p>
    </Segment>
  );
};

const HospitalEntrySegment:React.FC<{entry:HospitalEntry }> = ({entry}) => {
  return (
    <Segment>
      <div
        style={{
          display: "flex",
          alignContent: "center",
        }}
      >
        <h3>{entry.date}</h3>
      </div>
      <p>
        <i>{entry.specialist}</i>. {entry.description}
      </p>
    </Segment>
  );
};

const OccupationalHealthcareSegment:React.FC<{entry:OccupationalHealthCareEntry }> = ({entry}) => {
    return (
        <Segment>
          <div
            style={{
              display: "flex",
              alignContent: "center",
            }}
          >
            <h3>{entry.date}</h3>
          </div>
          <p>
            <i>{entry.employerName}</i>. {entry.description}
          </p>
        </Segment>
      );
};

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntrySegment entry={entry} />;
    case "Hospital":
      return <HospitalEntrySegment entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareSegment  entry={entry}/>;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
