import { motion, AnimatePresence } from "framer-motion";

const RecentLogs = ({ logs }) => {
  return (
    <div className="p-2">
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold text-gray-800 mb-4"
      >
        Recent Activity
      </motion.h2>
      <ul className="space-y-3 text-sm text-gray-700">
        {logs.length > 0 ? (
          <AnimatePresence>
            {logs.map((log, index) => (
              <motion.li 
                key={index} 
                className="border-b pb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.1 // Stagger effect
                }}
                whileHover={{ 
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                  paddingLeft: "8px",
                  transition: { duration: 0.2 }
                }}
              >
                <span className="font-medium">{log.item}</span> was{" "}
                <span className="text-blue-600">{log.action}</span> on{" "}
                <span className="text-gray-500">{log.time}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-gray-500 italic"
          >
            No recent activity.
          </motion.p>
        )}
      </ul>
    </div>
  );
};

export default RecentLogs;
