import React from 'react';
import DashboardLevel from '../components/dashboard/DashboardLevel.tsx';
import DashboardStats from '../components/dashboard/DashboardStats.tsx';
import DashboardActionHub from '../components/dashboard/DashboardActionHub.tsx';
import WeatherWidget from '../components/dashboard/WeatherWidget.tsx';
import MindWeatherWidget from '../components/dashboard/MindWeatherWidget.tsx';

const DashboardPage: React.FC = () => {
    return (
        <div className="flex gap-5 h-screen p-4 lg:pt-28">
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
