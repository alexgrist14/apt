import { IProduct } from "../types/product";
import agent from "./agent";

export const getProducts = () => {
  return agent.get<IProduct[]>(`http://localhost:9080/api/products`);
};
