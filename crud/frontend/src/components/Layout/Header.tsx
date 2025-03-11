import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import { LogOut } from "lucide-react";

interface HeaderProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Transport Scoreboard</h1>
          <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded text-gray-900 bg-gray-200 hover:bg-gray-300 transition"
          >
            <LogOut className="mr-2" size={16} />
            Logout
          </button>
        </div>
      </header>
  );
};

export default Header;
