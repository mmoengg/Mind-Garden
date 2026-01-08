import { differenceInCalendarDays, addDays, parseISO } from 'date-fns';

/**
 * 💧 D-Day 계산 함수
 * 마지막 물 준 날짜와 주기를 입력받아, 오늘 기준으로 며칠 남았는지(혹은 지났는지) 반환합니다.
 * 반환값:
 * 0: 오늘
 * 양수 (+N): N일 지남 (긴급!)
 * 음수 (-N): N일 남음
 */
export const getDDay = (lastWateredDate: string, cycle: number): number => {
    const today = new Date();
    const lastWatered = parseISO(lastWateredDate);
    const nextWateringDate = addDays(lastWatered, cycle);

    // (다음 물 줄 날짜 - 오늘)을 계산해야 하지만,
    // 보통 D-Day는 (목표일 - 오늘)이므로 음수가 나오면 남은 것.
    // 여기서는 직관적으로 "며칠 지났나?"를 기준으로 할 수도 있고,
    // 표준적인 D-Day 표기(D-3, D+1)를 위해 차이를 구합니다.

    // differenceInCalendarDays(Left, Right) = Left - Right
    // 오늘 - 다음 예정일
    // 예: 오늘(10일), 예정일(13일) -> 10 - 13 = -3 (D-3)
    // 예: 오늘(15일), 예정일(13일) -> 15 - 13 = 2 (D+2, 2일 지남)
    return differenceInCalendarDays(today, nextWateringDate);
};

/**
 * D-Day 숫자를 텍스트로 변환 (예: "D-3", "D+Day", "오늘")
 */
export const formatDDay = (dDay: number): string => {
    if (dDay === 0) return 'D-Day';
    if (dDay > 0) return `D+${dDay}`;
    return `D${dDay}`;
};