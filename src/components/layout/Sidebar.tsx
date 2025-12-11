import React from 'react';
import { Link } from 'react-router-dom';
// TODO: 설정 등의 아이콘을 위한 라이브러리 (예: react-icons) 임포트

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {

    const menuItems = [
        { name: '대시보드', path: '/', icon: '🏠' },
        { name: '식물 등록', path: '/add', icon: '➕' }, // 예시
        { name: '관리 기록', path: '/history', icon: '📜' }, // 예시
        { name: '설정', path: '/settings', icon: '⚙️' }, // 예시
    ];

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                    onClick={onClose} // 배경 클릭 시 닫기
                />
            )}

            <div
                className={`
                    fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform 
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                {/* 헤더 및 닫기 버튼 */}
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-green-700">메뉴</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 text-3xl"
                    >
                        &times;
                    </button>
                </div>

                {/* 메뉴 항목 */}
                <nav className="p-4">
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.name} className="mb-2">
                                <Link
                                    to={item.path}
                                    onClick={onClose}
                                    className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-green-50 hover:text-green-600 transition duration-150"
                                >
                                    <span className="mr-3 text-xl">{item.icon}</span>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

            </div>
        </>
    );
};

export default Sidebar;