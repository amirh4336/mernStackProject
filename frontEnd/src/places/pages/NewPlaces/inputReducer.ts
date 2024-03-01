interface IState {
  value: string;
  isValid: boolean;
}

interface IAction {
  type: string;
  payload?: any;
}
const inputReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.payload,
        isValid: true,
      };

    default:
      return state;
  }
};

export default inputReducer