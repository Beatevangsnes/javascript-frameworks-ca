import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../api/hooks";
import Search from "../components/Search";

export default function Products() {
  const { products, loading, error } = useProducts();
  const [filter, setFilter] = useState("");

  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(filter.toLowerCase()));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const calculateDiscountPercentage = (price, discountedPrice) => {
    return ((price - discountedPrice) / price * 100).toFixed(0); 
  };

  return (
    <div className="bg-white">
      <Search onSearch={(value) => setFilter(value)} />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16 md:grid-cols-4 md:gap-x-8 md:gap-y-20 lg:gap-x-8 lg:gap-y-24">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group relative">
              <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  src={product.image.url}
                  alt={product.image.alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700 font-bold">
                {product.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {product.discountedPrice < product.price ? (
                  <>
                    <span className="line-through">Price: Kr {product.price.toFixed(2)}</span><br/>
                    <span className="text-red-500">Now: Kr {product.discountedPrice.toFixed(2)}</span><br/>
                    <span className="text-green-500">{calculateDiscountPercentage(product.price, product.discountedPrice)}% off</span>
                  </>
                ) : (
                  `Price: Kr ${product.discountedPrice.toFixed(2)}`
                )}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
