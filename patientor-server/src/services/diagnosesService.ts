import diagnoses from "data/diagnoses";
import { Diagnostic } from "types";

export const getDiagnoses = (): Diagnostic[] => {
  return diagnoses;
};
