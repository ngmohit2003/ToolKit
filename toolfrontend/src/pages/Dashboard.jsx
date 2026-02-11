import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";
export const Dashboard = () => {
  const { logout } = useAuth();


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">SecurePass Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <Link to="/password-generator">Password Generator</Link>
        </div>
        <div className="p-4 bg-white rounded shadow">
        <Link to="/hash-generator">Hash Generator</Link>
        </div>
        <Link to="/crack-page">
           <div className="p-4 bg-white rounded shadow">Crack Page</div>
        </Link>
        
        <Link to="/pass-manager">
          <div className="p-4 bg-white rounded shadow">Password Manager</div>
        </Link>
        
        <Link to="/packet-analyzer">
          <div className="p-4 bg-white rounded shadow">Packet Analyzer</div>
        </Link>
        
        <div className="p-4 bg-white rounded shadow">URL Vulnerability Scanner</div>
      </div>

      <button
        
        onClick={logout}
        className="mt-8 bg-red-500 text-white px-6 py-2 rounded"
        
      >
        Logout

      </button>
    </div>
  );
};

