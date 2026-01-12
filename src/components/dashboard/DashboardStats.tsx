import GardenRadarChart from '../charts/GardenRadarChart';

const DashboardStats = () => {
    const chartData = [
        { subject: '성실함', A: 90, fullMark: 100 },
        { subject: '애정', A: 80, fullMark: 100 },
        { subject: '기록', A: 40, fullMark: 100 },
        { subject: '다양성', A: 70, fullMark: 100 },
        { subject: '소통', A: 60, fullMark: 100 },
    ];

    return (
        <div className=" p-6 flex flex-col items-center justify-between h-full shadow-sm">
            {/* 타이틀 영역 */}
            <div className="w-full text-left mb-2">
                <h3 className="text-sm font-bold text-gray-800"> 나의 정원 균형</h3>
                <p className="text-xs text-gray-500">'기록' 점수가 조금 부족해요! 일기를 써보세요 📝</p>
            </div>

            {/* 차트 컴포넌트 불러오기 */}
            <div className="w-full flex-1 flex items-center justify-center">
                <GardenRadarChart data={chartData} />
            </div>

            {/* 하단 요약 */}
            <div className="mt-4 flex gap-4 text-xs text-gray-600 bg-white/60 px-4 py-2 rounded-full">
                <span>
                    🥇 최고: <span className="font-bold text-green-600">성실함</span>
                </span>
                <span>
                    🔧 보완: <span className="font-bold text-orange-400">기록</span>
                </span>
            </div>
        </div>
    );
};

export default DashboardStats;
