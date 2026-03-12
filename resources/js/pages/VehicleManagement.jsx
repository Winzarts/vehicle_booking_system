import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, MoreVertical } from 'lucide-react';

const VehicleManagement = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        nama_kendaraan: '',
        tipe_kendaraan: 'Angkutan Orang',
        plat_nomor: '',
        milik_perusahaan: 1,
        pemilik: 'Perusahaan Utama',
        lokasi: 'Kantor Pusat',
        status: 'baik'
    });

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/vehicles');
            setVehicles(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/vehicles', formData);
            setShowModal(false);
            setFormData({
                nama_kendaraan: '',
                tipe_kendaraan: 'Angkutan Orang',
                plat_nomor: '',
                milik_perusahaan: 1,
                pemilik: 'Perusahaan Utama',
                lokasi: 'Kantor Pusat',
                status: 'baik'
            });
            fetchVehicles();
        } catch (err) {
            alert('Gagal menambah kendaraan.');
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Armada Kendaraan</h2>
                    <p className="text-gray-500">Kelola kendaraan perusahaan dan status operasionalnya</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                    <Plus size={18} />
                    Tambah Kendaraan
                </button>
            </header>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
                        <h3 className="text-xl font-bold mb-6">Tambah Kendaraan Baru</h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kendaraan</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Toyota Hiace"
                                    value={formData.nama_kendaraan}
                                    onChange={(e) => setFormData({...formData, nama_kendaraan: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Kendaraan</label>
                                <select
                                    value={formData.tipe_kendaraan}
                                    onChange={(e) => setFormData({...formData, tipe_kendaraan: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option>Angkutan Orang</option>
                                    <option>Angkutan Barang</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Plat Nomor</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="B 1234 ABC"
                                    value={formData.plat_nomor}
                                    onChange={(e) => setFormData({...formData, plat_nomor: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kepemilikan</label>
                                <select
                                    value={formData.milik_perusahaan}
                                    onChange={(e) => setFormData({...formData, milik_perusahaan: parseInt(e.target.value)})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value={1}>Milik Perusahaan</option>
                                    <option value={0}>Sewa (Rental)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pemilik/Vendor</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.pemilik}
                                    onChange={(e) => setFormData({...formData, pemilik: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Pool/Cabang</label>
                                <select
                                    value={formData.lokasi}
                                    onChange={(e) => setFormData({...formData, lokasi: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option>Kantor Pusat</option>
                                    <option>Kantor Cabang</option>
                                    <option>Tambang Nickel - Site A</option>
                                    <option>Tambang Nickel - Site B</option>
                                    <option>Tambang Nickel - Site C</option>
                                    <option>Tambang Nickel - Site D</option>
                                    <option>Tambang Nickel - Site E</option>
                                    <option>Tambang Nickel - Site F</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 flex gap-3 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-bold"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold shadow-lg shadow-blue-100"
                                >
                                    Simpan Kendaraan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search vehicles..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Vehicle Name</th>
                            <th className="px-6 py-4 font-semibold">Type</th>
                            <th className="px-6 py-4 font-semibold">Plate Number</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {vehicles.map((v) => (
                            <tr key={v.id_kendaraan} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{v.nama_kendaraan}</td>
                                <td className="px-6 py-4 text-gray-600">{v.tipe_kendaraan}</td>
                                <td className="px-6 py-4 text-gray-600">{v.plat_nomor}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        v.status === 'baik' ? 'bg-green-100 text-green-700' : 
                                        v.status === 'diservis' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {v.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right capitalize">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {vehicles.length === 0 && !loading && (
                    <div className="p-12 text-center text-gray-400">
                        No vehicles found in the database.
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleManagement;
