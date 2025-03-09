import { FC } from "react";

const SvgGrid: FC<{ className?: string; type: "grid" | "horizontal" }> = ({
  className,
  type,
}) => {
  return (
    <>
      {type === "grid" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          className={className}
        >
          <path
            fill="currentColor"
            d="M0 0h7v7H0zm9 0h7v7H9zm7 9H9v7h7zM0 9h7v7H0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 512 512"
          className={className}
        >
          <path
            fill="currentColor"
            d="M32 96v64h448V96zm0 128v64h448v-64zm0 128v64h448v-64z"
          />
        </svg>
      )}
    </>
  );
};

export default SvgGrid;
