import { useState } from 'react';

const DashboardActionHub = () => {
    const urgentPlant = {
        id: 1,
        name: '몬스테라',
        nickname: '몬몬이',
        dDay: 0, // 0이면 오늘!
        image: '🌿', // 나중엔 이미지 URL
    };

    const [isWatered, setIsWatered] = useState(false);

    return (
        <div className="flex flex-col gap-4 h-full">
            {/* 🚨 위쪽 카드: 긴급 물주기 알림 */}
            <div className="flex-1 bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-5 flex items-center justify-between shadow-sm relative overflow-hidden">
                {/* 배경 장식 (심심하지 않게) */}
                <div className="absolute right-0 top-0 w-24 h-24 bg-yellow-100 rounded-full blur-2xl -z-10 translate-x-8 -translate-y-8"></div>

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
                                    <h3 className="font-bold text-gray-800 text-lg">{urgentPlant.nickname} 물 줄 시간!</h3>
                                </div>
                                <p className="text-sm text-gray-500">하루 종일 목말라 하고 있어요 😭</p>
                            </div>
                        </div>

                        <button onClick={() => setIsWatered(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2">
                            <span>💧</span> 물 주기
                        </button>
                    </>
                )}
            </div>

            {/* 📝 아래쪽 카드: 감정 기록 유도 */}
            <div className="flex-1 bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-5 flex flex-col justify-center shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="font-bold text-gray-800 text-lg">오늘의 마음 날씨는?</h3>
                        <p className="text-xs text-gray-500">아이콘을 눌러서 바로 기록해보세요.</p>
                    </div>
                    {/* 꾸밈 요소 */}
                    <span className="text-2xl animate-spin-slow">🌞</span>
                </div>

                {/* 5가지 감정 아이콘 버튼 */}
                <div className="flex justify-between gap-2">
                    {['😆', '🙂', '😐', '😢', '😡'].map((emoji, index) => (
                        <button key={index} className="w-full aspect-square bg-white rounded-2xl text-3xl flex items-center justify-center hover:bg-yellow-100 hover:scale-110 transition-all border border-gray-100 shadow-sm" onClick={() => alert(`${emoji} 감정을 선택하셨네요! (일기장으로 이동)`)}>
                            {emoji}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardActionHub;
