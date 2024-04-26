import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    onSearch(value);  
  };

  return (
    <div className="flex justify-center items-center mt-8">

      <div className="relative mt-2 flex items-center sm:w-80 lg:w-96">
        <input
          type="text"
          name="search"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="block w-full rounded-md border-0 py-1.5 pr-14 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded  px-1 font-sans text-xs text-gray-400">
          <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
          </kbd>
        </div>
      </div>
    </div>
  )
}
