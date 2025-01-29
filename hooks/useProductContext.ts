import { ProductContext } from "@/components/ProductProvider"
import { useContext } from "react"

export const useProductContext = () => {
    const context = useContext(ProductContext);
    return context;
}

export default useProductContext