import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Car, Users, ClipboardList, Fuel, Wrench, FileText, LogOut, CheckCircle2, Activity, UserCheck } from 'lucide-react';

const Layout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Simple logout for now
        localStorage.removeItem('token');
        navigate('/login');
    };

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
        { icon: <Car size={20} />, label: 'Vehicles', path: '/vehicles' },
        { icon: <Users size={20} />, label: 'Drivers', path: '/drivers' },
        { icon: <ClipboardList size={20} />, label: 'Bookings', path: '/bookings' },
        { icon: <UserCheck size={20} />, label: 'Approvers', path: '/approvers' },
        { icon: <CheckCircle2 size={20} />, label: 'Approvals', path: '/approvals' },
        { icon: <Activity size={20} />, label: 'Activity Logs', path: '/logs' },
        { icon: <Fuel size={20} />, label: 'Fuel Logs', path: '/fuel' },
        { icon: <Wrench size={20} />, label: 'Service Logs', path: '/service' },
        { icon: <FileText size={20} />, label: 'Reports', path: '/reports' },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-blue-600">VehicleSys</h1>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
