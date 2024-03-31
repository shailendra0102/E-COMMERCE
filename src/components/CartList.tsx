import { ChangeEvent } from "react";
import { useCart } from "../context/cart-context";
import { Product } from "./ProductList";

export const CartList = () => {
    const {cartItems, setCartItem: addToCart} = useCart();
    const quantityHandler = (product: Product, event: ChangeEvent<HTMLSelectElement>) => {
        product.userQty = Number(event.target.value);
        addToCart([...cartItems])
    }
    return(
        <>
            <h1>Items in Cart!!</h1>
            {
                cartItems.map((product) => {
                    return (
                        <div key={product.id} style={{borderBottom: '1px solid black', padding: '2px'}}>
                            <p>{product.title}</p>
                            <p>{product.price}</p>
                            Qty: <select onChange={(event) => quantityHandler(product, event)} defaultValue={product.userQty}>
                                <option value={0}>0(Delete)</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </select>
                        </div>
                    )
                })
            }
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '40px'}}>
                <div>Total: {cartItems.reduce((total, product)=> total + product.price*product.userQty, 0)}</div>
                <div><button>PayNow</button></div>
            </div>
        </>
        
    )
}