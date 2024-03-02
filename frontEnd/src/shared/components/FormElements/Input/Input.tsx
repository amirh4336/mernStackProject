import { ChangeEvent, FC, HTMLInputTypeAttribute, useEffect, useReducer } from "react";
import "./Input.css";
import inputReducer from "./inputReducer";
import { InputName } from "../../../hooks/form-hooks/types";

interface IInputProps {
  elementProps: string;
  id: InputName;
  label: string;
  type?: HTMLInputTypeAttribute ;
  placeholder?: string;
  rows?: number;
  errorText?: string;
  validators?: any;
  onInput: (id: InputName, value: string, isValid: boolean) => void;
  initialValue?: string;
  initialValid?: boolean;
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
  initialValue,
  initialValid,
}) => {
  const [{ value, isValid, isTouched }, dispatch] = useReducer(inputReducer, {
    value: initialValue || "",
    isTouched: false,
    isValid: initialValid || false,
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
