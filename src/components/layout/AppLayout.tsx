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

            <div className="h-16 lg:hidden" />
        </div>
    );
};

export default AppLayout;
