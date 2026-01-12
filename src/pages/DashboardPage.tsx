import React from 'react';
import DashboardLevel from '../components/dashboard/DashboardLevel.tsx';
import BoardPlantCard from '../components/dashboard/BoardPlantCard.tsx';
import { usePlants } from '../hooks/usePlants.ts';
import DashboardStats from '../components/dashboard/DashboardStats.tsx';
import DashboardActionHub from '../components/dashboard/DashboardActionHub.tsx';
import GardenHeatmap from '../components/dashboard/GardenHeatmap.tsx';

const DashboardPage: React.FC = () => {
    const { plants } = usePlants();

    return (
        <div className="overflow-auto grid grid-cols-1 lg:grid-cols-3 grid-rows-[150px_1.5fr_1fr] gap-5 h-full p-4 pb-20 lg:pt-28 lg:pb-4">
            {/* 정원사 레벨 (높이 고정) */}
            <div className="lg:col-span-2 bg-white/50 border border-white rounded-3xl shadow-sm">
                <DashboardLevel />
            </div>

            {/* 레이더 차트  */}
            <div className="lg:col-span-1 lg:row-span-2 bg-white/50 border border-white rounded-3xl shadow-sm">
                <DashboardStats />
            </div>

            {/* Action Hub (할 일 & 감정 기록) */}
            <div className="lg:col-span-2">
                <DashboardActionHub />
            </div>

            {/* 식물 리스트  */}
            <div className="lg:col-span-2 w-full h-full bg-white/50 border border-white rounded-3xl shadow-sm p-6">
                <ul className="flex gap-4 overflow-x-auto w-full snap-x snap-mandatory no-scrollbar">
                    {plants.map((plant) => (
                        <BoardPlantCard key={plant.id} plant={plant} />
                    ))}
                </ul>
            </div>

            {/* 잔디 심기 히트맵 */}
            <div className="lg:col-span-1 bg-white/50 border border-white rounded-3xl shadow-sm">
                <GardenHeatmap />
            </div>
        </div>
    );
};

export default DashboardPage;
