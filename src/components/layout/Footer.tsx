import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    // 현재 연도 계산 (저작권 표시용)
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 border-t border-gray-200">
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">

                {/* 저작권 및 버전 정보 (왼쪽) */}
                <div className="mb-2 md:mb-0">
                    &copy; {currentYear} Plant-Keeper. All rights reserved. | Version 1.0
                </div>

                {/* 링크 및 유틸리티 (오른쪽/중앙) */}
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/about" className="hover:text-green-700 transition duration-150">
                                소개
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy" className="hover:text-green-700 transition duration-150">
                                개인정보처리방침
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-green-700 transition duration-150">
                                문의
                            </Link>
                        </li>
                    </ul>
                </nav>

            </div>
        </footer>
    );
};

export default Footer;