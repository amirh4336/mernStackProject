import { FC } from "react";
import "./MainHeader.css";

interface IMainHeaderProps {
  children?: React.ReactNode;
}

const MainHeader: FC<IMainHeaderProps> = ({ children }) => {
  return <header className="main-header">{children}</header>;
};

export default MainHeader;
