export type AddInputs = {
  [key in AddInputNames]: {
    value: string;
    isValid: boolean;
  };
};

export type EditInputs = {
  [key in EditInputNames]: {
    value: string;
    isValid: boolean;
  };
};

export type AllInputs<T extends AddInputs | EditInputs> = {
  inputs: T;
  isValid: boolean;
};

type AddInputNames = "title" | "description" | "address";

type EditInputNames = "title" | "description";

export enum InputName {
  title = "title",
  description = "description",
  address = "address",
}
interface IAction {
  type: string;
  value: string;
  isValid: boolean;
  inputId: InputName;
}

const formReducer = <T extends AddInputs | EditInputs>(
  state: AllInputs<T>,
  action: IAction
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

    default:
      return state;
  }
};

export default formReducer;
