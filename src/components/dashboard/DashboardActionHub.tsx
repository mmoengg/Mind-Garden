import { useState } from 'react';
import BoardPlantCard from './BoardPlantCard.tsx';
import { usePlants } from '../../hooks/usePlants.ts';

const DashboardActionHub = () => {
    const urgentPlant = {
        id: 1,
        name: '몬스테라',
        nickname: '몬몬이',
        dDay: 0, // 0이면 오늘!
        image: '🌿', // 나중엔 이미지 URL
    };

    const [isWatered, setIsWatered] = useState(false);
    const { plants } = usePlants();

    return (
        <div className="flex flex-col flex-1 gap-5">
            {/* 긴급 물주기 알림 */}
            <div className="relative flex items-center justify-between  p-5 border border-white rounded-3xl shadow-sm  bg-white/50   ">
                {/*/!* 배경 장식 *!/*/}
                {/*<div className="absolute right-0 top-0 w-28 bg-yellow-200 rounded-full blur-2xl -z-10 translate-x-8 -translate-y-8"></div>*/}

                {isWatered ? (
                    // (A) 물 주기 완료했을 때 보여줄 화면
                    <div className="w-full text-center py-2 animate-pulse">
                        <h3 className="text-xl font-bold text-blue-500">💦 꿀꺽꿀꺽!</h3>
                        <p className="text-gray-500 text-sm">몬몬이가 아주 시원해해요!</p>
                    </div>
                ) : (
                    // (B) 물 줘야 할 때 보여줄 화면
                    <>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-4xl shadow-inner">{urgentPlant.image}</div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-red-100 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">D-Day</span>
                                    <h3 className="font-bold text-gray-800">{urgentPlant.nickname} 물 줄 시간!</h3>
                                </div>
                                <p className="text-gray-500">하루 종일 목말라 하고 있어요 😭</p>
                            </div>
                        </div>

                        <button onClick={() => setIsWatered(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2">
                            <span>💧</span> 물 주기
                        </button>
                    </>
                )}
            </div>

            {/* 식물 리스트  */}
            <div className=" flex-1 bg-white/50 border  border-white rounded-3xl shadow-sm p-6 ">
                <ul className="flex h-full gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar">
                    {plants.map((plant) => (
                        <BoardPlantCard key={plant.id} plant={plant} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DashboardActionHub;
