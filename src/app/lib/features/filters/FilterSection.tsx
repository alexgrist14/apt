import React, { FC, useState } from "react";
import Button from "../../shared/ui/Button";
import SvgArrow from "../../shared/svg/SvgArrow";
import classNames from "classnames";
interface FilterSectionProps {
  title: string;
  options: string[];
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const FilterSection: FC<FilterSectionProps> = ({
  title,
  options,
  selectedFilters,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleCheckboxChange = (option: string) => {
    const newFilters = selectedFilters.includes(option)
      ? selectedFilters.filter((filter) => filter !== option)
      : [...selectedFilters, option];
    onFilterChange(newFilters);
  };

  return (
    <div className="border-b border-[#eaeef4] text-[#8A94A8]">
      <Button
        className="w-full text-black justify-between"
        color="transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <SvgArrow
          className={classNames(
            "-mr-1 ml-2 h-5 w-5 transition-transform duration-200",
            {
              ["rotate-180"]: isOpen,
            }
          )}
        />
      </Button>
      {isOpen && (
        <div className="overflow-y-auto max-h-64 pb-4">
          {options.map((option, i) => (
            <label
              key={`${option} - ${i}`}
              className="flex items-center space-x-2 gap-2 mt-[5px]"
            >
              <input
                type="checkbox"
                checked={selectedFilters.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="form-checkbox min-w-[18px] min-h-[18px] cursor-pointer"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
