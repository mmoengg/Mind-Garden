import React, { useState } from 'react';
import { usePlants } from '../hooks/usePlants';
import PlantCard from "../plant/PlantCard";
import PlantFormModal from '../plant/PlantFormModal';

const DashboardPage: React.FC = () => {
    // usePlants 훅을 사용하여 전역 상태와 함수에 접근
    const { plants, deletePlant } = usePlants();
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

    // 모달 열기/닫기 핸들러
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // 화면에 표시할 제목과 버튼
    return (
        <div className="w-full flex-1">
            <div className="container mx-auto p-6">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-green-800">식물 현황</h1>
                    {/* 식물 등록 모달 오픈 버튼 */}
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 focus:outline-0 rounded transition duration-300"
                        onClick={openModal}
                        >
                        + 식물 추가
                    </button>
                </header>

                {/* 식물 목록 렌더링 */}
                {plants.length === 0 ? (
                    <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
                        <p className="text-xl text-gray-500">아직 등록된 식물이 없어요. 위 버튼을 눌러 첫 식물을 등록해 주세요!</p>
                    </div>
                ) : (
                    // 식물 카드들을 표시할 그리드 레이아웃
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* PlantCard 컴포넌트를 사용하여 렌더링 */}
                        {plants.map(plant => (
                            <PlantCard
                                key={plant.id}
                                plant={plant}
                                onDelete={deletePlant}
                            />
                        ))}
                    </div>
                )}

                {/* 모달 컴포넌트 렌더링 */}
                <PlantFormModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            </div>
        </div>
    );
};

export default DashboardPage;