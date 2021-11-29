/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SyntheticEvent, useState } from "react";
import { Modal, Segment, Dropdown, DropdownProps } from "semantic-ui-react";
import AddEntryForm, { PatientUnionEntryWithoutId, EntryTypesEnum } from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientUnionEntryWithoutId) => void;
  error?: string;
}

interface entryTypeDropdownProps extends DropdownProps {
  value: string;
  onChange: (
    event: React.SyntheticEvent<HTMLElement>,
    data: any
  ) => void;
}

const entryOptions = [
  {
    key: "Hospital",
    text: "Hospital Entry",
    value: "Hospital",
  },
  {
    key: "OccupationalHealthcare",
    text: "OccupationalHealthcare Entry",
    value: "OccupationalHealthcare",
  },
  {
    key: "HealthCheck",
    text: "HealthCheck Entry",
    value: "HealthCheck",
  },
];

const DropdownExampleSelection = ({ value, onChange }: entryTypeDropdownProps) => (
  <Dropdown
    placeholder="Select Entry Type"
    fluid
    selection
    options={entryOptions}
    value={value}
    onChange={onChange}
  />
);

const AddPatientEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => {
  const [entryType, setEntryType] = useState<EntryTypesEnum>(EntryTypesEnum.Hospital);
  const entryTypeChangeHandler = (
    e: React.SyntheticEvent<HTMLElement>,
    data: any
  ) => setEntryType(data.value);


  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        <DropdownExampleSelection
          value={entryType}
          onChange={entryTypeChangeHandler}
        />
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} type={entryType} />
      </Modal.Content>
    </Modal>
  );
};

export default AddPatientEntryModal;
