import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import classnames from "classnames";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange: ({ min, max }: { min: number; max: number }) => void;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
  min,
  max,
  onChange,
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);
  const prevMinValRef = useRef(minVal);
  const prevMaxValRef = useRef(maxVal);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    if (prevMinValRef.current !== minVal || prevMaxValRef.current !== maxVal) {
      onChange({ min: minVal, max: maxVal });

      prevMinValRef.current = minVal;
      prevMaxValRef.current = maxVal;
    }
  }, [minVal, maxVal, onChange]);

  return (
    <div className="flex items-center justify-center">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={classnames("thumb thumb--zindex-3", {
          "thumb--zindex-5": minVal > max - 100,
        })}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb thumb--zindex-4"
      />

      <div className="relative w-[200px]">
        <div className="absolute rounded-[3px] h-[2px] bg-[#eaeef4] w-full z-1"></div>
        <div
          ref={range}
          className="absolute rounded-[3px] bg-[#4485f9] z-2 h-[2px]"
        ></div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
