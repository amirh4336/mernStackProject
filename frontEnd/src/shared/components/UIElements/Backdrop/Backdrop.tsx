import ReactDOM from "react-dom";

import "./Backdrop.css";
import { FC } from "react";

interface IBackdropProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Backdrop: FC<IBackdropProps> = ({ onClick }) => {
  const content = <div className="backdrop" onClick={onClick}></div>;

  return ReactDOM.createPortal(
    content,
    document.getElementById("backdrop-hook") as HTMLElement
  );
};

export default Backdrop;
