import {
  NewPatient,
  Fields,
  Gender,
  EntryTypes,
  HealthCheckRating,
  BaseEntry,
} from "types";
import { v4 as uuidv4 } from "uuid";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseGender = (text: unknown): Gender => {
  if (!text || !isGender(text)) {
    throw new Error("Incorrect or missing gender");
  }
  return text;
};

const isHealthCheckRating = (
  healthCheckRating: any
): healthCheckRating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect or missing gender");
  }
  return healthCheckRating;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect of missing field");
  }
  return text;
};

function isStringArray(value: any): value is string[] {
  if (value instanceof Array) {
    value.forEach(function (item):false | void {
      // maybe only check first value?
      if (typeof item !== "string") {
        return false;
      }
      
    });
    return true;
  }
  return false;
}
const parseStringArray = (strArray: unknown): string[] => {
  if (!strArray || !Array.isArray(strArray) || !strArray.length) {
    throw new Error("Incorrect array data");
  }

  if (!isStringArray(strArray)) {
    throw new Error("Incorrect array data");
  }

  return strArray;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: [],
  };

  return newPatient;
};

export const toNewEntry = (entryData: EntryTypes): EntryTypes | null => {
  let newEntry: EntryTypes;
  const { date, description, specialist, diagnosisCodes } = entryData;
  const baseEntry: BaseEntry = {
    id: uuidv4(),
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
    diagnosisCodes: diagnosisCodes ? parseStringArray(diagnosisCodes) : [],
  };
  switch (entryData.type) {
    case "HealthCheck":
      const { healthCheckRating } = entryData;
      newEntry = {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
      break;

    case "Hospital":
      const { discharge } = entryData;
      newEntry = {
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: parseDate(discharge.date),
          criteria: parseString(discharge.criteria),
        },
      };
      break;

    case "OccupationalHealthcare":
      const { employerName, sickLeave } = entryData;
      newEntry = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(employerName),
        sickLeave: sickLeave && {
          startDate: parseDate(sickLeave.startDate),
          endDate: parseDate(sickLeave.endDate),
        },
      };
      break;

    default: 
        return null; 
  }

  return newEntry;
};
