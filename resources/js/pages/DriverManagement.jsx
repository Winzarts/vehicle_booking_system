import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, MoreVertical, Phone } from 'lucide-react';

const DriverManagement = () => {
    const [drivers, setDrivers] = useState([]);
    const [users, setUsers] = useState([]); // For selecting existing driver users
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        nama_driver: '',
        nomor_hp: '',
        status: 'ready',
        pengemudi: ''
    });

    const fetchDrivers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/drivers');
            setDrivers(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            // Fetch users with role 'driver' who aren't drivers yet
            const response = await axios.get('/api/users/drivers');
            setUsers(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDrivers();
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/drivers', formData);
            setShowModal(false);
            setFormData({ nama_driver: '', nomor_hp: '', status: 'ready', pengemudi: '' });
            fetchDrivers();
        } catch (err) {
            alert('Gagal menambah driver. Pastikan semua data terisi.');
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Manajemen Driver</h2>
                    <p className="text-gray-500">Kelola informasi pengemudi dan ketersediaan mereka</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                    <Plus size={18} />
                    Tambah Driver
                </button>
            </header>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h3 className="text-xl font-bold mb-6">Tambah Driver Baru</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.nama_driver}
                                    onChange={(e) => setFormData({...formData, nama_driver: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.nomor_hp}
                                    onChange={(e) => setFormData({...formData, nomor_hp: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Akun Pengguna (Driver)</label>
                                <select
                                    required
                                    value={formData.pengemudi}
                                    onChange={(e) => setFormData({...formData, pengemudi: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Pilih Akun User...</option>
                                    {users.map(u => (
                                        <option key={u.id_user} value={u.id_user}>{u.username} ({u.email})</option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-400 mt-1">Hanya menampilkan user dengan role 'driver'</p>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-100"
                                >
                                    Simpan
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
                            placeholder="Cari driver..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Nama Driver</th>
                            <th className="px-6 py-4 font-semibold">Telepon</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {drivers.map((d) => (
                            <tr key={d.id_driver} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{d.nama_driver}</div>
                                    <div className="text-xs text-gray-400">User: {d.user?.username || 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Phone size={14} />
                                        {d.nomor_hp}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        d.status === 'ready' ? 'bg-green-100 text-green-700' : 
                                        d.status === 'bekerja' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {d.status === 'ready' ? 'Tersedia' : d.status === 'bekerja' ? 'Sedang Tugas' : d.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {drivers.length === 0 && !loading && (
                    <div className="p-12 text-center text-gray-400">
                        Belum ada driver terdaftar.
                    </div>
                )}
            </div>
        </div>
    );
};

export default DriverManagement;
