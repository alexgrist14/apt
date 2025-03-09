import classNames from "classnames";
import { FC, useState } from "react";
import SvgArrow from "../svg/SvgArrow";
import Button from "./Button";

interface DropDownProps {
  selectedOption: string;
  onOptionChange: (option: string) => void;
}

const Dropdown: FC<DropDownProps> = ({ selectedOption, onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = ["По релевантности", "Сначала дешевые", "Сначала дорогие"];

  const handleOptionClick = (option: string) => {
    onOptionChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative flex items-center justify-center text-[#010713] text-[12px] font-[500]">
      <div>
        <Button
          color="transparent"
          className="justify-center align-center rounded-[8px] px-[14px] text-[12px] py-[9px] bg-[#eaeef4] h-fit"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
          <SvgArrow
            className={classNames(
              "-mr-1 ml-2 h-5 w-5 transition-transform duration-200",
              {
                ["rotate-180"]: isOpen,
              }
            )}
          />
        </Button>
      </div>

      {isOpen && (
        <div className="z-1 absolute top-[45px]  mt-2 rounded-[8px] shadow-md bg-white hover:cursor-pointer">
          <div className="py-1 w-[195px]">
            {options.map((option) => (
              <Button
                color="transparent"
                key={option}
                className="text-center justify-center w-full px-[40px] py-[8px] hover:bg-gray-100 duration-200"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
