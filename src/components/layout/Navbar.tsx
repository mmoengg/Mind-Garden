import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Leaf, Plus} from 'lucide-react';
import { navItems } from '../../data/nav';
import clsx from 'clsx';

const Navbar: React.FC = () => {
    const location = useLocation();

    // 로고/헤더 컴포넌트 (PC 사이드바 상단에만 표시)
    const Logo = () => (
        <div className="hidden lg:flex items-center justify-start p-4 text-2xl font-bold text-primary-700 mb-6 border-b border-primary-100 pb-4">
            <Leaf className="mr-2 h-6 w-6 fill-primary-300" />
            Mind Garden
        </div>
    );

    const NavLink: React.FC<{ item: typeof navItems[0] }> = ({ item }) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
            <Link
                to={item.path}
                className={clsx(
                    "flex items-center w-full transition-colors rounded-xl",
                    "lg:p-3 lg:w-full lg:mb-2 lg:justify-start", // PC (사이드바 스타일)
                    "justify-center flex-1 py-3 sm:text-sm", // Mobile (탭바 스타일)
                    isActive
                        ? "bg-primary-50 text-primary-700 font-semibold"
                        : "text-stone-500 hover:bg-stone-100 hover:text-primary-600"
                )}
            >
                <Icon className="h-6 w-6 lg:mr-3" />
                <span className="hidden lg:inline">{item.name}</span> {/* PC에서만 텍스트 표시 */}
            </Link>
        );
    };

    return (
        <>
            {/* PC: 고정 사이드바 */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:top-0 lg:left-0 lg:h-screen bg-white shadow-xl/10 p-4 border-r border-stone-100">
                <Logo />
                <nav className="flex flex-col">
                    {navItems.map(item => (
                        <NavLink key={item.path} item={item} />
                    ))}
                </nav>
            </aside>

            {/* Mobile: 하단 탭 바 */}
            <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-stone-200 z-40 lg:hidden">
                <nav className="flex h-full w-full justify-around items-center px-2">
                    {navItems.map(item => (
                        <NavLink key={item.path} item={item} />
                    ))}
                </nav>
            </footer>

            {/* Mobile: 식물 등록 FAB (Float Action Button) */}
            <Link to="/add-plant" className="fixed right-6 bottom-20 lg:bottom-6 lg:right-10 w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors z-50">
                <Plus size={28} />
            </Link>
        </>
    );
};

export default Navbar;