import React from 'react';
import type { Plant } from '../../types/Plant';

interface PlantCardProps {
    plant: Plant;
}

const BoardPlantCard: React.FC<PlantCardProps> = ({ plant }) => {
    return (
        <>
            <li key={plant.id} className="flex-shrink-0 min-w-[calc(100%/3-11px)] max-w-[calc(100%/3-11px)] flex flex-col gap-2 snap-start">
                {/* 이미지 영역 */}
                <div className="w-full min-h-40 max-h-40 overflow-hidden bg-gray-100 rounded-2xl">
                    {plant.coverImage ? (
                        <img className="w-full h-full object-cover" src={plant.coverImage || ''} alt={plant.name} />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-300">
                            <span className="text-2xl">🌿</span>
                        </div>
                    )}
                </div>
                {/* 텍스트 영역 */}
                <p className="w-full text-sm font-medium text-gray-700 truncate">{plant.name}</p>
            </li>
        </>
    );
};

export default BoardPlantCard;
