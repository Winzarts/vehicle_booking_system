import React from 'react';
import { FileText, Download, PieChart } from 'lucide-react';

const ReportsPage = () => {
    const handleExport = () => {
        window.open('/api/reports/bookings/export', '_blank');
    };

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
                <p className="text-gray-500">Generate and export system data</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="p-5 bg-blue-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                        <FileText className="text-blue-600" size={40} />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-800">Laporan Pemesanan</h3>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed text-center">
                        Ekspor seluruh riwayat pemesanan kendaraan dalam format CSV yang kompatibel dengan Microsoft Excel.
                    </p>
                    <button 
                        onClick={handleExport}
                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-100"
                    >
                        <Download size={20} />
                        Download CSV
                    </button>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center opacity-70">
                    <div className="p-5 bg-purple-50 rounded-2xl mb-6">
                        <PieChart className="text-purple-600" size={40} />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-800">Analitik Wilayah</h3>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed text-center">
                        Laporan sebaran penggunaan kendaraan berdasarkan lokasi tambang dan kantor.
                    </p>
                    <button disabled className="w-full bg-gray-100 text-gray-400 py-4 rounded-2xl font-bold cursor-not-allowed">
                        Tersedia Segera
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
