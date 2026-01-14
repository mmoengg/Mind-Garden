import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { usePlants } from '../hooks/usePlants.ts';
import PlantCard from '../components/plant/PlantCard.tsx';
import { getDDay } from '../utils/date';

const MyPlantsPage: React.FC = () => {
    const { plants } = usePlants();

    const sortedPlants = useMemo(() => {
        return [...plants].sort((a, b) => {
            // A와 B의 D-Day를 각각 계산
            const dDayA = getDDay(a.lastWateredDate, a.waterCycle);
            const dDayB = getDDay(b.lastWateredDate, b.waterCycle);

            const isThirstyA = dDayA >= 0; // A가 목마른가?
            const isThirstyB = dDayB >= 0; // B가 목마른가?

            // A만 목마르면 -> A를 앞으로 보냄
            if (isThirstyA && !isThirstyB) return -1;

            // B만 목마르면 -> B를 앞으로 보냄
            if (!isThirstyA && isThirstyB) return 1;

            // 둘 다 목마르다면? -> 더 급한(D-Day 숫자가 큰) 애가 위로 오게
            // (예: D+5가 D+1보다 위에 뜸)
            if (isThirstyA && isThirstyB) {
                return dDayB - dDayA;
            }

            return 0;
        });
    }, [plants]);

    return (
        <div className="overflow-y-auto no-scrollbar relative pt-20 p-4 pb-20 lg:pt-28 lg:pb-4 w-full h-full ">
            {/* 상단 헤더 및 등록 버튼 */}
            <header className="absolute top-3 flex justify-between items-center w-[calc(100%-40px)] h-11">
                <h2 className="text-xl font-bold">
                    나의 정원
                    {/*<p className="text-stone-500 text-sm font-normal">모든 식물 기록과 성장을 한눈에 확인하세요.</p>*/}
                </h2>
                {/* 새 식물 등록 버튼 유지 */}
                <Link to="/add-plant" className="flex items-center hover:gap-2 h-9 px-4 border border-black bg-black text-white rounded-3xl font-bold text-sm -indent-[9999px] hover:indent-0 transition-all duration-200">
                    <Plus size={16} />
                    식물 등록
                </Link>
            </header>

            {/* 식물 목록 표시 */}
            {plants.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-xl shadow-inner border border-stone-100">
                    <p className="text-stone-500 mb-4">아직 정원에 식물이 없어요!</p>
                    <Link to="/add-plant" className="text-primary-600 font-semibold hover:underline">
                        첫 번째 식물을 등록해보세요.
                    </Link>
                </div>
            ) : (
                <div className="overflow-y-auto no-scrollbar grid grid-cols-1 gap-3 lg:gap-5 lg:grid-rows-2 lg:grid-cols-3 h-full">
                    {sortedPlants.map((plant) => (
                        <PlantCard key={plant.id} plant={plant} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPlantsPage;
