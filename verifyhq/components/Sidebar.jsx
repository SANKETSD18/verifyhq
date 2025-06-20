import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSignOutAlt  } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const [isEventOpen, setIsEventOpen] = useState(true);
    const [isReportsOpen, setIsReportsOpen] = useState(false); 
  
    return (
      <>
        {/* Overlay */}
        {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#15012B] to-[#0A1F24] text-white p-4 border-r border-pink-500 z-50 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block flex flex-col`}
      >
        {/* Events Section */}
        <div>
          <button
            className="flex justify-between items-center w-full text-left font-semibold mb-2"
            onClick={() => setIsEventOpen(!isEventOpen)}
          >
            <span>Events</span>
            {isEventOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </button>

          {isEventOpen && (
            <ul className="pl-4 text-sm text-gray-300 space-y-5">
              <li className="hover:text-white cursor-pointer border-l-2 border-pink-500 pl-2">New Requests</li>
              <li className="hover:text-white cursor-pointer">Estimate</li>
              <li className="hover:text-white cursor-pointer">Events</li>
              <li className="hover:text-white cursor-pointer">Partial Requests</li>
            </ul>
          )}
        </div>

        {/* Reports Section */}
        <div className="mt-6">
          <button
            className="flex justify-between items-center w-full text-left font-semibold mb-2"
            onClick={() => setIsReportsOpen(!isReportsOpen)}
          >
            <span>Reports</span>
            {isReportsOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </button>

          {isReportsOpen && (
            <ul className="pl-4 mb-8 text-sm text-gray-300 space-y-5">
              <li className="hover:text-white cursor-pointer">Daily Report</li>
              <li className="hover:text-white cursor-pointer">Monthly Report</li>
            </ul>
          )}
        </div>

        {/* Logout Button at the Bottom */}
        <div className="mt-auto  pt-5 border-t border-gray-700">
          <button className="flex items-center gap-5 text-sm hover:text-pink-500 transition">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
      </>
    );
  };

export default Sidebar;
