import { FC, useEffect, useMemo, useState } from "react";
import { getProducts } from "../app/lib/shared/api/protucts";
import {
  FilterType,
  ICharacteristics,
  IProduct,
} from "../app/lib/shared/types/product";
import ProductCard from "../app/lib/shared/ui/ProductCard";
import Dropdown from "@/app/lib/shared/ui/DropDown";
import Button from "@/app/lib/shared/ui/Button";
import SvgGrid from "@/app/lib/shared/svg/SvgGrid";
import ReactPaginate from "react-paginate";
import SvgArrow from "@/app/lib/shared/svg/SvgArrow";
import { PRODUCTS_PER_PAGE } from "@/app/lib/shared/constants/products";
import FiltersPanel from "@/app/lib/features/filters/FiltersPanel";
import ActiveFilters from "@/app/lib/features/filters/ActiveFilters";
import '../app/globals.css'

const Home: FC<{ products: IProduct[] }> = ({ products }) => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState<IProduct[]>([]);
  const [sortOption, setSortOption] = useState("По релевантности");
  const [filters, setFilters] = useState<FilterType>({
    priceRange: [0, 100],
    brand: [],
    dossage: [],
    quantityPerPackage: [],
    releaseForm: [],
    manufacturer: [],
    country: [],
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesFilters = Object.entries(filters).every(
        ([key, selectedValues]) => {
          if (selectedValues.length === 0) return true;
          if (key === "priceRange") {
            const [minPrice, maxPrice] = selectedValues as [number, number];
            return product.price >= minPrice && product.price <= maxPrice;
          }
          const productValue =
            product.characteristics[key as keyof ICharacteristics];
          return (selectedValues as (string | number | boolean)[]).includes(
            productValue
          );
        }
      );
      return matchesFilters;
    });
  }, [products, filters]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortOption) {
      case "Сначала дешевые":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Сначала дорогие":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredProducts, sortOption]);

  useEffect(() => {
    setItemOffset(0);
  }, [filteredProducts]);

  useEffect(() => {
    const endOffset = itemOffset + PRODUCTS_PER_PAGE;
    setCurrentItems(sortedProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE));
  }, [itemOffset, sortedProducts]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset =
      (event.selected * PRODUCTS_PER_PAGE) % sortedProducts.length;
    setItemOffset(newOffset);
  };

  const handleClearFilter = (
    filterKey?: keyof FilterType,
    valueToRemove?: string | number
  ) => {
    if (filterKey && valueToRemove !== undefined) {
      if (filterKey === "priceRange") {
        const [minPrice, maxPrice] = filters.priceRange;
        const [defaultMin, defaultMax] = [0, 100];

        if (valueToRemove === minPrice) {
          setFilters((prevFilters) => ({
            ...prevFilters,
            priceRange: [defaultMin, maxPrice] as [number, number],
          }));
        } else if (valueToRemove === maxPrice) {
          setFilters((prevFilters) => ({
            ...prevFilters,
            priceRange: [minPrice, defaultMax] as [number, number],
          }));
        }
      } else {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filterKey]: prevFilters[filterKey].filter(
            (value) => value !== valueToRemove
          ) as FilterType[typeof filterKey],
        }));
      }
    } else {
      // Очищаем все фильтры
      setFilters({
        priceRange: [0, 100] as [number, number],
        brand: [],
        dossage: [],
        quantityPerPackage: [],
        releaseForm: [],
        manufacturer: [],
        country: [],
      });
    }
  };

  return (
    <div className="bg-[#f4f6fa] min-h-[100vh]">
      <div className="max-w-[1440px] flex flex-col h-full w-full mx-auto gap-4 p-5">
        <div className="flex justify-between min-h-[48px] gap-4">
          <ActiveFilters filters={filters} onClearFilter={handleClearFilter} />
          <div className="flex items-center justify-end gap-2">
            <Dropdown
              selectedOption={sortOption}
              onOptionChange={setSortOption}
            />
            <div className="flex flex-row items-center">
              <Button className="min-w-[34px] justify-center items-center text-center">
                <SvgGrid className="text-white" type="grid" />
              </Button>
              <Button className="min-w-[34px] justify-center items-center text-center">
                <SvgGrid type="horizontal" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-4">
          <FiltersPanel
            filters={filters}
            products={products}
            setFilters={setFilters}
          />
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-4 gap-4">
              {currentItems.length ? (
                currentItems.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div>Товары не найдены</div>
              )}
            </div>
            {currentItems.length ? (
              <ReactPaginate
                breakLabel="..."
                nextLabel={
                  <SvgArrow className="rounded-full w-[34px] h-[34px] rotate-270 cursor-pointer" />
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                pageCount={pageCount}
                containerClassName="flex items-center text-[14px] justify-center gap-[20px] mx-auto select-none"
                activeClassName="w-[34px] h-[34px] bg-[#4485f9] text-center flex items-center justify-center rounded-full text-white"
                pageLinkClassName="cursor-pointer"
                previousLabel={
                  <SvgArrow className="rounded-full w-[34px] h-[34px] rotate-90 cursor-pointer" />
                }
              />
            ): null}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const products = (await getProducts()).data;

  return { props: { products } };
};

export default Home;
