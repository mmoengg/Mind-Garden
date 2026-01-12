import React from 'react';

const DashboardLevel: React.FC = () => {
    return (
        <div className="flex flex-col gap-3 p-6 ">
            <p className="text-sm font-bold">레벨 현황</p>
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center font-bold">1</div>
                <div className="flex-1">
                    <p className="text-sm font-bold">정원사 레벨 1</p>
                    <div className="w-full bg-stone-200 rounded-full h-2.5 mt-2">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-sm text-stone-600 mt-1">다음 레벨까지 40 XP 남음</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardLevel;
