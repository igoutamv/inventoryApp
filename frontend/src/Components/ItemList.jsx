import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortNumericDown,
  FaSortNumericUp,
  FaSort,
} from "react-icons/fa";
import { CSVLink } from "react-csv"; // CSV Export

const ItemList = ({ items, handleDelete, handleEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [originalItems] = useState(items); // to restore original

  const getSortedItems = () => {
    if (!sortConfig.key) return filteredItems;

    const sorted = [...filteredItems].sort((a, b) => {
      if (sortConfig.key === "name" || sortConfig.key === "category") {
        return a[sortConfig.key].localeCompare(b[sortConfig.key]);
      }
      return a[sortConfig.key] - b[sortConfig.key];
    });

    return sortConfig.direction === "asc" ? sorted : sorted.reverse();
  };

  const toggleSort = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        setSortConfig({ key, direction: "desc" });
      } else if (sortConfig.direction === "desc") {
        setSortConfig({ key: null, direction: null }); // reset
      } else {
        setSortConfig({ key, direction: "asc" });
      }
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = getSortedItems();

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    if (sortConfig.direction === "asc")
      return key === "name" ? <FaSortAlphaDown /> : <FaSortNumericDown />;
    if (sortConfig.direction === "desc")
      return key === "name" ? <FaSortAlphaUp /> : <FaSortNumericUp />;
    return <FaSort />;
  };

  return (
    <div className=" w-full p-6">
      <h3 className=" pb-4 text-xl font-bold">Stocks Available</h3>

      {/* 🔍 Search Bar and Export CSV Button */}
      <div className=" flex items-center gap-4 mb-4">
        
      <div className="relative w-full">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5 text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  </div>
  <input
    type="text"
    placeholder="Search Items by Name/Category"
    className="w-full pl-10 pr-4 py-2 rounded border focus:outline-none focus:ring-1 focus:ring-black transition duration-300 ease-in-out"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>


        {/* Export CSV Button */}
        <CSVLink
          data={sortedItems.map((item) => ({
            No: item._id,
            Name: item.name,
            Category: item.category,
            Price: item.price,
            Qty: item.quantity,
            Total: item.quantity * item.price,
          }))}
          filename="inventory_items.csv"
          className="flex gap-2 font-medium  bg-red-500 w-1/4 text-white text-center px-4 py-2 rounded-md cursor-pointer hover:bg-black transition duration-500 ease-in-out "
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
</svg>

          Export Items
        </CSVLink>
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-8 gap-4 bg-black p-3 mb-3 font-semibold text-white rounded items-center">
        <span className="text-center">No</span>
        <span
          className="col-span-2 flex hover:text-yellow-300 items-center gap-1 cursor-pointer"
          onClick={() => toggleSort("name")}
        >
          Item Name {renderSortIcon("name")}
        </span>
        <span className="text-left">Category</span>
        <span
          className="text-center hover:text-yellow-300 flex items-center gap-1 justify-center cursor-pointer"
          onClick={() => toggleSort("price")}
        >
          Price {renderSortIcon("price")}
        </span>
        <span
          className="text-center hover:text-yellow-300 flex items-center gap-1 justify-center cursor-pointer"
          onClick={() => toggleSort("quantity")}
        >
          Qty {renderSortIcon("quantity")}
        </span>
        <span className="text-center">Total</span>
        <span className="text-center">Action</span>
      </div>

      {/* Item Rows */}
      <div className="space-y-2">
        {sortedItems.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-8 gap-4 px-3 py-2 items-center bg-white rounded hover:shadow"
          >
            <span className="text-center text-gray-800">{index + 1}</span>
            <span className="col-span-2 text-gray-800">{item.name}</span>
            <span className="text-left text-gray-800">{item.category}</span>
            <span className="text-center text-gray-800">₹{item.price}</span>
            <span className="text-center text-gray-800">{item.quantity}</span>
            <span className="text-center font-medium text-gray-900">
              ₹{item.quantity * item.price}
            </span>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-orange-500 hover:text-orange-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center py-4 bg-green-200"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-1">
            Add your first item!
          </h4>
        </motion.div>
      )}

      {/* Total Stock Value */}
      <div className="flex justify-between gap-4 bg-black p-3 mt-3 font-semibold text-white rounded">
        <span>Total Stock Value</span>
        <span>
          ₹
          {sortedItems.reduce(
            (total, item) => total + item.quantity * item.price,
            0
          )}
        </span>
      </div>
    </div>
  );
};

export default ItemList;
