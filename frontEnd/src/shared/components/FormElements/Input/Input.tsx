import { ChangeEvent, FC, useEffect, useReducer } from "react";
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
  onInput: (id: string, value: string, isValid: boolean) => void;
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
  onInput,
}) => {
  const [{ value, isValid, isTouched }, dispatch] = useReducer(inputReducer, {
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
        value={value}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={value}
      />
    );

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  return (
    <div
      className={`form-control ${
        !isValid && isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!isValid && isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
