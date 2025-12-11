import { usePlants } from './usePlants';
import type { Mood } from '../types/Plant';

// 감정 빈도 결과를 담을 타입
interface MoodCount {
    mood: string;
    count: number;
    color: string;
    [key: string]: string | number;
}

// 감정 타입별 색상 매핑
const moodColors: Record<Mood, string> = {
    happy: '#4ADE80', // green-400
    calm: '#60A5FA',  // blue-400
    tired: '#A1A1AA', // stone-400
    sad: '#F87171',   // red-400
    angry: '#FBBF24', // amber-400
};

export const useMoodAnalysis = () => {
    const { plants } = usePlants();

    const aggregateMoods = () => {
        const moodMap = new Map<Mood, number>();
        let totalLogs = 0;

        // 모든 식물의 로그를 순회하며 감정 데이터 집계
        plants.forEach(plant => {
            plant.logs.forEach(log => {
                if (log.mood) {
                    const currentCount = moodMap.get(log.mood) || 0;
                    moodMap.set(log.mood, currentCount + 1);
                    totalLogs++;
                }
            });
        });

        // 차트 표시를 위해 배열 형태로 변환
        const result: MoodCount[] = Array.from(moodMap.entries()).map(([mood, count]) => ({
            mood: mood.charAt(0).toUpperCase() + mood.slice(1), // 첫 글자 대문자화
            count: count,
            color: moodColors[mood],
        })).sort((a, b) => b.count - a.count); // 횟수가 많은 순서대로 정렬

        return {
            moodCounts: result,
            totalLogs,
        };
    };

    return aggregateMoods();
};