import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadCategoryProductsThunk } from "../../redux/product";
import "./Category.css";

function Category() {
    const { category } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const products = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(loadCategoryProductsThunk(category));
    }, [dispatch, category]);

    const filteredProducts = Object.values(products)
    if (filteredProducts.length === 0) {
        return <h1>✨ Loading ✨</h1>;
    }
    // console.log(filteredProducts)

    const prodArr = filteredProducts.filter((product) => product?.category?.toLowerCase() == category);
    // console.log(category)

    const validCategories = ['clothing', 'creativity', 'furniture', 'handmade', 'miscellaneous'];
    const isValidCategory = validCategories.includes(category);

    if (!isValidCategory) {
        return <h1 className="invalid-cat-txt">No results for this category</h1>;
    }

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`)
    }

    return (
        <div className="category-contain">
            <h1 className="category-title">{category.toUpperCase()}</h1>
            {prodArr?.length > 0 && <p>{prodArr?.length} result{prodArr.length > 1 ? 's' : ''}</p>}
            <div className="category-items">
                {prodArr?.map((product) => (
                    <div
                        key={product?.id}
                        className='one-product-contain'
                        title={product?.name}
                        onClick={() => handleProductClick(product.id)}
                    >
                        <img
                            className='image'
                            src={product?.image}
                            alt={product?.name}
                        />
                        <p className='name'>{product?.name}</p>
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
