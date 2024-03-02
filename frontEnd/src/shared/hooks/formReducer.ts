type AddInputNames = "title" | "description" | "address";

type EditInputNames = "title" | "description";

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

export enum InputName {
  title = "title",
  description = "description",
  address = "address",
}

type ActionSetData<T extends AddInputs | EditInputs> = AllInputs<T> & {
  type: "SET_DATA";
};

type ActionInputChange = {
  type: "INPUT_CHANGE";
  value: string;
  isValid: boolean;
  inputId: InputName;

}
type IAction<T extends AddInputs | EditInputs> = ActionInputChange | ActionSetData<T>

const formReducer = <T extends AddInputs | EditInputs>(
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

    case "SET_DATA" : {
      return {
        inputs: action.inputs,
        isValid: action.isValid
      }
    }

    default:
      return state;
  }
};

export default formReducer;
