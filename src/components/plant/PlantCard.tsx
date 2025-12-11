import React from 'react';
import type Plant from '../types/Plant';
import { usePlantCare } from '../hooks/usePlantCare';
import { usePlants } from '../hooks/usePlants';

// Props 타입 정의
interface PlantCardProps {
    plant: Plant;
    onDelete: (id: string) => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onDelete }) => {
    const { recordWatering } = usePlants();
    const { daysUntilWatering, nextWateringDate, isUrgent } = usePlantCare(plant);

    const handleWateringComplete = () => {
        const today = new Date().toISOString().slice(0, 10);

        // Context 함수 호출: 식물 ID와 오늘 날짜를 전달
        recordWatering(plant.id, today);

        console.log(`${plant.name} 물 주기 완료 기록됨: ${today}`);
        // 사용자에게 성공 메시지를 보여주는 로직 (예: Toast)은 추후 추가 가능
    };

    // 동적 스타일 정의
    const wateringStyle = isUrgent
        ? "bg-orange-600"
        : daysUntilWatering <= 3
            ? "bg-yellow-100" // 경고
            : "bg-green-500"; // 정상

    //표시 텍스트 정의
    const dayText = isUrgent ? `D+${Math.abs(daysUntilWatering)} (🚨 물 줄 시기 지남)` : `D-${daysUntilWatering}`;

    return (
        <div className="bg-white rounded-md border transition duration-300 overflow-hidden">
            {/* 이미지 (옵션) */}
            <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                {plant.photoUrl ? (
                    <img src={plant.photoUrl} alt={plant.name} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-4xl">🪴</span>
                )}
            </div>

            <div className="p-4">
                {/* 식물 정보 */}
                {/* 물 주기 D-Day 표시 */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800">{plant.name}
                        {nextWateringDate}
                    </h3>
                    <div className={`px-4 py-1 rounded-full text-sm font-semibold text-white ${wateringStyle}`}>{dayText}{}</div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex justify-between space-x-2">
                    <button
                        className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded text-sm transition duration-300"
                        onClick={handleWateringComplete}
                    >
                        물 주기 완료
                    </button>
                    <button
                        className="bg-orange-600 text-white py-2 px-3 rounded text-sm"
                        onClick={() => onDelete(plant.id)}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlantCard;