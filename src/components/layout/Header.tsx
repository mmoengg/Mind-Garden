import React from 'react';
import { Link } from 'react-router-dom'; // 라우팅을 위한 Link

interface HeaderProps {
    onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
    return (
        <header className="h-14 text-white bg-[#377A4F] border-b border-gray-200 sticky top-0 z-40">
            <div className="container h-full mx-auto px-5 flex justify-between items-center">

                {/* 로고 및 타이틀 (왼쪽) */}
                <div className="flex items-center space-x-2">
                    <Link to="/" className="flex items-center space-x-2  text-white hover:text-yellow-200 transition duration-300">
                        {/*<span className="text-xl">🌿</span>*/}
                        <h1 className="text-lg font-bold tracking-normal">
                            Plant Keeper
                        </h1>
                    </Link>
                </div>

                {/* 유틸리티 및 메뉴 (오른쪽) */}
                <div className="flex items-center space-x-4">
                    {/* 햄버거 메뉴/설정 버튼 */}
                    <button
                        onClick={onMenuToggle}
                        className="text-white hover:text-yellow-200 bg-transparent" title="메뉴"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>

            </div>
        </header>
    );
};

export default Header;