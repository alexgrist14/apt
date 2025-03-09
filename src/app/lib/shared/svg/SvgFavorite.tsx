import { FC } from "react";

const SvgFavorite: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="#6E7E96"
    >
      <path
        d="M12.2124 4.67558L12.2124 4.6756L12.3651 4.80089L12.9995 5.32133L13.6338 4.80086L13.7864 4.67558C13.7864 4.67557 13.7864 4.67557 13.7865 4.67557C15.1958 3.51922 16.646 2.97461 18.14 2.97461C21.2635 2.97461 23.7957 5.50677 23.7957 8.6304C23.7957 13.1794 20.4289 17.9102 12.9992 22.8267C5.56976 17.9102 2.20312 13.1794 2.20312 8.6304C2.20312 5.5068 4.73533 2.97461 7.85894 2.97461C9.35279 2.97461 10.8031 3.51922 12.2124 4.67558Z"
        stroke="#6E7E96"
        strokeWidth="2"
        className="stroke-inherit"
      ></path>
    </svg>
  );
};

export default SvgFavorite;
