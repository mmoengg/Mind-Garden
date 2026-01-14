const WeatherWidget = () => {
    // 실제로는 API로 받아올 데이터 (더미 데이터)
    const weather = {
        temp: 24,
        humidity: 45,
        condition: 'Sunny', // Sunny, Rain, Cloud
        location: 'Seoul',
        comment: '몬스테라가 좋아하는 햇살이에요 ☀️',
    };

    return (
        <div className="flex flex-col justify-between flex-1 p-6 bg-white/50 border border-white rounded-3xl shadow-sm overflow-hidden">
            {/* 위치 및 날씨 아이콘 */}
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-sm font-bold text-stone-500">📍 {weather.location}</h3>
                    <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-stone-800">{weather.temp}°</span>
                        <span className="text-sm font-medium text-stone-500">맑음</span>
                    </div>
                </div>
                {/* 날씨 아이콘 (해) */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-3xl shadow-sm">☀️</div>
            </div>

            {/* 습도 정보 */}
            <div className=" flex items-center gap-3 rounded-2xl p-3">
                <span className="text-xl">💧</span>
                <div className="flex flex-col">
                    <span className="font-bold text-stone-400">현재 습도</span>
                    <span className="font-bold text-blue-600">{weather.humidity}% (건조함)</span>
                </div>
            </div>

            {/* 한줄 코멘트 */}
            <p className=" text-stone-500">💡 {weather.comment}</p>
        </div>
    );
};

export default WeatherWidget;
