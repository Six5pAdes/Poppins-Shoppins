import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadProductsThunk } from "../../redux/product";
import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import "./SearchBar.css"

function SearchBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products = useSelector(state => state.products)

    const [searched, setSearched] = useState('');

    useEffect(() => {
        dispatch(loadProductsThunk())
    }, [dispatch])

    let prodArr = Object.values(products)
    if (!prodArr?.length) {
        return
    }

    function navToSearch() {
        const product = prodArr.find(product => product.name?.toLowerCase() === searched?.toLowerCase());
        if (product) {
            navigate(`/products/${product?.id}`)
            return
        }
        const valCategories = ['clothing', 'creativity', 'furniture', 'handmade', 'miscellaneous']
        for (let cat of valCategories) {
            if (cat == searched.toLocaleLowerCase()) {
                navigate(`products/categories/${cat}`)
                return
            }
        }
        navigate(`/error/${searched}`)
    }

    // id included
    const items = [
        {
            id: 0,
            name: 'Hat Stand'
        },
        {
            id: 1,
            name: 'Mirror',
        },
        {
            id: 2,
            name: 'Houseplant'
        },
        {
            id: 3,
            name: 'Lamp'
        },
        {
            id: 4,
            name: 'Pair of Heels'
        },
        {
            id: 5,
            name: 'Hand Mirror'
        },
        {
            id: 6,
            name: 'Overcoat'
        },
        {
            id: 7,
            name: 'Tape Measure'
        },
        {
            id: 8,
            name: 'Cloak'
        },
        {
            id: 9,
            name: 'Medicine'
        },
        {
            id: 10,
            name: 'Camping Tent'
        },
        {
            id: 11,
            name: 'Bookshelf'
        },
        {
            id: 12,
            name: 'Portrait Frame'
        },
        {
            id: 13,
            name: 'Alcoholic Drink Starter Kit'
        },
        {
            id: 14,
            name: "Sword"
        },
        {
            id: 15,
            name: 'Umbrella'
        },
        {
            id: 16,
            name: 'Birdseed Bag'
        },
        {
            id: 17,
            name: 'Ceramic Bowl'
        },
        {
            id: 18,
            name: 'Carpet Bag'
        },
        {
            id: 19,
            name: 'Kite'
        },
        {
            id: 20,
            name: 'Clothing'
        },
        {
            id: 21,
            name: 'Creativity'
        },
        {
            id: 22,
            name: 'Furniture'
        },
        {
            id: 23,
            name: 'Handmade'
        },
        {
            id: 24,
            name: 'Miscellaneous'
        },
    ]
    const handleOnSearch = (string, results) => {
        setSearched(results.name)
    }
    const handleOnHover = (result) => {
        setSearched(result.name)
    }
    const handleOnSelect = (item) => {
        setSearched(item.name)
        navToSearch()
    }
    const handleOnFocus = () => {
        setSearched(searched)
    }

    return (
        <div className="search-container">
            <div className='search-bar' style={{ width: 400 }}>
                <ReactSearchAutocomplete
                    className="autocomplete"
                    placeholder="Search..."
                    items={items}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                >
                </ReactSearchAutocomplete>
            </div>
        </div>
    )
}

export default SearchBar;
