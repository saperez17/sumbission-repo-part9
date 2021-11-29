export type Entry = {
  description: string;
  creationDate: string;
  specialistInfo: string;
  diagnosisCodes: string[];
};

export enum Gender {
  Male = "male",
  Female = "female",
}

export interface Diagnostic {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: EntryTypes[];
}

export type PublicPatientData = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

export type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnostic["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  }
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type EntryTypes =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;