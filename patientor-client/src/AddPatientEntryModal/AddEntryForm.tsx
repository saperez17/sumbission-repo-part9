import React from "react";
import {
  DiagnosisSelection,
  TextField,
  NumberField,
} from "../AddPatientModal/FormField";
import { Grid, Button } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Formik, Form, Field } from "formik";
import {
  HealthCheckEntry,
  HealthCheckRating,
  UnionOmit,
  Entry,
  BaseEntry,
} from "../types";

export type PatientEntryFormValues = Omit<HealthCheckEntry, "id">;

export type PatientBaseEntryWithoutId = UnionOmit<BaseEntry, "id">;

export type PatientUnionEntryWithoutId = UnionOmit<Entry, "id">;

// export type EntryTypes = Pick<Entry, "type">;
export type EntryTypes = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

export enum EntryTypesEnum {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
}

interface Props {
  onSubmit: (values: PatientUnionEntryWithoutId) => void;
  onCancel: () => void;
  type: EntryTypes;
}

const getInitialValues = (entry: EntryTypes): PatientUnionEntryWithoutId => {
  let initialEntryValue: PatientUnionEntryWithoutId;
  const baseEntry: PatientBaseEntryWithoutId = {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  };
  switch (entry) {
    case "Hospital":
      initialEntryValue = {
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: "",
          criteria: "",
        },
      };
      break;

    case "OccupationalHealthcare":
      initialEntryValue = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      };
      break;

    case "HealthCheck":
      initialEntryValue = {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: HealthCheckRating.LowRisk,
      };
      break;
  }

  return initialEntryValue;
};

const AddEntryForm = ({ onSubmit, onCancel, type }: Props) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={getInitialValues(type)}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }

        switch (values.type) {
          case "HealthCheck":
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
            break;

          case "Hospital":
            if (!values.discharge) {
              errors.discharge = requiredError;
            }
            break;
          case "OccupationalHealthcare":
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            break;
        }
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist name"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Entry description"
              name="description"
              component={TextField}
            />
            {type === "Hospital" && (
              <Grid>
                <h4>Discharge</h4>
                <Grid.Column floated="left" width={5}>
                  <Field
                    label="Discharge Date"
                    placeholder="Date"
                    name="discharge.date"
                    component={TextField}
                  />
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Field
                    label="Discharge Criteria"
                    placeholder="Criteria"
                    name="discharge.criteria"
                    component={TextField}
                  />
                </Grid.Column>
              </Grid>
            )}

            {type === "HealthCheck" && (
              <Field
                label="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            )}

            {type === "OccupationalHealthcare" && (
              <Grid>
                <h4>Sickleave</h4>
                <Grid.Column floated="left" width={5}>
                  <Field
                    label="Sickleave Start Date"
                    name="sickLeave.startDate"
                    component={TextField}
                  />
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Field
                    label="Sickleave Start Date"
                    placeholder="sickleaveEndDate"
                    name="sickLeave.endDate"
                    component={TextField}
                  />
                </Grid.Column>
              </Grid>
            )}

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
