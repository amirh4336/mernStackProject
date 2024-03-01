import { ChangeEvent, FC, useReducer } from "react";
import "./Input.css";
import inputReducer from "../../../../places/pages/NewPlaces/inputReducer";

interface IInputProps {
  elementProps: string;
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  rows?: number;
  errorText?: string;
}

const Input: FC<IInputProps> = ({
  elementProps,
  id,
  label,
  type,
  placeholder,
  rows,
  errorText = "something went wrong !",
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ type: "CHANGE", payload: event.target.value });
  };
  const element =
    elementProps === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!inputState.isValid && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
