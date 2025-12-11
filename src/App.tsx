import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import { PlantProvider } from "./components/context/PlantProvider";
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './components/pages/DashboardPage';
import MyPlantsPage from './components/pages/MyPlantsPage';
import MoodLogPage from './components/pages/MoodLogPage';
import AddPlantPage from './components/pages/AddPlantPage';
import PlantDetailPage from "./components/pages/PlantDetailPage.tsx";

function App() {
    return (
        <AuthProvider>
            <PlantProvider>
                <Router>
                    <AppLayout>
                        <Routes>
                            {/* 주요 내비게이션 경로 */}
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/my-plants" element={<MyPlantsPage />} />
                            <Route path="/mood-log" element={<MoodLogPage />} />

                            {/* 등록/설정 등 액션 경로 */}
                            <Route path="/add-plant" element={<AddPlantPage />} />
                            {/* 식물 상세 페이지 경로 */}
                            <Route path="/plant/:id" element={<PlantDetailPage />} />

                            {/* 404 페이지는 생략 */}
                        </Routes>
                    </AppLayout>
                </Router>
            </PlantProvider>
        </AuthProvider>
    );
}

export default App;

// import { useState } from "react";
// import PlantCard from './components/plant/PlantCard';
// import type { Plant } from './components/types/Plant';
// import MoodModal from './components/MoodModal'
//
// function App() {
//     // 임시 더미 데이터 (테스트용)
//     const samplePlants: Plant[] = [
//         {
//             id: '1',
//             name: '몬몬이',
//             species: '몬스테라 델리시오사',
//             adoptedDate: '2024-01-01',
//             waterCycle: 7,
//             lastWateredDate: '2025-12-01', // 예시: 물 준 지 좀 됨
//             coverImage: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1000&auto=format&fit=crop', // Unsplash 이미지
//             logs: []
//         },
//         {
//             id: '2',
//             name: '스투키',
//             species: '스투키',
//             adoptedDate: '2024-03-15',
//             waterCycle: 30,
//             lastWateredDate: new Date().toISOString().split('T')[0], // 오늘 물 줌
//             // coverImage 없음 (플레이스홀더 테스트)
//             logs: []
//         }
//     ];
//
//     // 모달 관련 상태 추가
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
//
//     // 물 주기 버튼 클릭 핸들러 (모달 열기)
//     const handleWater = (plant: Plant) => {
//         setSelectedPlant(plant);
//         setIsModalOpen(true);
//     };
//
//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedPlant(null); // 모달 닫을 때 선택된 식물 초기화
//     };
//
//     return (
//         <div className="min-h-screen bg-background p-8">
//             <div className="mx-auto max-w-md">
//                 <header className="mb-8">
//                     <h1 className="text-2xl font-bold text-primary-800">🌿 나의 정원</h1>
//                     <p className="text-stone-500">오늘도 마음 한 뼘 자라나요.</p>
//                 </header>
//
//                 {/* 카드 리스트 영역 */}
//                 <div className="grid gap-6">
//                     {samplePlants.map(plant => (
//                         <PlantCard key={plant.id} plant={plant} onWater={handleWater} />
//                     ))}
//                 </div>
//
//                 {/* ⭐ 모달 렌더링 */}
//                 <MoodModal
//                     isOpen={isModalOpen}
//                     onClose={closeModal}
//                     plant={selectedPlant}
//                 />
//             </div>
//         </div>
//     );
// }
//
// export default App;