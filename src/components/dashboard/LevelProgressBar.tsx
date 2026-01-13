import React from 'react';
import { calculateLevelInfo } from '../../utils/levelSystem';

interface Props {
    currentXP: number; // 부모한테서 "지금 내 경험치"만 받으면 됩니다.
}

const LevelProgressBar: React.FC<Props> = ({ currentXP }) => {
    const { level, title, percent, nextXP, minXP } = calculateLevelInfo(currentXP);

    // 현재 레벨에서 획득한 경험치 (예: 레벨2 시작점이 100이고 현재 150이면, 50만큼 획득)
    const gainedXP = currentXP - minXP;
    const requiredXP = nextXP - minXP;

    return (
        <div className="flex items-center gap-4 flex-1 p-3 lg:p-0 lg:px-5 bg-white/50 border border-white rounded-3xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 flex-1 ">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold">{level}</div>
                <div className="flex items-center flex-col lg:flex-row gap-3 lg:gap-6 flex-1">
                    <p className="font-bold whitespace-nowrap">{title}</p>
                    <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        {/* 차오르는 게이지 */}
                        <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-1" style={{ width: `${percent}%` }}></div>
                    </div>
                    <div className="flex justify-between gap-5 text-xs font-medium text-gray-500">
                        <span className="flex items-center justify-center whitespace-nowrap">현재 {gainedXP} XP</span>
                        <span className="flex items-center justify-center whitespace-nowrap">다음 레벨까지 {requiredXP - gainedXP} XP 남음</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LevelProgressBar;
