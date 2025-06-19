
const ProductCard = ({ name, price, image }) => {
    return (
        <div className="bg-white shadow-sm   rounded-sm overflow-hidden p-4 transition hover:shadow-lg">
            <img src={image} alt={name} className="w-full h-40 object-cover rounded-lg" />
            <h2 className="text-lg font-semibold mt-3">{name}</h2>
            <p className="text-gray-600 text-sm mt-1">${price.toFixed(2)}</p>
            <button className="mt-3 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
                Add to Cart
            </button>
        </div>)
}

export default ProductCard