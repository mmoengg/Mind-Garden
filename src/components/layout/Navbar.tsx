import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../../data/nav';
import clsx from 'clsx';

const Navbar: React.FC = () => {
    const location = useLocation();

    const NavLink: React.FC<{ item: (typeof navItems)[0] }> = ({ item }) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
            <Link
                to={item.path}
                className={clsx(
                    'flex items-center w-full transition-colors rounded-full',
                    'lg:px-7 lg:w-full lg:mb-2 lg:justify-start border border-transparent hover:bg-white/30 lg:hover:border lg:hover:border-white ', // PC (사이드바 스타일)
                    'justify-center flex-1 py-3 text-sm', // Mobile (탭바 스타일)
                    isActive ? 'lg:bg-white/70 lg:border lg:border-white text-stone-800 font-semibold ' : ' '
                )}
            >
                <Icon className="h-4 w-4 lg:mr-3" />
                <span className="hidden lg:inline">{item.name}</span> {/* PC에서만 텍스트 표시 */}
            </Link>
        );
    };

    return (
        <>
            {/* PC: 고정 사이드바 */}
            <aside className="hidden flex-shrink-0 lg:flex lg:flex-col lg:w-64 p-6">
                <nav className="flex flex-col">
                    {navItems.map((item) => (
                        <NavLink key={item.path} item={item} />
                    ))}
                </nav>
            </aside>

            {/* Mobile: 하단 탭 바 */}
            <footer className="fixed bottom-0 left-0 right-0 h-16  border-t border-stone-200 z-40 lg:hidden">
                <nav className="flex h-full w-full justify-around items-center px-2">
                    {navItems.map((item) => (
                        <NavLink key={item.path} item={item} />
                    ))}
                </nav>
            </footer>
        </>
    );
};

export default Navbar;
