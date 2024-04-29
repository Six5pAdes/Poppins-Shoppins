import { createBrowserRouter } from 'react-router-dom';
// import LoginFormPage from '../components/LoginFormPage';
// import SignupFormPage from '../components/SignupFormPage';
import Landing from '../components/Landing/Landing';
import Layout from './Layout';
import ProductDetails from '../components/ProductPages/SingleProduct';
import CreateProduct from '../components/ProductPages/ProductForm';
import ManageProduct from '../components/ProductPages/ManageProduct';
import ProductUpdate from '../components/ProductPages/EditProduct';
import CreateReview from '../components/ReviewPages/ReviewForm';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetails />
      },
      {
        path: "/products/current",
        element: <ManageProduct />
      },
      {
        path: "/new-product",
        element: <CreateProduct />
      },
      {
        path: "/products/:productId/edit",
        element: <ProductUpdate />
      },
      {
        path: "/new-review",
        element: < CreateReview />
      },
      // {
      //   path: "/cart",
      //   element: < />
      // },
      // {
      //   path: "/wishlist",
      //   element: < />
      // },
      // {
      //   path: "/my-orders",
      //   element: < />
      // },
      {
        path: "*",
        element: <h1>ELEMENT NOT FOUND</h1>
      }
    ],
  },
]);
