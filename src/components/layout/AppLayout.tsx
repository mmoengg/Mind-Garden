import React from 'react';
import Navbar from './Navbar';
// import Header from './Header.tsx';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
    return (
        <div className="flex h-screen">
            <Navbar />
            {/* 메인 콘텐츠 영역 */}
            <div className="flex flex-col w-full">
                {/*<Header />*/}
                <Outlet />
            </div>

            {/* Mobile (lg: 미만)에서는 하단 탭 바 높이만큼 공간 확보 (스크롤 시 내용이 탭 바 밑으로 숨지 않도록) */}
            <div className="h-16 lg:hidden" />
        </div>
    );
};

export default AppLayout;
