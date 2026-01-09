import React from 'react';
import Navbar from './Navbar';
import Header from './Header.tsx';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
    return (
        <div className="bg-green-50/20">
            <Header />
            {/* 메인 콘텐츠 영역 */}
            <div className="lg:h-[calc(100dvh-44px)] flex ">
                <Navbar />

                <main className="sm:p-3">
                    <div className="flex items-center justify-between lg:border lg:border-white lg:p-8 rounded-2xl lg:bg-white/70">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Mobile (lg: 미만)에서는 하단 탭 바 높이만큼 공간 확보 (스크롤 시 내용이 탭 바 밑으로 숨지 않도록) */}
            <div className="h-16 lg:hidden" />
        </div>
    );
};

export default AppLayout;
