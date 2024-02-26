import { FC } from "react";
import "./Avatar.css";

interface IAvatarProps {
  image: string;
  alt: string;
  width?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Avatar: FC<IAvatarProps> = ({ className, image, alt, width, style }) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width: width, height: width }} />
    </div>
  );
};

export default Avatar;
