/**
 * 두 날짜 사이의 일(Day) 차이를 계산합니다.
 * @param dateA - 첫 번째 날짜 (Date 객체 또는 YYYY-MM-DD 문자열)
 * @param dateB - 두 번째 날짜 (Date 객체 또는 YYYY-MM-DD 문자열)
 * @returns 두 날짜 사이의 일 수 차이 (정수)
 */
export const getDayDifference = (dateA: Date | string, dateB: Date | string): number => {
    // 날짜 문자열을 Date 객체로 변환 (time zone 문제를 피하기 위해 UTC로 처리)
    const date1 = new Date(new Date(dateA).toISOString().slice(0, 10));
    const date2 = new Date(new Date(dateB).toISOString().slice(0, 10));

    // ms 단위 차이 계산
    const timeDifference = date1.getTime() - date2.getTime();

    // ms를 일 단위로 변환 (1000ms * 60s * 60m * 24h)
    const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    return dayDifference;
};

/**
 * 특정 날짜에 일 수를 더한 미래 날짜를 반환합니다.
 * @param startDate - 시작 날짜 (YYYY-MM-DD 문자열)
 * @param days - 더할 일 수
 * @returns 미래 날짜 (YYYY-MM-DD 문자열)
 */
export const addDays = (startDate: string, days: number): string => {
    const date = new Date(startDate);
    // time zone 문제 방지를 위해 Date 객체의 날짜를 직접 조작
    date.setDate(date.getDate() + days);

    // YYYY-MM-DD 형식으로 포맷팅
    return date.toISOString().slice(0, 10);
};