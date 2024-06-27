import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadCategoryProductsThunk } from "../../redux/product";
import { useNavigate } from 'react-router-dom';
import "./Category.css";

function Category() {
    const { category } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const products = useSelector((state) => state.products[category]);

    useEffect(() => {
        dispatch(loadCategoryProductsThunk(category));
    }, [dispatch, category]);

    const validCategories = ['clothing', 'creativity', 'furniture', 'handmade', 'miscellaneous'];
    const isValidCategory = validCategories.find(cat => cat === category);

    if (!isValidCategory) {
        return <h1 className="invalid-cat-txt">No results for this category</h1>;
    }

    // const filteredProducts = Object.values(products).filter(product => product.category === category);
    // console.log("Filtered products: ", filteredProducts)
    console.log('Category:', category); // Add this line
    console.log('Products:', products); // Add this line

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`)
    }

    return (
        <div className="category-contain">
            <h1 className="category-title">{category.toLocaleUpperCase()}</h1>
            {products?.length > 0 && <p>{products?.length} result{products.length > 1 ? 's' : ''}</p>}
            <div className="category-items">
                {products && products.map((product) => (
                    <div
                        key={product?.id}
                        className='one-product-contain'
                        title={product?.name}
                        onClick={() => handleProductClick(product.id)}
                    >
                        <img
                            className='image'
                            src={product?.image}
                        />
                        <p className='name'
                        >{product?.name}</p>
                        <div className='info'>
                            <p className='price'>{`$${parseFloat(product?.price).toFixed(2)}`}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Category;
