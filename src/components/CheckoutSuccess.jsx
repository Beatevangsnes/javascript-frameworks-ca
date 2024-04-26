import React from "react";
import { useLocation } from "react-router-dom";

export default function CheckoutSuccess() {
    const location = useLocation();
    const orderDetails = location.state ? location.state.orderDetails : null;

    if (!orderDetails) {
        return (
            <div>
                <h2>Error</h2>
                <p>Order details could not be found. Please ensure you are accessing this page from the checkout process.</p>
            </div>
        );
    }

    return (
      <main className="relative lg:min-h-full">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-sm font-medium text-indigo-600">Payment successful</h1>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Thanks for ordering</p>
              <p className="mt-2 text-base text-gray-500">
                We appreciate your order, we’re currently processing it. So hang tight and we’ll send you confirmation
                very soon!
              </p>

              <dl className="mt-16 text-sm font-medium">
                <dt className="text-gray-900">Tracking number</dt>
                <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
              </dl>
      <ul role="list" className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500">
          {orderDetails.products.map((product) => (
              <li key={product.id} className="flex space-x-6 py-6">
                  <img src={product.image.url} alt={product.image.alt} className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center" />
                  <div className="flex-auto space-y-1">
                      <h3 className="text-gray-900">
                          <a href={product.href}>{product.title}</a>
                      </h3>
                      <p>{product.color}</p>
                      <p>{product.size}</p>
                  </div>
                  <p className="flex-none font-medium text-gray-900"> Kr {product.price}</p>
              </li>
          ))}
      </ul>
      
      <div className="mt-10">
          <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-gray-900"> Kr {orderDetails.subtotal}</dd>
              </div>
  
              <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-gray-900"> Kr {orderDetails.shippingCost}</dd>
              </div>
  
  
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base"> Kr {(parseFloat(orderDetails.subtotal) + parseFloat(orderDetails.shippingCost) + (parseFloat(orderDetails.subtotal) * 0.08)).toFixed(2)}</dd>
              </div>
          </dl>
      </div>
      </div>
  </main>
    );
}
