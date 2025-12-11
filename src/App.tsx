import PlantCard from './components/plant/PlantCard';
import type { Plant } from './components/types/plant';

function App() {
    // 임시 더미 데이터 (테스트용)
    const samplePlants: Plant[] = [
        {
            id: '1',
            name: '몬몬이',
            species: '몬스테라 델리시오사',
            adoptedDate: '2024-01-01',
            waterCycle: 7,
            lastWateredDate: '2025-12-01', // 예시: 물 준 지 좀 됨
            coverImage: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1000&auto=format&fit=crop', // Unsplash 이미지
            logs: []
        },
        {
            id: '2',
            name: '스투키',
            species: '스투키',
            adoptedDate: '2024-03-15',
            waterCycle: 30,
            lastWateredDate: new Date().toISOString().split('T')[0], // 오늘 물 줌
            // coverImage 없음 (플레이스홀더 테스트)
            logs: []
        }
    ];

    const handleWater = (plant: Plant) => {
        alert(`${plant.name}에게 물을 줍니다! (여기에 감정 모달이 뜰 예정)`);
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-md">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-primary-800">🌿 나의 정원</h1>
                    <p className="text-stone-500">오늘도 마음 한 뼘 자라나요.</p>
                </header>

                {/* 카드 리스트 영역 */}
                <div className="grid gap-6">
                    {samplePlants.map(plant => (
                        <PlantCard key={plant.id} plant={plant} onWater={handleWater} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;