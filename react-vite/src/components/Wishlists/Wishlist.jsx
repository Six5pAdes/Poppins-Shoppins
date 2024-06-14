import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWishlistsThunk } from "../../redux/wishlist";
import "./Wishlist.css";

const Wishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.session.user.id);
    const wishlists = useSelector((state) => state.favorites?.MyWishlists);

    const handleNav = (productId) => {
        navigate(`/products/${productId}`);
    }

    useEffect(() => {
        if (!userId) navigate("/");
        else dispatch(getWishlistsThunk(userId));
    }, [dispatch, userId, navigate]);

    return (
        <div className="wish-contain">
            <h1 id="curr-title">My Wishlist</h1>
            <section className="wish-list">
                {wishlists?.map((product) => (
                    <div key={product.id} className='product-card'>
                        <div
                            title={product.name}
                            key={product.id}
                        >
                            <img src={product.image} className='product-img'
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
