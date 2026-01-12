const MindWeatherWidget: React.FC = () => {
    return (
        <div className="flex flex-col flex-1 gap-4 p-6 bg-white/50 border border-white rounded-3xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-gray-800">오늘의 마음 날씨는?</h3>
                    <p className="text-gray-500">아이콘을 눌러서 바로 기록해보세요.</p>
                </div>
                {/* 꾸밈 요소 */}
                <span className="text-2xl animate-spin-slow">🌞</span>
            </div>

            {/* 5가지 감정 아이콘 버튼 */}
            <div className="flex justify-between gap-4 flex-1">
                {['😆', '🙂', '😐', '😢', '😡'].map((emoji, index) => (
                    <button key={index} className="w-full h-full py-4 bg-white rounded-2xl text-2xl flex items-center justify-center hover:bg-yellow-100 hover:scale-110 transition-all border border-gray-100 shadow-sm" onClick={() => alert(`${emoji} 감정을 선택하셨네요! (일기장으로 이동)`)}>
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MindWeatherWidget;
