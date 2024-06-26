import { memo, useCallback, useState } from "react";
import Modal from "../shared/model";
import { CartList } from "./CartList";
import { useProducts } from "../hooks/useProducts";
//context usage
// import { useCart } from "../context/cart-context";
//Redux usage
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { userCartSelector, addToCart } from "../redux/slice/user-cartslice";
// import { addToCart } from "../redux/slice/user-cartslice";

interface Rating {
    rate: number;
    count: number;
}
export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
    userQty: number;
}

const Header = memo(() => {
    console.log('rendering header');
    return (
        <>
            <div className="header">
                <h1>Product List</h1>
                <CartButton />
            </div>
        </>
    )
})

const CartButton = () => {
    const [openModal, setIsOpenModel] = useState<boolean>(false);
    // const {cartItems} = useCart();  --> context usage
    const cartItems = useAppSelector(userCartSelector).cartItems; //redux usage
    const cartHandler = useCallback(() => {
        setIsOpenModel(true);
    },[])
    return(
        <>
        <div>
            <button onClick={cartHandler}>cart</button>
            <span>{cartItems.reduce((accum, currentProduct)=> {
                if(currentProduct.userQty) {
                    return accum + currentProduct.userQty
                }else {
                    return accum;
                }
            } ,0)}</span>
        </div>
        <Modal isOpen={openModal} onClose={()=> setIsOpenModel(false)}>
            {!cartItems.length && <div>Your shoping cart is empty</div>}
            {!!cartItems.length && <CartList />}
        </Modal>
     </>
    )
}
export const ProductList = () => {
    // const {cartItems, setCartItem: addToCart} = useCart(); --> context usage
    const cartItems = useAppSelector(userCartSelector).cartItems; //redux usage
    const dispatch = useAppDispatch();
    const {isLoading, products} = useProducts('https://fakestoreapi.com/products');
    const clickHandler = (product: Product) => {
        const isExists = cartItems.some((item) => item.id === product.id);
        if(!isExists) {
            product.userQty = 1;
            // cartItems.push(product); --> context usage
            // addToCart([...cartItems]);
            dispatch(addToCart(product));
        } else {
            alert('item already in cart');
        }
    }
    return (
        <>
         <div className="main-container">
            <Header />
            <div className="content">
                <div className="product-list">
                    {
                    products.map(
                        (product: Product)=>{
                            return (
                                <div className="product" key={product.id}>
                                    <p>{product.title}</p>
                                    <p>{product.price}</p>
                                    <button className="btn-cart" onClick={() => clickHandler(product)}>Add to Cart</button>
                                </div>
                            )
                        }
                    )}
                    {
                        isLoading && <h2>Loading products ...</h2>
                    }
                </div>
            </div>
        </div>
        </>
    )
}