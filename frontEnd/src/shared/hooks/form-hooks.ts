import { useCallback, useReducer } from "react";
import formReducer, {
  AddInputs,
  AllInputs,
  EditInputs,
  InputName,
} from "./formReducer";

export const useForm = <T extends AddInputs | EditInputs>(
  initialInputs: T,
  initialFormValidity: boolean
): [
  formState: AllInputs<AddInputs | EditInputs>,
  (id: InputName, value: string, isValid: boolean) => void
] => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: InputName, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value,
        isValid,
        inputId: id,
      });
    },
    [dispatch]
  );

  return [formState, inputHandler];
};
