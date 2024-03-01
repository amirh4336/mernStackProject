import { validate } from "../../../util/validators";

interface IState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

interface IAction {
  type: string;
  payload?: any;
  validators?: any;
}
const inputReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validators),
      };

    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};

export default inputReducer;
