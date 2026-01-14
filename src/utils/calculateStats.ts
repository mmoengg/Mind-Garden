/**
 * 사용자 활동 데이터를 받아서 레이더 차트용 점수를 계산하는 함수
 * @param {Array} diaries - 일기/기록 데이터 배열
 * @param {Array} wateringLogs - 물주기 기록 배열
 * @returns {Array} - Recharts에 바로 넣을 수 있는 데이터 포맷
 */
export const calculateGardenStats = (diaries, wateringLogs) => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // 성실함 (Sincerity): 최근 7일간 일기 쓴 날짜 수
    const recentDiaries = diaries.filter((d) => new Date(d.date) >= oneWeekAgo);
    // 중복 날짜 제거 (하루에 2번 써도 1번 출석)
    const uniqueDays = new Set(recentDiaries.map((d) => d.date.split('T')[0])).size;
    const sincerityScore = Math.min((uniqueDays / 7) * 100, 100);

    // 애정 (Affection): 물주기 이행률 (예시: 전체 로그 중 '완료' 상태 비율)
    const totalWateringTasks = wateringLogs.length;
    const completedTasks = wateringLogs.filter((log) => log.status === 'done').length;
    // 기록이 없으면 0점 방지 위해 기본 50점 부여
    const affectionScore = totalWateringTasks === 0 ? 50 : (completedTasks / totalWateringTasks) * 100;

    // 다양성 (Diversity): 최근 사용한 감정 태그 개수
    const uniqueEmotions = new Set(diaries.map((d) => d.emotion)).size;
    const totalEmotionTypes = 5; // 기쁨, 슬픔, 화남, 평온, 우울
    const diversityScore = Math.min((uniqueEmotions / totalEmotionTypes) * 100, 100);

    // 지속성 (Consistency): 연속 기록일 (Streak 계산 로직은 복잡하니 간단히 개수로 대체 예시)
    // 실제로는 날짜를 정렬해서 차이를 계산해야 함
    const consistencyScore = Math.min((diaries.length / 10) * 100, 100); // 10개만 써도 만점

    // 소통 (Communication): 일기 평균 글자 수
    const totalLength = diaries.reduce((acc, curr) => acc + (curr.content?.length || 0), 0);
    const avgLength = diaries.length === 0 ? 0 : totalLength / diaries.length;
    const communicationScore = Math.min((avgLength / 50) * 100, 100); // 평균 50자면 만점

    // Recharts용 데이터 포맷으로 리턴
    return [
        { subject: '성실함', A: Math.round(sincerityScore), fullMark: 100 },
        { subject: '애정', A: Math.round(affectionScore), fullMark: 100 },
        { subject: '다양성', A: Math.round(diversityScore), fullMark: 100 },
        { subject: '지속성', A: Math.round(consistencyScore), fullMark: 100 },
        { subject: '소통', A: Math.round(communicationScore), fullMark: 100 },
    ];
};
