import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import BoardPlantCard from './BoardPlantCard.tsx';
import { usePlants } from '../../hooks/usePlants.ts';
import { getDDay } from '../../utils/date';

const DashboardActionHub = () => {
    const { plants } = usePlants();

    const urgentPlants = useMemo(() => {
        if (plants.length === 0) return [];

        const filtered = plants.filter((plant) => {
            const dDay = getDDay(plant.lastWateredDate, plant.waterCycle);
            return dDay >= 0; // 오늘이거나 지난 날짜(목마름)
        });

        return filtered.sort((a, b) => {
            const dDayA = getDDay(a.lastWateredDate, a.waterCycle);
            const dDayB = getDDay(b.lastWateredDate, b.waterCycle);
            return dDayB - dDayA; // 더 급한 순서대로 정렬
        });
    }, [plants]);

    const hasUrgentPlant = urgentPlants.length > 0;
    // 안전하게 데이터 가져오기 (없으면 null)
    const targetPlant = urgentPlants[0] || null;

    // D-Day 라벨 계산 (targetPlant가 있을 때만 계산)
    const dDayLabel = targetPlant ? getDDay(targetPlant.lastWateredDate, targetPlant.waterCycle) : 0;

    return (
        <div className="flex flex-col w-full gap-5">
            {hasUrgentPlant && targetPlant && (
                <div className="overflow-hidden flex items-center justify-between flex-col lg:flex-row relative p-3 lg:p-5 border border-white rounded-3xl shadow-sm bg-white/50">
                    <div className="absolute right-0 top-0 w-28 h-full bg-yellow-200 rounded-full blur-2xl -z-10 translate-x-8 -translate-y-8"></div>

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-4xl shadow-inner overflow-hidden">{targetPlant.coverImage && targetPlant.coverImage.startsWith('http') ? <img src={targetPlant.coverImage} alt={targetPlant.name} className="w-full h-full object-cover" /> : targetPlant.coverImage || '🌿'}</div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-red-100 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">D+{dDayLabel}</span>
                                <h3 className="font-bold text-gray-800">{targetPlant.name} 물 줄 시간!</h3>
                            </div>
                            <p className="text-gray-500">하루 종일 목말라 하고 있어요 😭</p>
                        </div>
                    </div>

                    <Link to={`/plants/${targetPlant.id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2">
                        <span>💧</span> 물 주기
                    </Link>
                </div>
            )}

            {/* 식물 리스트 */}

            <div className=" flex-1 bg-white/50 border border-white rounded-3xl shadow-sm p-6 ">
                <ul className="flex h-full gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar">
                    {plants.map((plant) => (
                        <BoardPlantCard key={plant.id} plant={plant} />
                    ))}
                </ul>
            </div>

            {/*<div className="flex-1 bg-white/50 border border-white rounded-3xl shadow-sm p-6">*/}
            {/*    {plants.length > 0 ? (*/}
            {/*        <ul className="flex h-full gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar">*/}
            {/*            {plants.map((plant) => (*/}
            {/*                <BoardPlantCard key={plant.id} plant={plant} />*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    ) : (*/}
            {/*        // 혹시 등록된 식물이 아예 하나도 없을 때 보여줄 메시지 (선택 사항)*/}
            {/*        <div className="text-center text-gray-400 py-4">등록된 식물이 없어요 🌱</div>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
};

export default DashboardActionHub;
