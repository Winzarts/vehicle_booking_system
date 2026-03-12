import React, { useEffect, useState } from 'react';
import { Box, Car, Users, Calendar, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import axios from 'axios';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
    PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/dashboard');
                setData(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || !data) {
        return <div className="flex items-center justify-center h-64">Loading statistics...</div>;
    }

    const stats = [
        { label: 'Total Pesanan', value: data.total_bookings, icon: <Box className="text-blue-600" />, color: 'bg-blue-50' },
        { label: 'Total Kendaraan', value: data.total_vehicles, icon: <Car className="text-green-600" />, color: 'bg-green-50' },
        { label: 'Total Driver', value: data.total_drivers, icon: <Users className="text-purple-600" />, color: 'bg-purple-50' },
        { label: 'Lokasi Operasi', value: '8 Daerah', icon: <Calendar className="text-orange-600" />, color: 'bg-orange-50' },
    ];

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

    // Format monthly data for charts
    const monthlyData = data.monthly_bookings.map(item => ({
        name: `Bulan ${item.month}`,
        total: item.total
    }));

    // Format vehicle type data
    const vehicleTypeData = data.vehicle_types.map(item => ({
        name: item.tipe_kendaraan,
        value: item.total
    }));

    // Format ownership data
    const ownershipData = data.ownership_dist.map(item => ({
        name: item.ownership,
        value: item.total
    }));

    // Format regional data
    const regionalData = data.regional_dist.map(item => ({
        name: item.lokasi,
        total: item.total
    }));

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">Operational Overview</h2>
                    <p className="text-gray-500 font-medium">Real-time monitoring of vehicles and bookings</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-bold text-gray-600">Sistem Aktif</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className={`p-4 rounded-2xl ${stat.color} shadow-inner`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Vehicle Usage Chart */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-gray-800">Tren Pemesanan Bulanan</h3>
                        </div>
                    </div>
                    <div className="h-72 cursor-default">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dx={-10} />
                                <Tooltip 
                                    cursor={{fill: '#f8fafc'}}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                                />
                                <Bar dataKey="total" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Regional Distribution Chart */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-gray-800">Sebaran Kendaraan per Wilayah</h3>
                        </div>
                    </div>
                    <div className="h-72 cursor-default">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={regionalData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 11, fontWeight: 600}} width={100} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="total" fill="#8b5cf6" radius={[0, 6, 6, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Ownership Distribution Pie Chart */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-orange-50 rounded-lg">
                            <Users className="w-5 h-5 text-orange-600" />
                        </div>
                        <h3 className="font-bold text-gray-800">Status Kepemilikan</h3>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={ownershipData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {ownershipData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#f59e0b'} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Vehicle Types Distribution Pie Chart */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <Car className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="font-bold text-gray-800">Komposisi Tipe Kendaraan</h3>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={vehicleTypeData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {vehicleTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
