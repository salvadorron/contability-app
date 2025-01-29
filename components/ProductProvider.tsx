import { createContext, useState } from "react";
import { ProductItemProp } from "../constants/definitions";

export const ProductContext = createContext<{
    products: ProductItemProp[],
    setProduct: (product: ProductItemProp[]) => void
}>({ products: [], setProduct: () => {} });


export default function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProduct] = useState<ProductItemProp[]>([])
    return (
        <ProductContext.Provider value={{ products, setProduct }} >
            {children}
        </ProductContext.Provider>
    )
}
