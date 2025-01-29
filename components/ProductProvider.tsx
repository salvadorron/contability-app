import { createContext, useState } from "react";
import { ProductItemProp } from "../constants/definitions";

export const ProductContext = createContext<{
    products: ProductItemProp[],
    setProduct: (product: ProductItemProp[]) => void,
    balance: number,
    setBalance: (balance: number) => void
}>({ products: [], setProduct: () => {}, balance: 0, setBalance: () => {} });


export default function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProduct] = useState<ProductItemProp[]>([])
    const [balance, setBalance] = useState(0);

    return (
        <ProductContext.Provider value={{ products, setProduct, balance, setBalance }} >
            {children}
        </ProductContext.Provider>
    )
}
