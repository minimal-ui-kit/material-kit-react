import { _products } from "src/_mock";

export function getProductById(id: string) {
    return _products.find((item) => item.id === id) || undefined;
}