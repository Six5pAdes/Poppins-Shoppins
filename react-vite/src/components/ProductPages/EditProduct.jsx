import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editProductThunk, loadOneProductThunk } from "../../redux/product"
import './ProductForm.css'

const ProductUpdate = () => {
    const { productId } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currProduct = useSelector(state => state.products[productId])
    const user = useSelector(state => state.session.user)

    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        setSubmit(true)

        if (Object.values(errors).length === 0) {
            const formData = new FormData();
            formData.append("user_id", user?.id);
            formData.append("name", name);
            if (image) formData.append("image", image);
            formData.append("price", price);
            formData.append("description", description);

            await dispatch(editProductThunk(formData, productId));
            navigate(`/products/${productId}`);
        }
    }

    useEffect(() => {
        if (productId) dispatch(loadOneProductThunk(productId))
    }, [dispatch, productId])

    useEffect(() => {
        if (currProduct) {
            setName(currProduct.name)
            setPrice(currProduct.price)
            setDescription(currProduct.description)
        }
    }, [currProduct])

    useEffect(() => {
        const valErr = {}

        if (!name) {
            valErr.name = "Name is required"
        }
        if (!price) {
            valErr.price = "Price is required"
        } else if (isNaN(price) || parseFloat(price) <= 0) {
            valErr.price = "Price must be more than one cent"
        }
        if (!description?.length) {
            valErr.description = "Description is required"
        }
        setErrors(valErr)
    }, [name, description, price])

    const disabledButton = () => {
        return (!name || !price || !description)
    }

    const handleCancel = () => {
        navigate(-1)
    }

    return (
        <div id="product-new">
            <h1>Make Changes to Product</h1>
            <form
                onSubmit={handleSubmit}
                id='full-form'
                encType="multipart/form-data">
                <div>
                    <label className="product-label">
                        Product Name
                        <input
                            type="text"
                            className="product-inputs"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    {submit && errors.name && <p className="err-msg">{errors.name}</p>}
                    <label className="product-label">
                        Image
                        <input
                            type="file"
                            className="product-inputs"
                            label="Upload image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                    {submit && errors.address && <p className="err-msg">{errors.address}</p>}
                    <label className="product-label">
                        $ <input
                            type="text"
                            className="product-inputs"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            id="price"
                        />
                    </label>
                    {submit && errors.price && <p className="err-msg">{errors.price}</p>}
                    <label className="product-label">
                        Description
                        <textarea
                            placeholder="Please describe what the item is"
                            className="product-inputs"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    {submit && errors.description && <p className="err-msg">{errors.description}</p>}
                </div>
                <div id="button-contain">
                    {disabledButton() ?
                        <button className="disabled" type="submit">Create Product</button>
                        :
                        <button className="success" type="submit">Create Product</button>
                    }
                    <button className="success" type="button" onClick={handleCancel}>Cancel Creation</button>
                </div>
            </form>
        </div>
    )
}

export default ProductUpdate
