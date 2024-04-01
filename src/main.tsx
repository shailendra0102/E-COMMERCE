import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './redux/store.ts';
// import App from './App.tsx'
// import './index.css'
import './ECommerce.css';
import { ProductList } from './components/ProductList.tsx'
// import { UserCart, ContextProp } from './context/cart-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <UserCart value={{} as ContextProp}> */}
      <ProductList />
      {/* </UserCart> */}
    </Provider>
  </React.StrictMode>,
)
