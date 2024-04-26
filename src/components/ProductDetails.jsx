import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { fetchProductDetails } from "../api/api";
import { useCart } from "../context/CartContext"; 

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProductDetails(id)
            .then(product => setProduct(product))
            .catch(error => {
                console.error("Failed to fetch product details:", error);
                setError(error);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!product) return <div>No product found.</div>;

    const handleAddToCart = () => {
        addToCart({ ...product, quantity: 1 });
    };

    const discountPercentage = product.discountedPrice < product.price ? ((1 - product.discountedPrice / product.price) * 100).toFixed(2) : null;

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
                    <div className="rounded-lg overflow-hidden lg:h-auto">
                        <img src={product.image.url} alt={product.image.alt} className="w-full object-cover object-center" />
                    </div>
                    <div className="mt-8 lg:mt-0">
                        <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
                        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                        {discountPercentage ? (
                            <>
                                <p className="mt-4 text-lg font-medium text-red-600">Discounted Price: Kr {product.discountedPrice.toFixed(2)}</p>
                                <p className="text-sm text-gray-500">Original Price: Kr {product.price.toFixed(2)}</p>
                                <p className="text-sm text-red-500">Save {discountPercentage}% off</p>
                            </>
                        ) : (
                            <p className="mt-4 text-lg font-medium text-gray-900">Price: Kr {product.price.toFixed(2)}</p>
                        )}

                        <button
                            onClick={handleAddToCart}
                            className="mt-6 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white py-2 px-4 rounded-md"
                        >
                            Add to Cart
                        </button>

                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-900">Customer Reviews</h3>
                            {product.reviews.map((review) => (
                                <div key={review.id} className="mt-4">
                                    <div className="flex items-center">
                                        {[...Array(5).keys()].map((index) => (
                                            <StarIcon
                                                key={index}
                                                className={classNames(
                                                    index < review.rating ? "text-yellow-400" : "text-gray-300",
                                                    "h-5 w-5"
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                        <p className="ml-2 text-sm text-gray-600">- {review.username}</p>
                                    </div>
                                    <p className="text-sm text-gray-600">{review.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
