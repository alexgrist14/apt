import React, { FC } from "react";
import { IProduct } from "../types/product";
import Image from "next/image";
import Button from "./Button";
import SvgFavorite from "../svg/SvgFavorite";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col justify-between h-[450px] w-[270px] items-center p-4  bg-[#ffff] rounded-xl hover:cursor-pointer hover:shadow-md duration-200">
      <div className="relative">
        <Image src={product.image} alt="product" width={215} height={215} />

        {product.characteristics.isByPrescription && (
          <p className="absolute bottom-2 left-2 text-xs bg-red-200 px-2  rounded-[4px] text-red-400">
            По рецепту
          </p>
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 px-5">
        <p className="font-bold my-2">{product.price} р.</p>
        <p className="text-sm">{product.title}</p>

        <p className="text-xs opacity-50">
          {product.characteristics.brand}, {product.characteristics.country}
        </p>

        <div className="flex justify-between items-center w-full gap-2">
          <Button className="min-w-[194px] max-w-[194px] w-full tw-h-[36px] tw-w-full tw-mr-[12px] px-4 justify-center items-center text-center">
            В корзину
          </Button>
          <SvgFavorite className="w-[26px] h-[26px] hover:stroke-[#ff3c6b]" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
