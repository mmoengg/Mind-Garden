import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems } from '../../data/nav';
import clsx from 'clsx';
import { LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
    const location = useLocation();

    const NavLink: React.FC<{ item: (typeof navItems)[0] }> = ({ item }) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
            <Link
                to={item.path}
                className={clsx(
                    'flex items-center justify-center w-11 rounded-xl transition-all duration-200',
                    'border border-transparent lg:py-3.5  hover:bg-white/70 hover:border hover:border-white', // PC (사이드바 스타일)
                    'justify-center flex-1 py-4 text-sm', // Mobile (탭바 스타일)
                    isActive ? 'lg:bg-white lg:border lg:border-white text-stone-800 font-semibold ' : ' '
                )}
            >
                <Icon className="h-4 w-4" />
                {/*<span className="hidden lg:inline">{item.name}</span> /!* PC에서만 텍스트 표시 *!/*/}
            </Link>
        );
    };

    return (
        <>
            {/* PC: 고정 사이드바 */}
            <aside className="hidden lg:flex flex-col items-center justify-between flex-shrink-0 w-20 p-4">
                <div className="flex flex-col gap-16">
                    <h1 className="flex text-center font-bold text-sm text-stone-800 leading-[15px] cursor-default">
                        mind
                        <br /> garden
                    </h1>
                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <NavLink key={item.path} item={item} />
                        ))}
                    </nav>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <button className="h-11 flex items-center justify-center ">
                        <LogOut className="w-4 h-4" strokeWidth={2} color="#000000" />
                    </button>
                    <button className="w-11 h-11 flex items-center justify-center rounded-full bg-white">
                        <User className="w-4 h-4" strokeWidth={2} color="#000000" />
                    </button>
                </div>
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
