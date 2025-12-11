import React from 'react';
import { Droplet, AlertCircle } from 'lucide-react'; // 아이콘
import type { Plant } from '../types/Plant';
import { getDDay, formatDDay } from '../utils/date';
import clsx from 'clsx'; // 조건부 클래스 유틸

interface PlantCardProps {
    plant: Plant;
    onWater: (plant: Plant) => void; // 물주기 버튼 클릭 시 실행할 함수
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onWater }) => {
    // D-Day 계산
    const dDay = getDDay(plant.lastWateredDate, plant.waterCycle);

    // 상태 판단 (0 이상이면 물 줄 때가 됨/지남)
    const isThirsty = dDay >= 0;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:shadow-lg border border-stone-100">

            {/* 📸 사진 영역 (비율 4:5 또는 1:1) */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                {plant.coverImage ? (
                    <img
                        src={plant.coverImage}
                        alt={plant.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    // 사진 없을 때 보여줄 플레이스홀더
                    <div className="flex h-full w-full items-center justify-center text-stone-300">
                        <span className="text-4xl">🌿</span>
                    </div>
                )}

                {/* 뱃지: D-Day (사진 위에 띄움) */}
                <div className={clsx(
                    "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur-md",
                    isThirsty
                        ? "bg-red-500/90 text-white" // 목마름: 빨강
                        : "bg-white/80 text-primary-800" // 평소: 흰색 반투명
                )}>
                    {formatDDay(dDay)}
                </div>
            </div>

            {/* 📝 정보 및 액션 영역 */}
            <div className="flex flex-col p-5">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-stone-800">{plant.name}</h3>
                    <p className="text-sm text-stone-500">{plant.species}</p>
                </div>

                {/* 물 주기 버튼 */}
                <button
                    onClick={() => onWater(plant)}
                    className={clsx(
                        "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors",
                        isThirsty
                            ? "bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-200" // 강조 버튼
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200" // 일반 버튼
                    )}
                >
                    {isThirsty ? (
                        <>
                            <Droplet size={18} className="fill-current" />
                            물 주기
                        </>
                    ) : (
                        <>
                            <span className="text-stone-400">잘 자라는 중</span>
                        </>
                    )}
                </button>
            </div>

            {/* 긴급 상태일 때 테두리 효과 (선택 사항) */}
            {isThirsty && dDay > 2 && (
                <div className="absolute inset-0 rounded-3xl border-2 border-red-400 pointer-events-none opacity-50" />
            )}
        </div>
    );
};

export default PlantCard;