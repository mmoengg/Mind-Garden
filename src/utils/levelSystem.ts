export interface LevelInfo {
    level: number;
    title: string;
    minXP: number;
    nextXP: number;
    percent: number;
}

// 레벨 구간 설정
const LEVEL_THRESHOLDS = [
    { level: 1, minXP: 0, title: '새싹 정원사 🌱' },
    { level: 2, minXP: 100, title: '물조리개 마스터 💧' },
    { level: 3, minXP: 300, title: '햇살 수집가 ☀️' },
    { level: 4, minXP: 600, title: '초록 엄지 👍' },
    { level: 5, minXP: 1000, title: '정원의 요정 🧚‍♀️' },
    { level: 6, minXP: 1500, title: '대자연의 친구 🌳' },
];

/**
 * 현재 XP를 넣으면 레벨 정보를 계산해주는 함수
 * @param currentXP 현재 나의 총 경험치
 */
export const calculateLevelInfo = (currentXP: number): LevelInfo => {
    let level = 1;
    let title = LEVEL_THRESHOLDS[0].title;
    let minXP = 0;
    let nextXP = 100;

    // 내 경험치가 어느 구간에 해당하는지 찾기
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
        const threshold = LEVEL_THRESHOLDS[i];

        if (currentXP >= threshold.minXP) {
            level = threshold.level;
            title = threshold.title;
            minXP = threshold.minXP;

            // 다음 레벨 경험치 설정 (마지막 레벨이면 그냥 넉넉하게 잡음)
            if (i + 1 < LEVEL_THRESHOLDS.length) {
                nextXP = LEVEL_THRESHOLDS[i + 1].minXP;
            } else {
                nextXP = minXP + 1000; // 만렙 이후
            }
        } else {
            break;
        }
    }

    // 퍼센트 계산 (0~100 사이로 안전하게 자름)
    const percent = Math.min(100, Math.max(0, ((currentXP - minXP) / (nextXP - minXP)) * 100));

    return { level, title, minXP, nextXP, percent };
};
