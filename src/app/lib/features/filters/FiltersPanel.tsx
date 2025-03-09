import React, { Dispatch, FC, SetStateAction, useMemo } from "react";
import FilterSection from "./FilterSection";
import { FilterType, IProduct } from "../../shared/types/product";
import PriceFilter from "./PriceFilter";

interface FiltersPanelProps {
  products: IProduct[];
  filters: FilterType;
  setFilters: Dispatch<SetStateAction<FilterType>>;
}

const FiltersPanel: FC<FiltersPanelProps> = ({
  products,
  filters,
  setFilters,
}) => {
  const filterOptions = useMemo(() => {
    return {
      brand: Array.from(
        new Set(products.map((product) => product.characteristics.brand))
      ),
      dossage: Array.from(
        new Set(products.map((product) => product.characteristics.dossage))
      ),
      quantityPerPackage: Array.from(
        new Set(
          products.map((product) => product.characteristics.quantityPerPackage)
        )
      ).sort((a, b) => a - b),
      releaseForm: Array.from(
        new Set(products.map((product) => product.characteristics.releaseForm))
      ),
      manufacturer: Array.from(
        new Set(products.map((product) => product.characteristics.manufacturer))
      ),
      country: Array.from(
        new Set(products.map((product) => product.characteristics.country))
      ),
    };
  }, [products]);

  const handleFilterChange = (
    filterKey: string,
    selectedValues: string[] | number[]
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: selectedValues,
    }));
  };
  return (
    <div className="flex flex-col space-y-4 w-[270px] bg-white px-[12px] rounded-xl h-fit">
      <PriceFilter
        minPrice={filters.priceRange[0] as number}
        maxPrice={filters.priceRange[1] as number}
        onPriceChange={(min, max) =>
          setFilters((prev) => ({ ...prev, priceRange: [min, max] }))
        }
      />
      <FilterSection
        title="Бренд"
        options={filterOptions.brand}
        selectedFilters={filters.brand as string[]}
        onFilterChange={(selected) => handleFilterChange("brand", selected)}
      />
      <FilterSection
        title="Форма выпуска"
        options={filterOptions.releaseForm}
        selectedFilters={filters.releaseForm as string[]}
        onFilterChange={(selected) =>
          handleFilterChange("releaseForm", selected)
        }
      />
      <FilterSection
        title="Дозировка"
        options={filterOptions.dossage}
        selectedFilters={filters.dossage as string[]}
        onFilterChange={(selected) => handleFilterChange("dossage", selected)}
      />
      <FilterSection
        title="Количество в упаковке"
        options={filterOptions.quantityPerPackage.map((q) => q.toString())}
        selectedFilters={filters.quantityPerPackage.map((q) => q.toString())}
        onFilterChange={(selected) =>
          handleFilterChange("quantityPerPackage", selected.map(Number))
        }
      />
      <FilterSection
        title="Производитель"
        options={filterOptions.manufacturer}
        selectedFilters={filters.manufacturer as string[]}
        onFilterChange={(selected) =>
          handleFilterChange("manufacturer", selected)
        }
      />
      <FilterSection
        title="Страна"
        options={filterOptions.country}
        selectedFilters={filters.country as string[]}
        onFilterChange={(selected) => handleFilterChange("country", selected)}
      />
    </div>
  );
};

export default FiltersPanel;
