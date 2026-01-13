import React from 'react';

const DashboardLevel: React.FC = () => {
    return (
        <div className="flex items-center gap-4 flex-1 p-3 lg:p-0 lg:px-5 bg-white/50 border border-white rounded-3xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 flex-1 ">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold">1</div>
                <div className="flex items-center flex-col lg:flex-row gap-1 lg:gap-6 flex-1">
                    <p className="font-bold">초보 새싹</p>
                    <div className="flex-1 w-full bg-stone-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-sm text-stone-600">다음 레벨까지 40 XP 남음</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardLevel;
