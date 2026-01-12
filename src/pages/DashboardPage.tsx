import React from 'react';
import DashboardLevel from '../components/dashboard/DashboardLevel.tsx';
import DashboardStats from '../components/dashboard/DashboardStats.tsx';
import DashboardActionHub from '../components/dashboard/DashboardActionHub.tsx';
import WeatherWidget from '../components/dashboard/WeatherWidget.tsx';
import MindWeatherWidget from '../components/dashboard/MindWeatherWidget.tsx';

const DashboardPage: React.FC = () => {
    return (
        <div className="relative flex gap-5 h-screen p-4 lg:pt-28">
            <header className="absolute top-3 flex justify-between items-center w-[calc(100%-40px)] h-11">
                <h2 className="text-xl font-bold">모아보기</h2>

                {/* 새 식물 등록 버튼 유지 */}
                <button className="flex items-center gap-2 py-2 px-4 bg-black text-white  rounded-3xl  transition-colors font-bold text-sm">Search</button>
            </header>
            <div className="flex flex-col gap-5 w-2/3">
                {/* 정원사 레벨 (높이 고정) */}
                <div className="flex  h-[10%] flex-shrink-0">
                    <DashboardLevel />
                </div>
                {/* 긴급 식물 & 식물 목록 */}
                <div className="flex h-full">
                    <DashboardActionHub />
                </div>
                {/* 감정 기록 유도 */}
                <div className="flex h-[calc(30%)] flex-shrink-0">
                    <MindWeatherWidget />
                </div>
            </div>
            <div className="flex flex-col gap-5 w-1/3">
                {/* 레이더 차트  */}
                <div className="flex  h-full">
                    <DashboardStats />
                </div>
                {/* 날씨 위젯 */}
                <div className="flex  h-[calc(30%)] flex-shrink-0">
                    <WeatherWidget />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
