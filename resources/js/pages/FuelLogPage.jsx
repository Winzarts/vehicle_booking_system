import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Fuel, Plus, Calendar, X } from 'lucide-react';

const FuelLogPage = () => {
    const [logs, setLogs] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        id_kendaraan: '',
        tanggal: new Date().toISOString().split('T')[0],
        fuel_amount: '',
        cost: ''
    });

    const fetchLogs = async () => {
        try {
            const response = await axios.get('/api/fuel-logs');
            setLogs(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('/api/vehicles');
            setVehicles(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchLogs();
        fetchVehicles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/fuel-logs', formData);
            setIsModalOpen(false);
            setFormData({
                id_kendaraan: '',
                tanggal: new Date().toISOString().split('T')[0],
                fuel_amount: '',
                cost: ''
            });
            fetchLogs();
        } catch (err) {
            console.error(err);
            alert('Failed to save fuel log');
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Fuel Monitoring</h2>
                    <p className="text-gray-500">Track fuel consumption across the fleet</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                    <Plus size={18} />
                    Log Fuel
                </button>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Vehicle</th>
                            <th className="px-6 py-4 font-semibold">Date</th>
                            <th className="px-6 py-4 font-semibold">Amount</th>
                            <th className="px-6 py-4 font-semibold">Cost</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">{log.vehicle?.nama_kendaraan}</td>
                                <td className="px-6 py-4 text-gray-600">{log.tanggal}</td>
                                <td className="px-6 py-4 text-gray-600 font-bold">{log.fuel_amount} L</td>
                                <td className="px-6 py-4 text-blue-600 font-bold">Rp {log.cost?.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {logs.length === 0 && (
                    <div className="p-12 text-center text-gray-400">No fuel logs found.</div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-800">Add Fuel Log</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Vehicle</label>
                                <select 
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    value={formData.id_kendaraan}
                                    onChange={(e) => setFormData({...formData, id_kendaraan: e.target.value})}
                                >
                                    <option value="">Select Vehicle</option>
                                    {vehicles.map(v => (
                                        <option key={v.id_kendaraan} value={v.id_kendaraan}>{v.nama_kendaraan} - {v.plat_nomor}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Refuel Date</label>
                                <input 
                                    type="date"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    value={formData.tanggal}
                                    onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (Liters)</label>
                                <input 
                                    type="number"
                                    step="0.01"
                                    required
                                    placeholder="e.g. 25.5"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    value={formData.fuel_amount}
                                    onChange={(e) => setFormData({...formData, fuel_amount: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Cost (Rp)</label>
                                <input 
                                    type="number"
                                    required
                                    placeholder="e.g. 350000"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    value={formData.cost}
                                    onChange={(e) => setFormData({...formData, cost: e.target.value})}
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 rounded-lg font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                >
                                    Save Log
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FuelLogPage;
