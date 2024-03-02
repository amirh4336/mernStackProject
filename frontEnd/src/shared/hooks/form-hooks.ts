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
  inputHandler: (id: InputName, value: string, isValid: boolean) => void,
  setFormData: (inputData: T, formValidity: boolean) => void
] => {
  const [formState, dispatch ] = useReducer(formReducer, {
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

  const setFormData = useCallback((inputData: T, formValidity: boolean) => {
    dispatch({ type: "SET_DATA", inputs: inputData, isValid: formValidity });
  }, []);

  return [formState, inputHandler, setFormData];
};
