import express from "express";
import cors from "cors";
import diagnosesRouter from "routes/diagnoses";
import patientsRouter from 'routes/patients';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);
app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
