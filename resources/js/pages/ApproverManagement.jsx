import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, UserCheck, Mail, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApproverManagement = () => {
    const [approvers, setApprovers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApprovers = async () => {
            try {
                const response = await axios.get('/api/users/approvers');
                setApprovers(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchApprovers();
    }, []);

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Manajemen Approver</h2>
                    <p className="text-gray-500">Daftar pihak yang berwenang memberikan persetujuan</p>
                </div>
                <button 
                    onClick={() => navigate('/register')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 transition-colors"
                >
                    <Plus size={18} />
                    Tambah Approver
                </button>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari approver..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Username</th>
                            <th className="px-6 py-4 font-semibold">Email</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {approvers.map((u) => (
                            <tr key={u.id_user} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <UserCheck className="text-blue-600" size={20} />
                                        </div>
                                        <div className="font-medium text-gray-900">{u.username}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <Mail size={14} />
                                        {u.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                        Aktif
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
                {approvers.length === 0 && !loading && (
                    <div className="p-12 text-center text-gray-400">
                        Belum ada approver terdaftar. Gunakan Register untuk membuat akun baru.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApproverManagement;
