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
    const [category, setCategory] = useState("");
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
            formData.append("category", category);
            formData.append("description", description);

            const product = await dispatch(newProductThunk(formData));
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
        let product_category = ['Clothing', 'Creativity', 'Furniture', 'Handmade', 'Miscellaneous']
        if (!category) {
            valErr.category = 'Category is required';
        } else if (!product_category.includes(category)) {
            valErr.category = 'Please select one of the listed categories.';
        }
        if (!description.length) {
            valErr.description = "Description is required"
        }
        setErrors(valErr)
    }, [name, image, description, price, category])

    const disabledButton = () => {
        return (!name || !image || !price || !description || !category)
    }

    const handleCancel = () => {
        navigate(-1)
    }

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
                            className="product-inputs product-image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </label>
                    {submit && errors.image && <p className="err-msg">{errors.image}</p>}
                    <label className="product-label">
                        $<input
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
                        Category
                        <select
                            className="product-inputs"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value='' hidden>Select a Category</option>
                            <option value='Clothing'>Clothing</option>
                            <option value='Creativity'>Creativity</option>
                            <option value='Furniture'>Furniture</option>
                            <option value='Handmade'>Handmade</option>
                            <option value='Miscellaneous'>Miscellaneous</option>
                        </select>
                    </label>
                    {submit && errors.category && <p className="err-msg">{errors.category}</p>}
                    <label className="product-label">
                        Description
                        <textarea
                            className="product-inputs"
                            placeholder="Please describe what the item is"
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

export default CreateProduct;
