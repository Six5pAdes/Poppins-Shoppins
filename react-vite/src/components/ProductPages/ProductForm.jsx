import { useState, useEffect } from "react";
import { newProductThunk } from "../../redux/product";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './ProductForm.css'

const CreateProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const history = useHistory()
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [submit, setSubmit] = useState(false)
    const user = useSelector(state => state.session.user)

    const handleSubmit = async e => {
        e.preventDefault()
        setSubmit(true)

        if (!Object.values(errors).length) {
            const formData = new FormData();
            formData.append("user_id", user.id);
            formData.append("name", name);
            formData.append("image", image);
            formData.append("price", price);
            formData.append("description", description);

            const product = await dispatch(newProductThunk(formData));
            console.log('LOOK HERE', product)
            navigate(`/products/${product?.id}`);
        }
    }

    useEffect(() => {
        const valErr = {}

        if (!name) {
            valErr.name = "Name is required"
        }
        if (!image) {
            valErr.image = "Image is required"
        } else if (typeof image === "object" && image.none) {
            if (
                !image.name.endsWith(".jpeg") &&
                !image.name.endsWith(".jpg") &&
                !image.name.endsWith(".png")
            ) {
                valErr.image =
                    "Image must be in .jpeg, .jpg, or .png format";
            }
        }
        if (!price) {
            valErr.price = "Price is required"
        } else if (isNaN(price) || parseFloat(price) <= 0) {
            valErr.price = "Price must be more than one cent"
        }
        if (!description.length) {
            valErr.description = "Description is required"
        }
        setErrors(valErr)
    }, [name, image, description, price])

    // const handleCancel = () => {
    //     history.goBack()
    // }

    return (
        <div id="product-new">
            <h1>Create a New Product</h1>
            <form
                onSubmit={handleSubmit}
                id='full-form'
                encType="multipart/form-data">
                <div>
                    <label className="product-label">
                        Product Name
                        <input
                            type="text"
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
                            label="Upload image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                    {submit && errors.image && <p className="err-msg">{errors.image}</p>}
                    <label className="product-label">
                        $ <input
                            type="text"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            id="price"
                        />
                    </label>
                    <label className="product-label">
                        <textarea
                            placeholder="Please describe what the item is"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    {submit && errors.description && <p className="err-msg">{errors.description}</p>}
                    {submit && errors.price && <p className="err-msg">{errors.price}</p>}
                </div>
                <button id="submit-button" type="submit">Create Product</button>
                {/* <button id="cancel-button" type="button" onClick={handleCancel}>Cancel Creation</button> */}
            </form>
        </div>
    )
}

export default CreateProduct;
