import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
import './ECommerce.css';
import { ProductList } from './ProductList.tsx'
import { UserCart } from './cart-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserCart value={{}}>
     <ProductList />
    </UserCart>
  </React.StrictMode>,
)
