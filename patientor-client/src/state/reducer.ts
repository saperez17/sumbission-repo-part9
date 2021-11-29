import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT_INFO";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_CODES_LIST";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "UPDATE_PATIENT_INFO":
      const foundPatient = state.patients[action.payload.id];
      if (!foundPatient) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        patients: {
          ...state.patients,
          [foundPatient.id]: {
            ...foundPatient,
            ...action.payload,
          },
        },
      };
    case "SET_DIAGNOSIS_CODES_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis,
        },
      };
    default:
      return state;
  }
};

//Action creators
export const setPatientList = (patientsData: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientsData,
  };
};

export const addPatient = (patientData: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patientData,
  };
};

export const updatePatient = (patientData: Patient): Action => {
  return {
    type: "UPDATE_PATIENT_INFO",
    payload: patientData,
  };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_CODES_LIST",
    payload: diagnosisList,
  };
};
