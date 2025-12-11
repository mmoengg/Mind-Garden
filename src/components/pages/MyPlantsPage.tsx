import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { usePlants } from '../hooks/usePlants';
import PlantCard from '../plant/PlantCard';

const MyPlantsPage: React.FC = () => {
    const { plants } = usePlants(); // 식물 목록을 가져옵니다.

    const handleWater = (plant: any) => {
        // 여기에 물 주기 모달을 여는 로직이 들어갈 예정입니다. (현재는 alert)
        alert(`[${plant.name}] 물 주기 준비!`);
    };

    return (
        <div>
            {/* 상단 헤더 및 등록 버튼 */}
            <header className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">🌱 나의 정원</h2>

                {/* 💡 새 식물 등록 버튼 추가 */}
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
                    {/* PlantCard에서는 D-Day 확인 및 상세 보기만 활성화하는 것이 좋습니다.
                       물 주기는 DashboardPage에서 처리하도록 분리할 예정입니다.
                       여기서는 임시로 PlantCard를 사용합니다. */}
                    {plants.map(plant => (
                        <PlantCard key={plant.id} plant={plant} onWater={handleWater} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPlantsPage;