import React from "react";
import { motion } from "framer-motion";

const ItemForm = ({
  name,
  category,
  price,
  quantity,
  setName,
  setCategory,
  setPrice,
  setQuantity,
  handleSubmit,
  isFormValid,
  successMessage,
  editId,
  cancelEdit,
}) => (
  <motion.div className=" w-full p-2 bg-[#F2F3F5]  border border-[#9E9E9E] rounded-lg">
    <div className="p-2">
      <motion.h2
        className="text-lg font-bold mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {editId ? "Edit Item" : "Add New Items"}
      </motion.h2>
      {successMessage && (
        <motion.div
          className="bg-white text-black p-2 rounded text-sm mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {successMessage}
        </motion.div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <input
            type="text"
            placeholder="Item Name"
            className="w-full p-2 bg-white rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Category"
            className="w-full p-2 bg-white rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <input
            type="number"
            placeholder="Item Price"
            className="w-full p-2 bg-white rounded-lg"
            value={price}
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 0) {
                setPrice(value);
              }
            }}
            min="1"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <input
            type="number"
            placeholder="Stocks Available"
            className="w-full p-2 bg-white rounded-lg"
            value={quantity}
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 0) {
                setQuantity(value);
              }
            }}
            min="0"
          />
        </motion.div>

        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <button
            type="submit"
            disabled={!isFormValid}
            className={`bg-black text-white py-2 px-6 rounded hover:bg-gray-800 ${
              !isFormValid && "opacity-50 cursor-not-allowed"
            }`}
          >
            {editId ? "Update" : "Save"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-200 text-gray-800 py-2 px-6 rounded hover:bg-gray-300"
            >
              Cancel Edit
            </button>
          )}
        </motion.div>
      </form>
    </div>
  </motion.div>
);

export default ItemForm;
