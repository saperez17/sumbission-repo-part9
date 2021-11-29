import { PublicPatientData, NewPatient, Patient, EntryTypes } from "types";
import patientData from "data/patients";
import { v4 as uuidv4 } from "uuid";

const getPublicPatientData = (): PublicPatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (newPatientData: NewPatient): Patient => {
  const newPatientObj: Patient = {
    id: uuidv4(),
    name: newPatientData.name,
    dateOfBirth: newPatientData.dateOfBirth,
    ssn: newPatientData.ssn,
    gender: newPatientData.gender,
    occupation: newPatientData.occupation,
    entries: []
  };
  patientData.push(newPatientObj);

  return newPatientObj;
};

const addPatientEntry = (entryData: EntryTypes, toUpdatePatient: Patient): Patient => {
  toUpdatePatient.entries = toUpdatePatient.entries.concat(entryData);
  patientData.map(patient => patient.id === toUpdatePatient.id ? toUpdatePatient : patient);
  return toUpdatePatient;
};

const findById = (id: string): Patient | undefined => {
  return patientData.find(patient => patient.id === id);
};

export { getPublicPatientData, addPatient, findById,addPatientEntry };
