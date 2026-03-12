import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle2, XCircle, Clock, AlertCircle, User as UserIcon, MapPin } from 'lucide-react';

const ApprovalsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, bookingsRes] = await Promise.all([
                    axios.get('/api/user'),
                    axios.get('/api/bookings')
                ]);
                setCurrentUser(userRes.data);
                setBookings(bookingsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleApproval = async (approvalId, status) => {
        try {
            await axios.put(`/api/approvals/${approvalId}`, { status });
            // Refresh data
            const response = await axios.get('/api/bookings');
            setBookings(response.data);
        } catch (err) {
            alert(err.response?.data?.message || "Terjadi kesalahan saat memproses persetujuan.");
        }
    };

    // Filter bookings where the current user is an approver and has pending status
    const pendingForMe = bookings.filter(booking => 
        booking.approvals?.some(app => app.id_penyetuju == currentUser?.id_user && app.status === 'pending')
    );

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-2xl font-bold text-gray-800">Manajemen Persetujuan</h2>
                <p className="text-gray-500">Tinjau dan proses permohonan pemesanan kendaraan</p>
            </header>

            {loading ? (
                <div className="p-12 text-center text-gray-400">Memuat permohonan...</div>
            ) : pendingForMe.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
                    <div className="flex flex-col items-center gap-3">
                        <CheckCircle2 className="text-gray-300 w-12 h-12" />
                        <p className="text-gray-500 font-medium">Tidak ada permohonan persetujuan yang tertunda untuk Anda.</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {pendingForMe.map((booking) => {
                        const myApproval = booking.approvals.find(app => app.id_penyetuju == currentUser?.id_user);
                        const isLevel2 = myApproval?.level == '2';
                        const level1 = booking.approvals.find(app => app.level == '1');
                        const canApprove = !isLevel2 || (level1 && level1.status === 'disetujui');

                        return (
                            <div key={booking.id_pemesanan} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:border-blue-200 transition-all">
                                <div className="p-6 flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                    myApproval.level === '1' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'
                                                }`}>
                                                    Level {myApproval.level}
                                                </span>
                                                <h4 className="font-bold text-gray-900">#PESAN-{booking.id_pemesanan}</h4>
                                            </div>
                                            <span className="text-sm text-gray-400 flex items-center gap-1">
                                                <Clock size={14} />
                                                {new Date(booking.tanggal_pemesanan).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Kendaraan</p>
                                                <p className="text-sm font-semibold text-gray-700">{booking.vehicle?.nama_kendaraan}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Destinasi</p>
                                                <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                                    <MapPin size={14} className="text-blue-500" />
                                                    {booking.destinasi}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Waktu</p>
                                                <p className="text-sm font-semibold text-gray-700">
                                                    {new Date(booking.tanggal_keberangkatan).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Pemesan</p>
                                                <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                                                    <UserIcon size={14} className="text-gray-400" />
                                                    {booking.user?.username}
                                                </p>
                                            </div>
                                        </div>

                                        {!canApprove && (
                                            <div className="bg-orange-50 p-3 rounded-lg flex items-start gap-3 border border-orange-100 animate-pulse">
                                                <AlertCircle className="text-orange-500 shrink-0" size={18} />
                                                <p className="text-xs text-orange-700 leading-relaxed font-medium">
                                                    Menunggu persetujuan Level 1 sebelum Anda dapat memproses permohonan ini.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:w-64 flex flex-col justify-center gap-3">
                                        <button
                                            disabled={!canApprove}
                                            onClick={() => handleApproval(myApproval.id_persetujuan, 'disetujui')}
                                            className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                                canApprove 
                                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                        >
                                            <CheckCircle2 size={18} />
                                            Setujui
                                        </button>
                                        <button
                                            disabled={!canApprove}
                                            onClick={() => handleApproval(myApproval.id_persetujuan, 'ditolak')}
                                            className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                                canApprove 
                                                ? 'text-red-600 border border-red-100 hover:bg-red-50' 
                                                : 'text-gray-300 border border-gray-50 cursor-not-allowed'
                                            }`}
                                        >
                                            <XCircle size={18} />
                                            Tolak
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center gap-6">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Alur Persetujuan:</p>
                                    <div className="flex items-center gap-4 text-xs font-semibold">
                                        {booking.approvals?.sort((a,b) => a.level-b.level).map((app, idx) => (
                                            <React.Fragment key={app.id_persetujuan}>
                                                <div className="flex items-center gap-1.5">
                                                    <span className={`w-2 h-2 rounded-full ${
                                                        app.status === 'disetujui' ? 'bg-green-500' : 
                                                        app.status === 'ditolak' ? 'bg-red-500' : 'bg-gray-300'
                                                    }`} />
                                                    <span className={app.id_penyetuju == currentUser?.id_user ? 'text-blue-600' : 'text-gray-500'}>
                                                        L{app.level}
                                                    </span>
                                                </div>
                                                {idx < booking.approvals.length - 1 && <span className="text-gray-300">→</span>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ApprovalsPage;
