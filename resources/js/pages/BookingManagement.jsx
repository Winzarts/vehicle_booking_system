import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, MapPin, Calendar, CheckCircle2, XCircle, Clock, User as UserIcon, X, Loader2 } from 'lucide-react';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        id_kendaraan: '',
        id_driver: '',
        tanggal_keberangkatan: '',
        tanggal_selesai: '',
        destinasi: '',
        approver1_id: '',
        approver2_id: ''
    });

    const [resources, setResources] = useState({
        vehicles: [],
        drivers: [],
        approvers: []
    });

    useEffect(() => {
        fetchBookings();
        fetchResources();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/bookings');
            setBookings(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchResources = async () => {
        try {
            const [vRes, dRes, uRes] = await Promise.all([
                axios.get('/api/vehicles'),
                axios.get('/api/drivers'),
                axios.get('/api/user') // This might need a custom endpoint for "approver" users
            ]);
            
            // Assuming we need to fetch all users to pick approvers, 
            // but for now let's hope the API provides filter or we use dummy list
            // Optimization: fetch users list endpoint if available
            try {
                const usersRes = await axios.get('/api/users/approvers'); 
                setResources({
                    vehicles: vRes.data,
                    drivers: dRes.data,
                    approvers: usersRes.data
                });
            } catch (e) {
                console.error("Failed to fetch approvers", e);
                setResources(prev => ({ ...prev, vehicles: vRes.data, drivers: dRes.data }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/bookings', formData);
            setShowModal(false);
            fetchBookings();
            setFormData({
                id_kendaraan: '',
                id_driver: '',
                tanggal_keberangkatan: '',
                tanggal_selesai: '',
                destinasi: '',
                approver1_id: '',
                approver2_id: ''
            });
        } catch (err) {
            alert(err.response?.data?.message || "Terjadi kesalahan saat menyimpan pesanan.");
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'disetujui': return <CheckCircle2 className="text-green-500" size={18} />;
            case 'ditolak': return <XCircle className="text-red-500" size={18} />;
            default: return <Clock className="text-orange-500" size={18} />;
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Booking Pipeline</h2>
                    <p className="text-gray-500">Track and manage vehicle reservations</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2 transition-all shadow-blue-100 shadow-lg"
                >
                    <Plus size={18} />
                    Pesan Kendaraan
                </button>
            </header>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="animate-spin text-blue-600" size={32} />
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="p-12 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
                        No active bookings found.
                    </div>
                ) : (
                    bookings.map((booking) => (
                        <div key={booking.id_pemesanan} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-200 transition-all">
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <Calendar className="text-blue-600" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{booking.vehicle?.nama_kendaraan || 'Unknown Vehicle'}</h4>
                                        <div className="flex items-center gap-4 mt-1">
                                            <span className="text-xs font-semibold text-gray-400 flex items-center gap-1">
                                                <MapPin size={12} />
                                                {booking.destinasi}
                                            </span>
                                            <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                                                {booking.vehicle?.lokasi}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>Mulai: {new Date(booking.tanggal_keberangkatan).toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>Selesai: {new Date(booking.tanggal_selesai).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Driver</p>
                                    <p className="text-sm font-semibold text-gray-700">{booking.driver?.nama_driver || 'Assigned'}</p>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                    {getStatusIcon(booking.status)}
                                    <span className="text-xs font-bold uppercase tracking-wide text-gray-700">{booking.status}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Creation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-blue-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-lg">
                                    <Calendar className="text-white" size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Pemesanan Baru</h3>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Pilih Kendaraan</label>
                                    <select 
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        value={formData.id_kendaraan}
                                        onChange={(e) => setFormData({...formData, id_kendaraan: e.target.value})}
                                    >
                                        <option value="">-- Pilih --</option>
                                        {resources.vehicles.map(v => (
                                            <option key={v.id_kendaraan} value={v.id_kendaraan}>{v.nama_kendaraan} ({v.plat_nomor}) - {v.lokasi}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Pilih Driver</label>
                                    <select 
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        value={formData.id_driver}
                                        onChange={(e) => setFormData({...formData, id_driver: e.target.value})}
                                    >
                                        <option value="">-- Pilih --</option>
                                        {resources.drivers.map(d => (
                                            <option key={d.id_driver} value={d.id_driver}>{d.nama_driver}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Waktu Keberangkatan</label>
                                    <input 
                                        type="datetime-local" 
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        value={formData.tanggal_keberangkatan}
                                        onChange={(e) => setFormData({...formData, tanggal_keberangkatan: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Waktu Selesai</label>
                                    <input 
                                        type="datetime-local" 
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        value={formData.tanggal_selesai}
                                        onChange={(e) => setFormData({...formData, tanggal_selesai: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-gray-700">Destinasi</label>
                                    <input 
                                        placeholder="Contoh: Tambang Lemo, Morowali"
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        value={formData.destinasi}
                                        onChange={(e) => setFormData({...formData, destinasi: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Pihak Menyetujui 1</label>
                                    <select 
                                        required
                                        className="w-full border p-3 rounded-xl bg-orange-50/30 border-orange-100 outline-none"
                                        value={formData.approver1_id}
                                        onChange={(e) => setFormData({...formData, approver1_id: e.target.value})}
                                    >
                                        <option value="">-- Pilih Approver Level 1 --</option>
                                        {resources.approvers.map(a => (
                                            <option key={a.id_user} value={a.id_user}>{a.username} ({a.email})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Pihak Menyetujui 2</label>
                                    <select 
                                        required
                                        className="w-full border p-3 rounded-xl bg-purple-50/30 border-purple-100 outline-none"
                                        value={formData.approver2_id}
                                        onChange={(e) => setFormData({...formData, approver2_id: e.target.value})}
                                    >
                                        <option value="">-- Pilih Approver Level 2 --</option>
                                        {resources.approvers.map(a => (
                                            <option key={a.id_user} value={a.id_user}>{a.username} ({a.email})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button 
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-4 font-bold border border-gray-100 text-gray-400 hover:bg-gray-50 rounded-2xl transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-[2] py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                                >
                                    Simpan Pesanan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingManagement;
