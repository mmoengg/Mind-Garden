import React, { useState } from 'react';
import { Smile, Frown, Zap, Cloud, Heart } from 'lucide-react';
import { usePlants } from './hooks/usePlants';
import type { Plant, Mood } from './types/Plant';
import clsx from 'clsx';

interface MoodModalProps {
    isOpen: boolean;
    onClose: () => void;
    plant: Plant | null; // 어떤 식물에게 물을 주는지 알아야 함
}

// 5가지 감정 아이콘 매핑
const moods: { type: Mood; icon: React.FC<any>; color: string; label: string }[] = [
    { type: 'happy', icon: Heart, color: 'text-red-500', label: '행복/기쁨' },
    { type: 'calm', icon: Smile, color: 'text-primary-600', label: '평온/만족' },
    { type: 'tired', icon: Cloud, color: 'text-stone-500', label: '피곤/무덤덤' },
    { type: 'sad', icon: Frown, color: 'text-blue-500', label: '우울/슬픔' },
    { type: 'angry', icon: Zap, color: 'text-yellow-600', label: '화남/스트레스' },
];

const MoodModal: React.FC<MoodModalProps> = ({ isOpen, onClose, plant }) => {
    const { recordWatering } = usePlants();
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
    const [content, setContent] = useState('');

    const handleConfirm = () => {
        if (!plant || !selectedMood) return;

        // Context 함수 호출 (물 주기 + 감정 기록)
        recordWatering(plant.id, selectedMood, content);

        // 초기화 및 닫기
        setSelectedMood(null);
        setContent('');
        onClose();
    };

    if (!isOpen || !plant) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-2 text-primary-800">💧 {plant.name} 물 주기</h2>
                <p className="text-stone-500 mb-6">물 주기 전, 오늘 나의 마음 날씨를 기록해 주세요.</p>

                {/* 1. 감정 선택 영역 */}
                <div className="flex justify-around mb-8">
                    {moods.map((mood) => {
                        const MoodIcon = mood.icon;
                        return (
                            <button
                                key={mood.type}
                                onClick={() => setSelectedMood(mood.type)}
                                className={clsx(
                                    "flex flex-col items-center p-3 rounded-xl transition-all duration-200",
                                    "hover:bg-stone-100",
                                    selectedMood === mood.type
                                        ? `border-2 border-primary-600 bg-primary-50`
                                        : 'border border-transparent'
                                )}
                            >
                                <MoodIcon size={36} className={mood.color} />
                                <span className="mt-1 text-xs font-semibold text-stone-600">{mood.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* 2. 한 줄 메모 영역 */}
                <div className="mb-6">
                    <label className="block text-stone-700 font-semibold mb-2">오늘의 한 줄 기록 (선택 사항)</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="슬픔도 성장의 밑거름이 돼요..."
                        rows={3}
                        className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300"
                    />
                </div>

                {/* 3. 버튼 영역 */}
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold py-2 px-4 rounded-xl"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!selectedMood}
                        className={clsx(
                            "font-bold py-2 px-4 rounded-xl shadow-md transition-colors",
                            selectedMood
                                ? "bg-primary-600 hover:bg-primary-700 text-white"
                                : "bg-stone-300 text-stone-500 cursor-not-allowed"
                        )}
                    >
                        기록 완료
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MoodModal;