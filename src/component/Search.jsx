import { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import useProductinfo from "../utils/UseProductinfo";
import { Link } from "react-router-dom";

function SearchBox() {
    const { data, error, loading } = useProductinfo("https://dummyjson.com/products");
    const [query, setQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (query && data?.products) {
            const filtered = data.products.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
            setShowDropdown(true);
        } else {
            setFilteredProducts([]);
            setShowDropdown(false);
        }
    }, [query, data]);

    const handleInputChange = (e) => setQuery(e.target.value);

    const handleProductClick = () => {
        setQuery('');
        setShowDropdown(false);
        // Handle product click logic
    };

    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="search-container">
            <div className="search-bar">
                <SearchIcon className="search-icon" />
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for products..."
                    className="search-input"
                />
            </div>

            {showDropdown && (
                <ul className="dropdown-list">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <Link to={`productdetails/${product.id}`} key={product.id} className="dropdown-item" onClick={() => handleProductClick(product.id)}>
                                <div className="dropdown-content">
                                    <img src={product.thumbnail} alt={product.title} className="dropdown-image" />
                                    <span className="dropdown-title">{product.title}</span>
                                </div>
                            {/* </li> */}
                            </Link>
                        ))
                    ) : (
                        <li className="dropdown-no-results">No results found</li>
                    )}
                </ul>
                // <Link/>
            )}
        </div>
    );
}

export default SearchBox;
