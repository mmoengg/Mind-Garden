import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react'; // 아이콘
import type { Plant } from '../../types/Plant';
import { getDDay, formatDDay } from '../../utils/date';
import clsx from 'clsx'; // 조건부 클래스 유틸

interface PlantCardProps {
    plant: Plant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
    // D-Day 계산
    const dDay = getDDay(plant.lastWateredDate, plant.waterCycle);

    // 상태 판단 (0 이상이면 물 줄 때가 됨/지남)
    const isThirsty = dDay >= 0;

    return (
        <Link to={`/plants/${plant.id}`} className="relative flex gap-4 lg:gap-0 lg:flex-col lg:justify-between  rounded-3xl bg-white/50 transition-all hover:shadow-sm border border-white shadow-sm">
            <div className="lg:relative aspect-square rounded-2xl w-20 lg:w-full lg:h-full overflow-hidden bg-stone-100">
                {plant.coverImage ? (
                    <img src={plant.coverImage} alt={plant.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                    // 사진 없을 때 보여줄 플레이스홀더
                    <div className="flex items-center justify-center w-full h-full pb-20 text-stone-300">
                        <span className="text-2xl">🌿</span>
                    </div>
                )}

                {/* 뱃지: D-Day (사진 위에 띄움) */}
                <div
                    className={clsx(
                        'absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur-md',
                        isThirsty
                            ? 'bg-red-500/90 text-white' // 목마름: 빨강
                            : 'bg-white/80 text-primary-800' // 평소: 흰색 반투명
                    )}
                >
                    {formatDDay(dDay)}
                </div>

                <div className="flex flex-col absolute left-0 bottom-0 w-full p-5 backdrop-blur-md bg-white/50 shadow-md border-t border-t-white/50">
                    <div className="mb-4">
                        <h3 className="flex items-center gap-0.5  font-bold text-stone-800">
                            {plant.name}
                            {isThirsty && (
                                <span className="ml-1 text-red-500">
                                    <AlertCircle size={16} />
                                </span>
                            )}
                        </h3>
                        <p className="text-sm text-stone-800">{plant.species}</p>
                    </div>
                </div>
            </div>

            {/*<Link to={`/plants/${plant.id}`} className="relative flex gap-4 lg:gap-0 lg:flex-col lg:justify-between p-4 rounded-3xl bg-white/50 transition-all hover:shadow-sm border border-white shadow-sm">*/}
            {/*/!* 📸 사진 영역 (비율 4:5 또는 1:1) *!/*/}
            {/*<div className="lg:relative aspect-square rounded-2xl w-20 lg:w-full lg:h-[235px] overflow-hidden bg-stone-100">*/}
            {/*    {plant.coverImage ? (*/}
            {/*        <img src={plant.coverImage} alt={plant.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />*/}
            {/*    ) : (*/}
            {/*        // 사진 없을 때 보여줄 플레이스홀더*/}
            {/*        <div className="flex h-full w-full items-center justify-center text-stone-300">*/}
            {/*            <span className="text-2xl">🌿</span>*/}
            {/*        </div>*/}
            {/*    )}*/}

            {/*    /!* 뱃지: D-Day (사진 위에 띄움) *!/*/}
            {/*    <div*/}
            {/*        className={clsx(*/}
            {/*            'absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur-md',*/}
            {/*            isThirsty*/}
            {/*                ? 'bg-red-500/90 text-white' // 목마름: 빨강*/}
            {/*                : 'bg-white/80 text-primary-800' // 평소: 흰색 반투명*/}
            {/*        )}*/}
            {/*    >*/}
            {/*        {formatDDay(dDay)}*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*/!* 📝 정보 및 액션 영역 *!/*/}
            {/*<div className="flex flex-col flex-1 pt-4">*/}
            {/*    <div className="mb-4">*/}
            {/*        <h3 className="flex items-center gap-0.5 text-sm font-bold text-stone-800">*/}
            {/*            {plant.name}*/}
            {/*            {isThirsty && (*/}
            {/*                <span className="ml-1 text-red-500">*/}
            {/*                    <AlertCircle size={16} />*/}
            {/*                </span>*/}
            {/*            )}*/}
            {/*        </h3>*/}
            {/*        <p className="text-sm text-stone-500">{plant.species}</p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* 긴급 상태일 때 테두리 효과 */}
            {isThirsty && dDay > 2 && <div className="absolute inset-0 rounded-3xl border-2 border-red-400 pointer-events-none opacity-50" />}
        </Link>
    );
};

export default PlantCard;
