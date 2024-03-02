import { useCallback, useReducer } from "react";
import {
  AddInputs,
  EditInputs,
  AllInputs,
  InputName,
  AuthInputs,
  IAction,
} from "./types";
import formReducer from "./formReducer";

export const useForm = <T extends AddInputs | EditInputs | AuthInputs>(
  initialInputs: T,
  initialFormValidity: boolean
): [
  formState: AllInputs<T>,
  inputHandler: (id: InputName, value: string, isValid: boolean) => void,
  setFormData: (inputData: T, formValidity: boolean) => void
] => {
  const [formState, dispatch] = useReducer(
    formReducer as (state: AllInputs<T>, action: IAction<T>) => AllInputs<T>,
    {
      inputs: initialInputs,
      isValid: initialFormValidity,
    }
  );

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
