import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Clock, User as UserIcon } from 'lucide-react';

const LogView = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('/api/activity-logs');
                setLogs(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-2xl font-bold text-gray-800">Sistem Log Aktivitas</h2>
                <p className="text-gray-500">Riwayat aktivitas seluruh pengguna aplikasi</p>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-50">
                    {loading ? (
                        <div className="p-8 text-center text-gray-400">Memuat log...</div>
                    ) : logs.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">Belum ada aktivitas tercatat.</div>
                    ) : (
                        logs.map((log) => (
                            <div key={log.id_aktivitas} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                                <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                                    <Activity className="text-blue-600" size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="font-semibold text-gray-900 truncate">{log.description}</p>
                                        <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
                                            <Clock size={12} />
                                            {new Date(log.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <UserIcon size={12} className="text-gray-400" />
                                        <span className="text-xs text-gray-500">{log.user?.username || 'System'}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${
                                            log.aksi === 'Create Booking' ? 'bg-green-100 text-green-700' :
                                            log.aksi === 'Approval' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {log.aksi}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default LogView;
