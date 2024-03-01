import { FC } from "react";
import "./Input.css";

interface IInputProps {
  elementProps: string;
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  rows?: number;
}

const Input: FC<IInputProps> = ({
  elementProps,
  id,
  label,
  type,
  placeholder,
  rows,
}) => {
  const element =
    elementProps === "input" ? (
      <input id={id} type={type} placeholder={placeholder} />
    ) : (
      <textarea id={id} rows={rows || 3} />
    );

  return (
    <div className={`form-control`}>
      <label htmlFor={id}>{label}</label>
      {element}
    </div>
  );
};

export default Input;
