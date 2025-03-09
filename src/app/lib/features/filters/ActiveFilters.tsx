import { FC } from "react";
import { FilterType } from "../../shared/types/product";
import Button from "../../shared/ui/Button";

interface ActiveFiltersProps {
  filters: FilterType;
  onClearFilter: (filterKey?: string, valueToRemove?: string | number) => void;
}

const ActiveFilters: FC<ActiveFiltersProps> = ({ filters, onClearFilter }) => {
  const defaultPriceRange = [0, 100];

  const hasActiveFilters = Object.entries(filters).some(
    ([key, selectedValues]) => {
      if (key === "priceRange") {
        const [minPrice, maxPrice] = selectedValues as [number, number];
        const [defaultMin, defaultMax] = defaultPriceRange;
        return minPrice !== defaultMin || maxPrice !== defaultMax;
      }
      return selectedValues.length > 0;
    }
  );

  if (!hasActiveFilters) return <div></div>;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        color="transparent"
        onClick={() => onClearFilter()}
        className="flex px-3 py-1 bg-gray-200 rounded-full text-[12px] text-[#010713] hover:text-[#4485f9] w-fit items-center "
      >
        Очистить ×
      </Button>

      {Object.entries(filters).map(([filterKey, selectedValues], i) => {
        if (selectedValues.length === 0) return null;

        if (filterKey === "priceRange") {
          const [minPrice, maxPrice] = selectedValues as [number, number];
          const [defaultMin, defaultMax] = defaultPriceRange;

          return (
            <>
              {minPrice !== defaultMin && (
                <Button
                  color="transparent"
                  key={`${filterKey}-${i}`}
                  onClick={() => onClearFilter(filterKey, minPrice)}
                  className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-[12px] hover:text-[#4485f9] hover:line-through"
                >
                  от {minPrice} ×
                </Button>
              )}
              {maxPrice !== defaultMax && (
                <Button
                  color="transparent"
                  key={`${filterKey}-max-${i}`}
                  onClick={() => onClearFilter(filterKey, maxPrice)}
                  className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-[12px] hover:text-[#4485f9] hover:line-through"
                >
                  до {maxPrice} ×
                </Button>
              )}
            </>
          );
        }

        return selectedValues.map((value, index) => (
          <Button
            color="transparent"
            key={`${value}-${index} - ${filterKey}`}
            onClick={() => onClearFilter(filterKey, value)}
            className="items-center text-[#010713] px-3 py-1 bg-gray-200 rounded-full text-[12px] text-sm hover:text-[#4485f9] hover:line-through"
          >
            {value} ×
          </Button>
        ));
      })}
    </div>
  );
};

export default ActiveFilters;
