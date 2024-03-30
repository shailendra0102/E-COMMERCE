import { createContext, useContext, useState } from "react";
import { Product } from "./ProductList";
interface ContextProp {
    cartItems: Product[];
    setCartItem: React.Dispatch<React.SetStateAction<Product[]>>
}

const CartContext = createContext<ContextProp>(null as any)

export const UserCart = ({children}: any) => {
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