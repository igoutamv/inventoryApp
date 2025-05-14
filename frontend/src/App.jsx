import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import InventoryPage from './Pages/InventoryPage';
import NotFound from './Pages/NotFound'; // ✅
import ErrorBoundary from './Components/ErrorBoundary';
import Reports from './Pages/Reports'
import Settings from "./Pages/Settings";



function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reports" element={ <ProtectedRoute> <Reports /> </ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /> </ProtectedRoute>} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/inventory" element={
          <ProtectedRoute> 
              <InventoryPage />
          </ProtectedRoute>
          
        } />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
