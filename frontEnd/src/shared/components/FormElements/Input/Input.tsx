import { ChangeEvent, FC, useReducer } from "react";
import "./Input.css";
import inputReducer from "./inputReducer";

interface IInputProps {
  elementProps: string;
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  rows?: number;
  errorText?: string;
  validators?: any;
}

const Input: FC<IInputProps> = ({
  elementProps,
  id,
  label,
  type,
  placeholder,
  rows,
  errorText = "something went wrong !",
  validators,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ type: "CHANGE", payload: event.target.value, validators });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const element =
    elementProps === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
