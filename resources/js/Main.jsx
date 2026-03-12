import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import VehicleManagement from './pages/VehicleManagement';
import DriverManagement from './pages/DriverManagement';
import BookingManagement from './pages/BookingManagement';
import FuelLogPage from './pages/FuelLogPage';
import ServiceLogPage from './pages/ServiceLogPage';
import ReportsPage from './pages/ReportsPage';
import Layout from './components/Layout';

import ApprovalsPage from './pages/ApprovalsPage';
import ApproverManagement from './pages/ApproverManagement';
import LogView from './pages/LogView';

const Main = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="vehicles" element={<VehicleManagement />} />
                <Route path="drivers" element={<DriverManagement />} />
                <Route path="approvers" element={<ApproverManagement />} />
                <Route path="bookings" element={<BookingManagement />} />
                <Route path="approvals" element={<ApprovalsPage />} />
                <Route path="logs" element={<LogView />} />
                <Route path="fuel" element={<FuelLogPage />} />
                <Route path="service" element={<ServiceLogPage />} />
                <Route path="reports" element={<ReportsPage />} />
            </Route>
        </Routes>
    );
};

export default Main;
