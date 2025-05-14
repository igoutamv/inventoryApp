import { useEffect, useState, useRef } from "react";
import Navbar from '../Components/Navbar'
import Aside from '../Components/Aside'
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Reports = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState('inventory');

  useEffect(() => {
    document.title = "IMS - Reports";
    
    // Fetch inventory data for reports
    const fetchInventoryData = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setInventoryData(data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInventoryData();
  }, []);

  // Calculate inventory statistics
  const calculateStats = () => {
    if (!inventoryData.length) return { totalItems: 0, totalValue: 0, lowStock: 0 };
    
    const totalItems = inventoryData.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = inventoryData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const lowStock = inventoryData.filter(item => item.quantity < 10).length;
    
    return { totalItems, totalValue, lowStock };
  };

  const stats = calculateStats();



  return (
          <div className="min-h-screen w-full flex flex-col bg-white p-1">
          {/* Navbar - Red */}
      <div className="h-16 w-full  flex items-center justify-center" >
        <Navbar/>
      </div>

     {/* Content Area */}
     <div className="flex flex-1 w-full gap-2">

     {/* Aside - Blue */}
     <div className="w-48 flex  justify-center">
     <Aside/>
     </div>






     {/* Dashboard main items */}
     <div className="w-[100%] bg-[#F2F3F5] border border-[#9E9E9E] rounded-md flex flex-col  shadow p-6 ">
        <h1 className="text-2xl font-bold mb-4">Report and Analysis </h1>
        
           {/* Report Type Selector */}
           <div className="flex mb-6 space-x-2">
            <button 
              className={`px-4 py-2 rounded-md ${selectedReport === 'inventory' ? 'bg-black text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedReport('inventory')}
            >
              Inventory Overview
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${selectedReport === 'stock' ? 'bg-black text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedReport('stock')}
            >
              Stock Levels
            </button>
            
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <motion.div 
              className="bg-white p-4 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold ">Total Items</h3>
              <p className="text-3xl font-bold ">{stats.totalItems}</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold ">Total Value</h3>
              <p className="text-3xl font-bold ">₹{stats.totalValue.toLocaleString()}</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 rounded-lg shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold ">Low Stock Items</h3>
              <p className="text-3xl font-bold text-red-600">{stats.lowStock}</p>
            </motion.div>
          </div>



           {/* Report Content */}
           <div className="bg-gray-50 p-4 rounded-lg shadow">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div>
                {selectedReport === 'inventory' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Inventory Overview</h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr className="bg-gray-200 text-gray-700">
                            <th className="py-2 px-4 text-left">Item Name</th>
                            <th className="py-2 px-4 text-left">Category</th>
                            <th className="py-2 px-4 text-right">Quantity</th>
                            <th className="py-2 px-4 text-right">Price</th>
                            <th className="py-2 px-4 text-right">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventoryData.map((item) => (
                            <tr key={item._id} className="border-b hover:bg-gray-100">
                              <td className="py-2 px-4">{item.name}</td>
                              <td className="py-2 px-4">{item.category}</td>
                              <td className="py-2 px-4 text-right">{item.quantity}</td>
                              <td className="py-2 px-4 text-right">₹{item.price}</td>
                              <td className="py-2 px-4 text-right">₹{item.price * item.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {selectedReport === 'stock' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Stock Levels</h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr className="bg-gray-200 text-gray-700">
                            <th className="py-2 px-4 text-left">Item Name</th>
                            <th className="py-2 px-4 text-right">Quantity</th>
                            <th className="py-2 px-4 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventoryData.map((item) => (
                            <tr key={item._id} className="border-b hover:bg-gray-100">
                              <td className="py-2 px-4">{item.name}</td>
                              <td className="py-2 px-4 text-right">{item.quantity}</td>
                              <td className="py-2 px-4 text-right">
                                {item.quantity < 10 ? (
                                  <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs">Low Stock</span>
                                ) : (
                                  <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">In Stock</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {selectedReport === 'value' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Inventory Value</h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead>
                          <tr className="bg-gray-200 text-gray-700">
                            <th className="py-2 px-4 text-left">Item Name</th>
                            <th className="py-2 px-4 text-right">Price</th>
                            <th className="py-2 px-4 text-right">Quantity</th>
                            <th className="py-2 px-4 text-right">Total Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventoryData.map((item) => (
                            <tr key={item._id} className="border-b hover:bg-gray-100">
                              <td className="py-2 px-4">{item.name}</td>
                              <td className="py-2 px-4 text-right">₹{item.price}</td>
                              <td className="py-2 px-4 text-right">{item.quantity}</td>
                              <td className="py-2 px-4 text-right font-semibold">₹{item.price * item.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>


                

      </div>

     </div>
   


</div>
  
  
  )
}

export default Reports
