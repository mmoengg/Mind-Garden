import React, { useState } from 'react'; // 💡 useState 임포트
import { usePlants } from '../hooks/usePlants'; // usePlants 훅 임포트
import type { Plant } from '../types/Plant'; // Plant 타입 임포트
import PlantCard from '../plant/PlantCard'; // 💡 PlantCard 컴포넌트 임포트
import MoodModal from '../MoodModal'; // 💡 MoodModal 임포트
import { getDDay } from '../utils/date'; // D-Day 계산 유틸 임포트

const DashboardPage: React.FC = () => {
    const { plants } = usePlants();

    // 모달 상태 및 선택된 식물 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

    // 물 주기 버튼 클릭 핸들러 (모달 열기)
    const handleWater = (plant: Plant) => {
        setSelectedPlant(plant);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPlant(null);
    };

    // 물 줄 시기가 된 식물 목록 (D-Day >= 0)
    const thirstyPlants = plants.filter(p => getDDay(p.lastWateredDate, p.waterCycle) >= 0);

    return (
        <div className="py-4">
            <h1 className="text-3xl font-extrabold text-primary-800 mb-6">🏠 나의 정원 대시보드</h1>

            {/* 1. 긴급 알림 영역 */}
            {thirstyPlants.length > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-8 shadow-sm">
                    <p className="font-bold mb-1">🚨 긴급 알림: 물 줄 시간이에요!</p>
                    <p className="text-sm">
                        {thirstyPlants.map(p => p.name).join(', ')}에게 물을 주세요.
                    </p>
                </div>
            )}

            {/* 2. 식물 목록 영역 */}
            {plants.length === 0 ? (
                <div className="text-center p-12  rounded-xl shadow-inner border border-stone-100 bg-white" >
                    <p className="text-stone-500 mb-4">아직 정원에 식물이 없어요! '나의 정원'에서 식물을 등록해주세요.</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* PlantCard 렌더링 및 handleWater 연결 */}
                    {plants.map(plant => (
                        <PlantCard
                            key={plant.id}
                            plant={plant}
                            onWater={handleWater}
                        />
                    ))}
                </div>
            )}

            {/* MoodModal 렌더링 (모달 열기/닫기 로직) */}
            <MoodModal
                isOpen={isModalOpen}
                onClose={closeModal}
                plant={selectedPlant}
            />
        </div>
    );
};

export default DashboardPage;