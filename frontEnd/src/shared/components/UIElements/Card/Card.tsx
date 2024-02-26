import React, { FC } from "react";

import "./Card.css";

interface ICardProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Card: FC<ICardProps> = (props) => {

  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
