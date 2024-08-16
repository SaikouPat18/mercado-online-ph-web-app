import React, { createContext, useContext, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import logo from './assets/logo.png';

const SidebarContext = createContext();

export default function Sidebar({ user, onLogout, children, userType }) {
    const [expanded, setExpanded] = useState(true);

    const sidebarBgColor = userType === 'vendor' ? 'bg-gray-800' : 'bg-blue-600';
    const sidebarTextColor = userType === 'vendor' ? 'text-white' : 'text-white';

    return (
        <aside className="h-screen">
            <nav className={`transition-all duration-300 ${expanded ? 'w-64' : 'w-16'} flex flex-col h-full ${sidebarBgColor} ${sidebarTextColor}`}>
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src={logo} className={`transition-all ${expanded ? 'w-32' : 'w-0'} overflow-hidden`} alt="Logo" />
                    <button
                        onClick={() => setExpanded(curr => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronLeftIcon className="h-6 w-6 text-gray-600" /> : <ChevronRightIcon className="h-6 w-6 text-gray-600" />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <div className="flex items-center p-3">
                        <img
                            src={user?.photoURL || 'https://via.placeholder.com/40'}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className={`flex flex-col ml-3 ${expanded ? 'w-52' : 'hidden'}`}>
                            <span className="font-semibold">{user?.displayName || 'User Name'}</span>
                            <span className="text-xs text-gray-200">{user?.email || 'user@example.com'}</span>
                        </div>
                    </div>

                    {children}

                    <div className={`flex-grow flex items-end p-3 ${expanded ? 'w-full' : 'hidden'}`}>
                        <button
                            onClick={onLogout}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
                        >
                            Logout
                        </button>
                    </div>
                </SidebarContext.Provider>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext);
    return (
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800' : 'hover:bg-indigo-50 text-gray-600'}`}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? 'ml-3' : 'w-0'}`}>{text}</span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`} />
            )}
            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    );
}
