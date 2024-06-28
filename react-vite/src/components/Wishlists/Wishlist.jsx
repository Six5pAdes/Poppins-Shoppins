import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWishlistsThunk } from "../../redux/wishlist";
import "./Wishlist.css";

const Wishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.session.user);
    const wishlists = useSelector((state) => state.wishlists?.WishProd);

    // if (!userId) navigate("/");

    // const handleNav = (productId) => {
    //     navigate(`/products/${productId}`);
    // }

    // useEffect(() => {
    //     dispatch(getWishlistsThunk());
    // }, [dispatch]);

    useEffect(() => {
        if (!userId) {
            navigate("/");
        }
        dispatch(getWishlistsThunk());
    }, [dispatch, userId, navigate]);

    const handleNav = (productId) => {
        navigate(`/products/${productId}`);
    }

    if (!wishlists) return <h1>✨ Loading ✨</h1>;

    return (
        <div className="wish-contain">
            <h1 id="curr-title">My Wishlist</h1>
            <section className="wish-list">
                {wishlists?.map((product) => (
                    <div key={product.id} className='wishlist-item'>
                        <div
                            title={product.name}
                            key={product.id}
                        >
                            <img src={product.image} className='wishlist-img'
                                onClick={() => handleNav(product.id)}
                            />
                            <p className='name'>{product.name}</p>
                            <p className='product-price'>${parseFloat(product.price).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Wishlist;
