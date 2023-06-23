import React from "react";

type button = {
  children?: React.ReactNode;
  text?: string;
  btnStyle?: string;
  textStyles?: string;
};

const Button = ({ children, text, btnStyle, textStyles }: button) => {
  return (
    <button className={btnStyle}>
      {children ?? <p className={textStyles}>{text}</p>}
    </button>
  );
};

export default Button;
