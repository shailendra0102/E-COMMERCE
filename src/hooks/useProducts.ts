import { useEffect, useState } from "react";
import { Product } from "../components/ProductList";

export const useProducts = (url: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [products, setproducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchData = async() => {
            const data = await fetch(url);
            const response = await data.json();
            setIsLoading(false);
            setproducts(response);
        }
        fetchData();
    },[])

    return {isLoading, products};
}