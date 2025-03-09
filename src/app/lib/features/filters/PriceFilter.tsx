import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import MultiRangeSlider from "../../shared/ui/MultiRangeSlider";
import Button from "../../shared/ui/Button";
import SvgArrow from "../../shared/svg/SvgArrow";
import classNames from "classnames";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

const PriceFilter: FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [minPrice, maxPrice]);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value));
    setLocalMin(value);
    onPriceChange(value, localMax);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value));
    setLocalMax(value);
    onPriceChange(value, localMin);
  };

  const handleSliderChange = useCallback(
    (values: number | number[]) => {
      if (Array.isArray(values)) {
        setLocalMin(values[0]);
        setLocalMax(values[1]);
        onPriceChange(values[0], values[1]);
      }
    },
    [onPriceChange]
  );

  return (
    <div className="flex flex-col mt-[10px]">
      <Button
        className="flex w-full text-black-500 justify-between"
        color="transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Цена</span>
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
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              type="number"
              value={localMin}
              onChange={handleMinChange}
              className="w-1/2 p-2 outline-[#4485f9] bg-[#eaeef4] rounded"
              min={0}
              placeholder="Минимальная цена"
            />
            <input
              type="number"
              value={localMax}
              onChange={handleMaxChange}
              className="w-1/2 p-2 outline-[#4485f9] bg-[#eaeef4] rounded"
              min={0}
              placeholder="Максимальная цена"
            />
          </div>
          <MultiRangeSlider
            min={0}
            max={100}
            onChange={({ min, max }: { min: number; max: number }) =>
              handleSliderChange([min, max])
            }
          />
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
