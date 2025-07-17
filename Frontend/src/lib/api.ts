import axios from "axios";
import { slugify } from "../utils/slugify";
import { backendUrl } from "../App";

export const getProductsData = async () => {
  const response = await axios.get(backendUrl + "/api/product/list");

  return response.data.products;
};

export const getProductBySlug = async (slug: string) => {
  const all = await getProductsData();
  return all.find((item: any) => slugify(item.name) === slug);
};
