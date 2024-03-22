import Modal from "../Modal/Modal";
import Button from "../../FormElements/Button/Button";
import { FC } from "react";

interface IErrorModalProps {
  onClear: () => void;
  error: string;
}

const ErrorModal: FC<IErrorModalProps> = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
