import classNames from "classnames";
import React, { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps
  extends Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    | "children"
    | "disabled"
    | "type"
    | "className"
    | "onClick"
    | "form"
    | "style"
  > {
  color?: "accent" | "transparent";
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  color = "accent",
  onClick,
}) => {
  return (
    <button
      className={classNames(
        "flex h-[32px] rounded-[8px] font-weight-[600] cursor-pointer",
        className,
        {
          ["bg-[#4485f9] hover:bg-[#347bf9] text-white"]: color === "accent",
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
