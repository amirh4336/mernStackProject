export enum InputName {
  title = "title",
  description = "description",
  address = "address",
}

interface IState {
  inputs: {
    [InputName.title]: {
      value: string;
      isValid: boolean;
    };
    [InputName.description]: {
      value: string;
      isValid: boolean;
    };
    [InputName.address]: {
      value: string;
      isValid: boolean;
    };
  };
  isValid: boolean;
}
interface IAction {
  type: string;
  value: string;
  isValid: boolean;
  inputId: InputName;
}

const formReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case "INPUT_CHANGE": {
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid =
            formIsValid &&
            state.inputs[inputId as keyof typeof InputName].isValid;
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
