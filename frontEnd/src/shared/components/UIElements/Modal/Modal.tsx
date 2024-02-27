import ReactDOM from "react-dom";

import "./Modal.css";
import { FC, ReactNode } from "react";
import Backdrop from "../Backdrop/Backdrop";
import { CSSTransition } from "react-transition-group";

interface IModalOverLayProps {
  className?: string;
  style?: React.CSSProperties | undefined;
  headerClass?: string;
  header?: string;
  onSubmit?: () => void;
  contentClass?: string;
  children: ReactNode;
  footerClass?: string;
  footer?: ReactNode;
}

const ModalOverLay: FC<IModalOverLayProps> = ({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  contentClass,
  children,
  footerClass,
  footer,
}) => {
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-hook") as HTMLElement
  );
};

interface IModalProps extends IModalOverLayProps {
  show?: boolean;
  onCancel: () => void;
}

const Modal: FC<IModalProps> = ({ show, onCancel, ...props }) => {
  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverLay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
