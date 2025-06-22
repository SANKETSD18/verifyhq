    import React, { useState, useEffect } from 'react';
    import { FaBars, FaBell, FaCog } from 'react-icons/fa';
    import bitlogo from '../src/assets/bitlogo.png';
    import Sidebar from './Sidebar';
    import ApprovalDesk from './ApprovalDesk';

    const EventReq = () => {
        const [isSidebarOpen, setIsSidebarOpen] = useState(false);
        const [username, setUsername] = useState('');

        const toggleSidebar = () => {
            setIsSidebarOpen(!isSidebarOpen);
        };

        useEffect(() => {
            // Retrieve username from local storage
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
                setUsername(storedUsername);
                // console.log(storedUsername);
            }
        }, []);

        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#2B0A3D] to-[#0A1F24] text-white">
                {/* Navbar */}
                <nav className="flex items-center justify-between px-4 py-3 border-b border-gray-700 relative">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-3">
                            <img src={bitlogo} alt="Logo" className="h-8 w-8" />
                            <span className="text-lg font-bold">YourApp</span>
                      </div>

                    {/* Right Side: Icons */}
                    <div className="flex items-center gap-4">
                        <FaCog className="text-lg cursor-pointer" />
                        <FaBell className="text-lg cursor-pointer" />
                        <div className="flex items-center gap-2">
                            <img
                                src="https://i.pravatar.cc/40"
                                alt="User "
                                className="h-8 w-8 rounded-full border border-pink-400"
                            />
                            <div className="text-sm leading-tight">
                                <p>Hi, <span className="text-cyan-400">{username}</span></p> {/* Display username */}
                                <p className="text-xs text-gray-300">welcome back!</p>
                            </div>
                        </div>
                    </div>

                    {/* Hamburger - only on mobile */}
                    <button
                        className="md:hidden absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl"
                        onClick={toggleSidebar}
                    >
                        <FaBars />
                    </button>
                </nav>

                {/* Content Area */}
                <div className="flex flex-1">
                    {/* Sidebar */}
                    <aside className={`bg-[#1e1e2f] md:block ${isSidebarOpen ? 'block' : 'hidden'} md:w-64 w-full md:relative absolute z-50`}>
                        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 p-4 overflow-auto">
                        <ApprovalDesk />
                    </main>
                </div>
            </div>
        );
    };

    export default EventReq;
