import {
  AddInputNames,
  AddInputs,
  AllInputs,
  AuthInputNames,
  AuthInputs,
  EditInputNames,
  EditInputs,
  IAction,
} from "./types";

const formReducer = <T extends AddInputs | EditInputs | AuthInputs>(
  state: AllInputs<T>,
  action: IAction<T>
): AllInputs<T> => {
  switch (action.type) {
    case "INPUT_CHANGE": {
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          if ("address" in state.inputs) {
            formIsValid =
              formIsValid && state.inputs[inputId as AddInputNames].isValid;
          } else if ("email" in state.inputs) {
            formIsValid =
              (formIsValid &&
                state.inputs[inputId as AuthInputNames]?.isValid) ||
              formIsValid;
          } else {
            formIsValid =
              formIsValid && state.inputs[inputId as EditInputNames].isValid;
          }
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    }

    case "SET_DATA": {
      return {
        inputs: action.inputs,
        isValid: action.isValid,
      };
    }

    default:
      return state;
  }
};

export default formReducer;
