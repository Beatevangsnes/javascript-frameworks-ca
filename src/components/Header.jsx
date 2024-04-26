import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { ShoppingBagIcon, PlusIcon, MinusIcon, TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext"; 

export default function Header() {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    
    const totalCost = cartItems.reduce((total, item) => total + (item.discountedPrice || item.price) * item.quantity, 0).toFixed(2);

    return (
        <div className="bg-white">
            <header className="relative bg-white">
                <nav aria-label="Top" className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex-1 flex justify-start">
                                <Link to="/" className="flex">
                                    <img
                                        className="h-10 w-auto"
                                        src="https://cdn.midjourney.com/e9c68c78-9f4a-4a92-b71c-9c56f766a424/0_3.webp"
                                        alt="Online Shop Logo"
                                    />
                                    <h1 className="pt-2">Online Shop</h1>
                                </Link>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="flex justify-center space-x-4">
                                    <Link to="/" className="text-sm font-medium text-gray-700 hover:text-gray-800">Products</Link>
                                    <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-gray-800">Contact</Link>
                                </div>
                            </div>
                            <div className="flex-1 flex items-center justify-end space-x-4">
                                <Popover className="relative">
                                    <Popover.Button className="flex items-center">
                                        <ShoppingBagIcon className="h-6 w-6 text-gray-700" />
                                        <span className="ml-2 text-sm font-medium text-gray-700">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
                                    </Popover.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute right-0 z-10 mt-3 w-72 transform sm:px-0 lg:max-w-3xl">
                                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="bg-white p-4">
                                                    {cartItems.map((item) => (
                                                        <div key={item.id} className="flex items-center justify-between py-2">
                                                            <div className="flex items-center flex-1 min-w-0">
                                                                <img className="h-10 w-10 rounded-full" src={item.image.url} alt={item.title} />
                                                                <div className="ml-4 flex-1">
                                                                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                                                    <div className="flex items-center text-sm text-gray-500">
                                                                        <button onClick={() => updateQuantity(item.id, -1)}>
                                                                            <MinusIcon className="h-5 w-5 text-gray-500" />
                                                                        </button>
                                                                        <span className="mx-2">{item.quantity}</span>
                                                                        <button onClick={() => updateQuantity(item.id, 1)}>
                                                                            <PlusIcon className="h-5 w-5 text-gray-500" />
                                                                        </button>
                                                                    </div>
                                                                    <p className="text-xs text-gray-500"> Kr {(item.discountedPrice || item.price).toFixed(2)} each</p>
                                                                </div>
                                                            </div>
                                                            <button onClick={() => removeFromCart(item.id)}>
                                                                <TrashIcon className="h-5 w-5 text-red-600" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <div className="pt-2 border-t border-gray-200">
                                                        <p className="text-sm font-medium text-gray-900">Total: Kr {totalCost}</p>
                                                        <Link to="/cart" className="block w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-500 mt-2">
  Go to Cart
</Link>

                                                    </div>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}
