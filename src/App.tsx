import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PlantProvider } from './context/PlantProvider';

// 페이지들
import AppLayout from "./components/layout/AppLayout.tsx";
import DashboardPage from './pages/DashboardPage';
import AddPlantPage from './pages/AddPlantPage';
import MyPlantsPage from './pages/MyPlantsPage';
import PlantDetailPage from './pages/PlantDetailPage';
import EditPlantPage from './pages/EditPlantPage';
import LoginPage from './pages/LoginPage';
import MoodLogPage from "./pages/MoodLogPage.tsx";

// ProtectedRoute 컴포넌트
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { uid, isLoading } = useAuth();

    if (isLoading) return <div className="p-10 text-center">로딩 중...</div>;

    if (!uid) {
        return <Navigate to="/login" replace />;
    }

    // ReactNode 타입은 return 할 때 Fragment로 감싸주거나 그냥 반환해도 됩니다.
    return <>{children}</>;
};

function App() {
    return (
        <AuthProvider>
            <PlantProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route element={<AppLayout />}>
                            <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                            <Route path="/my-plants" element={<ProtectedRoute><MyPlantsPage /></ProtectedRoute>} />
                            <Route path="/add-plant" element={<ProtectedRoute><AddPlantPage /></ProtectedRoute>} />
                            <Route path="/plants/:id" element={<ProtectedRoute><PlantDetailPage /></ProtectedRoute>} />
                            <Route path="/plants/:id/edit" element={<ProtectedRoute><EditPlantPage /></ProtectedRoute>} />
                             <Route path="/mood-log" element={<ProtectedRoute><MoodLogPage /></ProtectedRoute>} />
                        </Route>
                    </Routes>
                </Router>
            </PlantProvider>
        </AuthProvider>
    );
}

export default App;