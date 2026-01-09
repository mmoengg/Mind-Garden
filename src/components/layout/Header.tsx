import React from 'react';
import { LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="w-full h-11 flex items-center justify-between px-6 z-50">
            <h1 className="text-sm font-bold text-stone-800">Mind Garden</h1>
            <div className="flex  items-center gap-4">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-stone-200">
                    <User className="w-3.5 h-3.5" strokeWidth={2} color="#000000" />
                </span>
                <LogOut className="w-3.5 h-3.5" strokeWidth={2} color="#000000" />
            </div>
        </header>
    );
};

export default Header;
