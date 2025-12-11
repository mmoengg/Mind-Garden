import React, { useState } from 'react'; // 💡 useState 임포트
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { usePlants } from '../hooks/usePlants';
import PlantCard from '../plant/PlantCard';
import MoodModal from '../MoodModal'; // 💡 MoodModal 임포트
import type { Plant } from '../types/Plant'; // Plant 타입 임포트

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
        <div className="py-4">
            {/* 상단 헤더 및 등록 버튼 */}
            <header className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">🌱 나의 정원</h2>

                {/* 새 식물 등록 버튼 유지 */}
                <Link
                    to="/add-plant"
                    className="flex items-center gap-2 bg-primary-600 text-white font-bold py-2 px-4 rounded-xl hover:bg-primary-700 transition-colors shadow-md shadow-primary-200 text-sm"
                >
                    <Plus size={18} />
                    새 식물 등록
                </Link>
            </header>

            <p className="text-stone-500 mb-8">모든 식물 기록과 성장을 한눈에 확인하세요.</p>

            {/* 식물 목록 표시 */}
            {plants.length === 0 ? (
                // ... (식물이 없을 때 UI 유지) ...
                <div className="text-center p-12 bg-white rounded-xl shadow-inner border border-stone-100">
                    <p className="text-stone-500 mb-4">아직 정원에 식물이 없어요!</p>
                    <Link
                        to="/add-plant"
                        className="text-primary-600 font-semibold hover:underline"
                    >
                        첫 번째 식물을 등록해보세요.
                    </Link>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* PlantCard 렌더링 */}
                    {plants.map(plant => (
                        <PlantCard
                            key={plant.id}
                            plant={plant}
                            onWater={handleWater}
                        />
                    ))}
                </div>
            )}

            {/* ⭐ MoodModal 렌더링 추가 */}
            <MoodModal
                isOpen={isModalOpen}
                onClose={closeModal}
                plant={selectedPlant}
            />
        </div>
    );
};

export default MyPlantsPage;