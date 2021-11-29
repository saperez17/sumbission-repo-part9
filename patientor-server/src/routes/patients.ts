import express from "express";
import { getPublicPatientData, addPatient, findById, addPatientEntry } from "services/patientService";
import { toNewPatient, toNewEntry } from "utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPublicPatientData());
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.status(202).send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  try {
    const patientSearchResult = findById(req.params.id);
    if (!patientSearchResult){
      res.status(404).send("Patient not found");
    }
    res.status(202).send(patientSearchResult);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    const patientSearchResult = findById(req.params.id);
    if (!patientSearchResult){
      res.status(404).send("Patient not found");
      return;
    }
    if (!newEntry) {
      res.status(404).send("Entry type not supported");
      return;
    }

    const patient = addPatientEntry(newEntry, patientSearchResult);
    res.status(202).send(patient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log("right here");
    res.status(400).send(errorMessage);
  }
});

export default router;
