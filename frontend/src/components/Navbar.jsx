import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/projects" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              Projects
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/admin"
              className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 