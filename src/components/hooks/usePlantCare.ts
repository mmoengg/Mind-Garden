import type Plant from '../types/Plant';
import { getDayDifference, addDays } from '../utils/dateUtils';

// 반환 값 타입 정의
interface PlantCareInfo {
    daysUntilWatering: number;
    nextWateringDate: string;
    isUrgent: boolean; // 물을 줘야 하는 시기가 지났는지 (D-Day <= 0)
}

/**
 * 특정 식물의 물 주기 D-Day 및 관리 정보를 계산합니다.
 * @param plant - 계산할 식물 객체
 * @returns PlantCareInfo 객체
 */
export const usePlantCare = (plant: Plant): PlantCareInfo => {
    // 오늘 날짜와 마지막 물 준 날짜, 주기 가져오기
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식의 오늘
    const lastWatered = plant.lastCare.watered;
    const waterCycle = plant.careCycle.water;

    // 다음 물 주기 예정일 계산
    const nextWateringDate = addDays(lastWatered, waterCycle);

    // D-Day 계산: (다음 예정일 - 오늘)
    // getDayDifference는 (dateA - dateB)를 계산합니다.
    const daysUntilWatering = getDayDifference(nextWateringDate, today);

    // 긴급 상태 판단
    const isUrgent = daysUntilWatering <= 0;

    return {
        daysUntilWatering,
        nextWateringDate,
        isUrgent,
    };
};