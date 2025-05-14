import { useEffect, useState } from "react";
import RecentLogs from "../components/RecentLogs";
import Aside from "../Components/Aside";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [showThresholdModal, setShowThresholdModal] = useState(false);
  const [newThreshold, setNewThreshold] = useState(10);

  useEffect(() => {
    document.title = "IMS - Dashboard";

    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    };

    const fetchLogs = async () => {
      const res = await fetch("http://localhost:5000/api/logs");
      const data = await res.json();
      setLogs(
        data.slice(0, 5).map((log) => ({
          item: log.itemName,
          action: log.action,
          time: new Date(log.timestamp).toLocaleString(),
        }))
      );
    };

    fetchProducts();
    fetchLogs();
  }, []);

  // Calculate dashboard statistics
  const stats = {
    totalItems: products.reduce((sum, item) => sum + item.quantity, 0),
    totalValue: products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    lowStock: products.filter((item) => item.quantity < lowStockThreshold)
      .length,
    categories: [...new Set(products.map((item) => item.category))].length,
  };

  const handleThresholdChange = () => {
    setLowStockThreshold(newThreshold);
    setShowThresholdModal(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white p-1">
      {/* Navbar - Red */}
      <div className="h-16 w-full  flex items-center justify-center">
        <Navbar />
      </div>

      {/* Content Area */}
      <div className="flex flex-1 w-full gap-2">
        {/* Aside - Blue */}
        <div className="w-48 flex justify-center">
          <Aside />
        </div>

        {/* Dashboard main items */}
        <div className="w-[70%] bg-[#F2F3F5] border border-[#9E9E9E] rounded-md flex flex-col shadow p-6">
          <h1 className="text-xl font-bold mb-4">Inventory Dashboard</h1>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <motion.div
              className="bg-white p-4 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold">
                Total Items
              </h3>
              <p className="text-3xl font-bold ">
                {stats.totalItems}
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-4 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold">
                Total Value
              </h3>
              <p className="text-3xl font-bold ">
                ₹{stats.totalValue.toLocaleString()}
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-4 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold ">
                Low Stock Items
              </h3>
              <p className="text-3xl font-bold text-red-600">
                {stats.lowStock}
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-4 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold ">
                Categories
              </h3>
              <p className="text-3xl font-bold">
                {stats.categories}
              </p>
            </motion.div>
          </div>

          {/* Low Stock Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold ">
                Low Stock Alerts
              </h3>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-red-100  rounded-full text-sm font-medium">
                  {
                    products.filter((item) => item.quantity < lowStockThreshold)
                      .length
                  }{" "}
                  Items Need Attention
                </span>
                <button
                  onClick={() => setShowThresholdModal(true)}
                  className="px-3 py-1 bg-black text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  Set Alert Threshold
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full ">
                <thead>
                  <tr className="bg-gray-100 ">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Item Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Category
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                      Current Stock
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                      Price
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                      Value
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products
                    .filter((item) => item.quantity < lowStockThreshold)
                    .map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                            <span className="font-medium text-gray-900">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {product.category}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${
                              product.quantity <= 3
                                ? "bg-red-100 text-red-800"
                                : product.quantity <= 5
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-black"
                            }`}
                          >
                            {product.quantity}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-600">
                          ₹{product.price}
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-gray-600">
                          ₹{product.price * product.quantity}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${
                              product.quantity <= 3
                                ? "bg-red-100 text-red-800"
                                : product.quantity <= 5
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-red-600"
                            }`}
                          >
                            {product.quantity <= 3
                              ? "Critical"
                              : product.quantity <= 5
                              ? "Warning"
                              : "Low"}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {products.filter((item) => item.quantity < lowStockThreshold)
              .length === 0 && (
              <div className="text-center py-8">
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
                  All Good!
                </h4>
                <p className="text-gray-600">
                  No items are currently running low on stock.
                </p>
              </div>
            )}
          </motion.div>

          {/* Top Products */}
          {/*
          <h1 className="text-xl font-bold mt-4 mb-4">Top Items</h1>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            
            <motion.div
              className="bg-violet-400 p-4 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay:0.6 }}
            >
              <h3 className="text-lg font-semibold text-blue-800">
                Total Items
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {stats.totalItems}
              </p>
            </motion.div>

            <motion.div
              className="bg-violet-400 p-4 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <h3 className="text-lg font-semibold text-green-800">
                Total Value
              </h3>
              <p className="text-3xl font-bold text-green-600">
                ₹{stats.totalValue.toLocaleString()}
              </p>
            </motion.div>

            <motion.div
              className="bg-red-100 p-4 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <h3 className="text-lg font-semibold text-red-800">
                Low Stock Items
              </h3>
              <p className="text-3xl font-bold text-red-600">
                {stats.lowStock}
              </p>
            </motion.div>
          </div>
            */ }

        </div>

        {/* Recent Logs */}
        <div className="w-[30%] bg-[#F2F3F5] border border-[#9E9E9E]  rounded-md flex p-6 shadow">
          <RecentLogs logs={logs} />
        </div>
      </div>

      {/* Threshold Modal */}
      {showThresholdModal && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.05 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">
              Set Low Stock Alert Threshold
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert when stock is below:
              </label>
              <input
                type="number"
                value={newThreshold}
                onChange={(e) => setNewThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowThresholdModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleThresholdChange}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
