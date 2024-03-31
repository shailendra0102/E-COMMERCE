import { ReactNode, createContext, useContext, useState } from "react";
import { Product } from "../components/ProductList";

export interface ContextProp {
    cartItems: Product[];
    setCartItem: React.Dispatch<React.SetStateAction<Product[]>>
}

const CartContext = createContext<ContextProp>(null as any)

interface IUserCart {
    children: ReactNode;
    value: ContextProp;
}

export const UserCart = ({children}: IUserCart) => {
    const [cartItem, setCartItem] = useState<Product[]>([]);
    return(
        <>
        <CartContext.Provider value={{cartItems: cartItem, setCartItem}}>
            {children}
        </CartContext.Provider>
        </>
    )
}

export const useCart = () => useContext(CartContext);