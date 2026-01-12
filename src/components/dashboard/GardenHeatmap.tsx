const GardenHeatmap = () => {
    // 1. 날짜 데이터 생성 로직 (오늘부터 과거 119일 전까지 생성)
    // 실제로는 DB에서 '날짜별 기록 횟수'를 가져와야 합니다.
    const days = Array.from({ length: 119 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (118 - i)); // 과거 -> 오늘 순서로 정렬

        return {
            date: d.toISOString().split('T')[0], // "2024-01-01" 형식
            // 랜덤 데이터: 0(안함) ~ 4(열심히함) 사이의 값
            count: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0,
        };
    });

    // 2. 활동량(count)에 따른 색상 결정 함수
    const getColor = (count: number) => {
        if (count === 0) return 'bg-gray-100'; // 기록 없음
        if (count === 1) return 'bg-green-200'; // 조금
        if (count === 2) return 'bg-green-300';
        if (count === 3) return 'bg-green-400';
        return 'bg-green-600'; // 아주 많이 (진한 초록)
    };

    return (
        <div className="w-full h-full p-6 flex flex-col gap-4">
            {/* 헤더: 제목 및 범례 */}
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-sm font-bold text-gray-800">성실함의 잔디밭</h3>
                    <p className="text-xs text-gray-500">꾸준한 기록이 울창한 숲을 만들어요.</p>
                </div>

                {/* 범례 (Legend) */}
                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <span>Less</span>
                    <div className="w-2 h-2 bg-gray-100 rounded-sm"></div>
                    <div className="w-2 h-2 bg-green-200 rounded-sm"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-sm"></div>
                    <div className="w-2 h-2 bg-green-600 rounded-sm"></div>
                    <span>More</span>
                </div>
            </div>

            {/* 히트맵 본체 (CSS Grid 활용) */}
            <div className="flex-1 flex items-center justify-center overflow-hidden">
                {/* grid-rows-7: 월~일 7줄 고정
           grid-flow-col: 데이터가 세로로 먼저 채워지고, 칸이 차면 오른쪽으로 이동 (Github 방식)
        */}
                <div className="grid grid-rows-7 grid-flow-col gap-1 w-fit">
                    {days.map((day) => (
                        <div
                            key={day.date}
                            className={`w-3 h-3 rounded-sm ${getColor(day.count)} hover:ring-2 hover:ring-gray-300 transition-all cursor-pointer relative group`}
                            title={`${day.date}: ${day.count}건 기록`} // 마우스 올리면 날짜 뜸
                        >
                            {/* (선택) 툴팁을 커스텀하고 싶다면 여기에 추가 구현 */}
                        </div>
                    ))}
                </div>
            </div>

            {/* 하단 요약 스탯 */}
            <div className="flex justify-around border-t border-gray-100/50">
                <div className="text-center">
                    <span className="block text font-bold text-gray-800">12일</span>
                    <span className="text-xs text-gray-500">최장 연속 기록</span>
                </div>
                <div className="text-center">
                    <span className="block text font-bold text-gray-800">48개</span>
                    <span className="text-xs text-gray-500">이번 달 심은 잔디</span>
                </div>
            </div>
        </div>
    );
};

export default GardenHeatmap;
