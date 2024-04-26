import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import { XMarkIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";


export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const totalCost = cartItems.reduce((total, item) => total + (item.discountedPrice || item.price) * item.quantity, 0).toFixed(2);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
        <div className="mt-12">
          <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
            {cartItems.map((item, index) => (
              <li key={item.id} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <img
                    src={item.image.url}
                    alt={item.image.alt}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-sm">
                        <a href={item.href} className="font-medium text-gray-700 hover:text-gray-800">
                          {item.title}
                        </a>
                      </h3>
                      <div className="ml-4">
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-gray-500">
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                    <p className="mt-1 text-sm font-medium text-gray-900"> Kr {(item.discountedPrice || item.price).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center text-sm">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-500 hover:text-gray-600">
                      <MinusIcon className="h-5 w-5" />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-500 hover:text-gray-600">
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Cost</p>
              <p> Kr {totalCost}</p>
            </div>
            <Link to="/checkout" className="mt-6 block w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-center text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-96 mx-auto">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
