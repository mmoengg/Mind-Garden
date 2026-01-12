import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { usePlants } from '../hooks/usePlants.ts';
import PlantCard from '../components/plant/PlantCard.tsx';
import MoodModal from '../components/MoodModal.tsx';
import type { Plant } from '../types/Plant';

const MyPlantsPage: React.FC = () => {
    const { plants } = usePlants();

    // ⭐ 모달 상태 및 선택된 식물 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

    // ⭐ 물 주기 버튼 클릭 핸들러 (모달 열기 로직으로 대체)
    const handleWater = (plant: Plant) => {
        setSelectedPlant(plant);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPlant(null);
    };

    return (
        <div className="relative p-4 pb-20 lg:pt-28 lg:pb-4 w-full h-full overflow-y-auto no-scrollbar">
            {/* 상단 헤더 및 등록 버튼 */}
            <header className=" top-3 flex justify-between items-center  w-full mb-6">
                <h2 className="font-bold">
                    나의 정원
                    <p className="text-stone-500 text-sm font-normal">모든 식물 기록과 성장을 한눈에 확인하세요.</p>
                </h2>

                {/* 새 식물 등록 버튼 유지 */}
                <Link to="/add-plant" className="flex items-center gap-2 border border-black font-bold py-2 px-4 rounded-xl hover:bg-yellow-100 transition-colors  text-sm">
                    <Plus size={18} />새 식물 등록
                </Link>
            </header>

            {/* 식물 목록 표시 */}
            {plants.length === 0 ? (
                // ... (식물이 없을 때 UI 유지) ...
                <div className="text-center p-12 bg-white rounded-xl shadow-inner border border-stone-100">
                    <p className="text-stone-500 mb-4">아직 정원에 식물이 없어요!</p>
                    <Link to="/add-plant" className="text-primary-600 font-semibold hover:underline">
                        첫 번째 식물을 등록해보세요.
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-5 overflow-y-auto">
                    {plants.map((plant) => (
                        <PlantCard key={plant.id} plant={plant} onWater={handleWater} />
                    ))}
                </div>
            )}

            {/* ⭐ MoodModal 렌더링 추가 */}
            <MoodModal isOpen={isModalOpen} onClose={closeModal} plant={selectedPlant} />
        </div>
    );
};

export default MyPlantsPage;
