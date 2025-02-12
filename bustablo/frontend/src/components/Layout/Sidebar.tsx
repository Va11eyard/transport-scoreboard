import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-300 p-4">
      <ul>
        <li className="mb-2"><Link to="/">Home</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
