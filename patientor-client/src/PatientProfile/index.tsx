import React, { useEffect } from "react";
import { Icon } from "semantic-ui-react";
import axios from "axios";
import { useParams } from "react-router";
import { useStateValue, updatePatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { v4 as uuidv4 } from "uuid";
import EntryDetails from "./EntryDetails";
import { Button } from "semantic-ui-react";
import AddPatientEntryModal from "../AddPatientEntryModal";
import { PatientUnionEntryWithoutId } from "../AddPatientEntryModal/AddEntryForm";

const PatientProfile = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];

  const submitNewPatientEntry = async (values: PatientUnionEntryWithoutId) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.log("e", e.response?.data);
      setError(e.response?.data || "Unknown error");
    }
  };

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const { data: patientInfo } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        if (!patients[patientInfo.id]) return;
        if (!patients[patientInfo.id].entries) return;

        dispatch(updatePatient(patientInfo));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientInfo();
  }, [dispatch, id]);

  if (!patient) {
    return <div>...not found</div>;
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            padding: "0",
            margin: "0",
          }}
        >
          {patient.name}
        </h1>
        <Icon name={patient.gender === "male" ? "mars" : "venus"} size="big" />
      </div>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <div>
        <h3>entries</h3>
        {/* {patient?.entries?.map(entry => (
              <div key={entry.id}>
                  <p>{entry.date} {entry.description}</p>
                  <ul>
                      {entry?.diagnosisCodes?.map(code => (
                          <li key={uuidv4()}>
                              {code} {getDiagnosisCodeDescription(code)}
                          </li>
                      ))}
                  </ul>
              </div>
          ))} */}
        {patient?.entries?.map((entry) => (
          <EntryDetails key={uuidv4()} entry={entry} />
        ))}
      </div>
      <AddPatientEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatientEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientProfile;
