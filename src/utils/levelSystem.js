// 레벨 구간 설정
const LEVEL_THRESHOLDS = [
    { level: 1, min: 0, max: 100, title: '초보 씨앗', color: 'bg-green-200' },
    { level: 2, min: 101, max: 300, title: '튼튼한 새싹', color: 'bg-green-400' },
    { level: 3, min: 301, max: 600, title: '싱그러운 잎새', color: 'bg-green-600' },
    { level: 4, min: 601, max: 1000, title: '화려한 꽃봉오리', color: 'bg-pink-400' },
    { level: 5, min: 1001, max: Infinity, title: '전설의 정원사', color: 'bg-yellow-500' },
];

/**
 * 현재 총 경험치(totalXP)를 넣으면 레벨 정보를 계산
 */
export const calculateLevelInfo = (totalXP) => {
    // 현재 XP에 해당하는 레벨 찾기
    const currentLevel = LEVEL_THRESHOLDS.find((tier) => totalXP >= tier.min && totalXP <= tier.max) || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]; // 만렙 처리

    // 다음 레벨까지 남은 퍼센트 계산 (Progress Bar용)
    // 공식: (현재XP - 현재레벨시작XP) / (다음레벨XP - 현재레벨시작XP) * 100
    let progressPercent = 0;

    if (currentLevel.level < 5) {
        const range = currentLevel.max - currentLevel.min;
        const gained = totalXP - currentLevel.min;
        progressPercent = Math.floor((gained / range) * 100);
    } else {
        progressPercent = 100; // 만렙은 꽉 채움
    }

    return {
        level: currentLevel.level,
        title: currentLevel.title,
        color: currentLevel.color,
        percent: progressPercent,
        currentXP: totalXP,
        nextXP: currentLevel.max,
    };
};
