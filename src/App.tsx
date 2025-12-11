import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Footer from "./components/layout/Footer.tsx";
import DashboardPage from './components/pages/DashboardPage';
// TODO: 향후 PlantDetailPage를 만들면 여기에 추가

const App: React.FC = () => {
    // Sidebar 열림/닫힘 상태 관리
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        // 브라우저 라우터로 전체 앱 감싸기
        <BrowserRouter>
            <Header onMenuToggle={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <div className="flex-1">
                <Routes>
                    {/* 메인 경로('/')에 DashboardPage 연결*/}
                    <Route path="/" element={<DashboardPage />} />
                    {/* <Route path="/plant/:id" element={<PlantDetailPage />} /> */}
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
};

export default App;