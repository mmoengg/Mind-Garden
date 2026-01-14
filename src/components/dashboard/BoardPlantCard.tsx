import React from 'react';
import type { Plant } from '../../types/Plant';
import { Link } from 'react-router-dom';

interface PlantCardProps {
    plant: Plant;
}

const BoardPlantCard: React.FC<PlantCardProps> = ({ plant }) => {
    return (
        <li key={plant.id} className="min-w-[calc(100%/3-11px)] max-w-[calc(100%/3-11px)]  flex flex-col gap-2">
            <Link to={`/plants/${plant.id}`} className="w-full flex-1 overflow-hidden bg-gray-100 rounded-2xl relative">
                {plant.coverImage ? (
                    <img className="absolute inset-0 w-full h-full min-h-16 object-cover" src={plant.coverImage || ''} alt={plant.name} />
                ) : (
                    <div className="flex h-full w-full min-h-16 items-center justify-center text-gray-300">
                        <span className="text-2xl">🌿</span>
                    </div>
                )}
                <p className="absolute left-0 bottom-0 p-5 w-full text-gray-800 backdrop-blur-md bg-white/50 shadow-md border-t border-t-white/50 whitespace-nowrap overflow-hidden text-sm font-bold text-ellipsis">{plant.name}</p>
            </Link>

            {/* 텍스트 영역 */}
        </li>
    );
};

export default BoardPlantCard;
