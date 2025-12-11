import { Home, Leaf, Cloud, type LucideIcon } from 'lucide-react';

interface NavItem {
    name: string;
    path: string;
    icon: LucideIcon;
}

export const navItems: NavItem[] = [
    { name: '대시보드', path: '/', icon: Home },
    { name: '나의 정원', path: '/my-plants', icon: Leaf },
    { name: '마음 기록', path: '/mood-log', icon: Cloud },
];