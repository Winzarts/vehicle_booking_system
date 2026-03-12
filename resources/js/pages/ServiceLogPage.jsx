import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wrench, Plus, Clipboard, X } from 'lucide-react';

const ServiceLogPage = () => {
    const [logs, setLogs] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        id_kendaraan: '',
        tanggal_service: new Date().toISOString().split('T')[0],
        description: '',
        cost: ''
    });

    const fetchLogs = async () => {
        try {
            const response = await axios.get('/api/service-logs');
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
            await axios.post('/api/service-logs', formData);
            setIsModalOpen(false);
            setFormData({
                id_kendaraan: '',
                tanggal_service: new Date().toISOString().split('T')[0],
                description: '',
                cost: ''
            });
            fetchLogs();
        } catch (err) {
            console.error(err);
            alert('Failed to save service log');
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Service History</h2>
                    <p className="text-gray-500">Monitor vehicle maintenance and repairs</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                    <Plus size={18} />
                    Log Service
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {logs.map((log) => (
                    <div key={log.id_log} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-orange-50 rounded-lg">
                                <Wrench className="text-orange-600" size={20} />
                            </div>
                            <span className="text-sm font-bold text-blue-600">Rp {log.cost?.toLocaleString()}</span>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">{log.vehicle?.nama_kendaraan}</h4>
                        <p className="text-sm text-gray-500 mb-4">{log.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clipboard size={14} />
                            <span>Serviced on: {log.tanggal_service}</span>
                        </div>
                    </div>
                ))}
                {logs.length === 0 && (
                    <div className="col-span-full p-12 text-center text-gray-400 bg-white rounded-2xl border border-dashed">
                        No service logs available.
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-800">Add Service Log</h3>
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
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Service Date</label>
                                <input 
                                    type="date"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    value={formData.tanggal_service}
                                    onChange={(e) => setFormData({...formData, tanggal_service: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Cost (Rp)</label>
                                <input 
                                    type="number"
                                    required
                                    placeholder="e.g. 500000"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    value={formData.cost}
                                    onChange={(e) => setFormData({...formData, cost: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                <textarea 
                                    required
                                    rows="3"
                                    placeholder="What was serviced?"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                ></textarea>
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

export default ServiceLogPage;
