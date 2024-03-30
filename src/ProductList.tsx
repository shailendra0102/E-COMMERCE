import { useEffect, useState } from "react";
import { useCart } from "./cart-context";
import Modal from "./model";
import { CartList } from "./CartList";
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
    userQty?: number;
}
export const ProductList = () => {
    const [products, setproducts] = useState<Product[]>([]);
    const {cartItems, setCartItem: addToCart} = useCart();
    const [openModal, setIsOpenModel] = useState<boolean>(false)
    useEffect(() => {
        const fetchData = async() => {
            const data = await fetch('https://fakestoreapi.com/products');
            const response = await data.json();
            setproducts(response);
        }
        fetchData();
    },[])
    const clickHandler = (product: Product) => {
        const isExists = cartItems.some((item) => item.id === product.id);
        if(!isExists) {
            product.userQty = 1;
            cartItems.push(product);
            addToCart([...cartItems]);
        } else {
            console.log('item already in cart');
        }
    }
    const cartHandler = () => {
        setIsOpenModel(true);
    }
    return (
        <>
         <div className="main-container">
            <div className="header">
                <h1>Product List</h1>
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
            </div>
            <div className="content">
                <div className="product-list">
                    {
                    products.map(
                        (product)=>{
                            return (
                                <div className="product" key={product.id}>
                                    <p>{product.title}</p>
                                    <p>{product.price}</p>
                                    <button className="btn-cart" onClick={() => clickHandler(product)}>Add to Cart</button>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
            <Modal isOpen={openModal} onClose={()=> setIsOpenModel(false)}>
               {!cartItems.length && <div>Your shoping cart is empty</div>}
               {!!cartItems.length && <CartList />}
            </Modal>
        </div>
        </>
    )
}