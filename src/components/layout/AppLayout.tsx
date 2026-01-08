import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC<AppLayoutProps> = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* 메인 콘텐츠 영역 */}
            {/* PC (lg: 이상)에서는 Sidebar 너비만큼 왼쪽 여백을 줌 */}
            <main className="lg:ml-64 p-4 sm:p-6 lg:p-8">
                <Outlet />
            </main>

            {/* Mobile (lg: 미만)에서는 하단 탭 바 높이만큼 공간 확보 (스크롤 시 내용이 탭 바 밑으로 숨지 않도록) */}
            <div className="h-16 lg:hidden" />
        </div>
    );
};

export default AppLayout;