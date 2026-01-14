/**
 * 🌿 감정 상태 타입
 * 물을 줄 때 기록할 나의 기분입니다.
 */
export type Mood = 'happy' | 'calm' | 'tired' | 'sad' | 'angry' | null;

/**
 * 💧 관리 기록 타입 (Log)
 * 식물에게 무언가를 해준 행위 하나하나를 기록합니다.
 */
export interface CareLog {
    id: string; // 기록 고유 ID (UUID 등 사용)
    date: string; // 기록 날짜 (YYYY-MM-DD)
    type: 'water' | 'repot' | 'prune' | 'note'; // 물주기 | 분갈이 | 가지치기 | 단순기록

    // 📸 사진 기록 (선택)
    // 사용자가 직접 찍은 사진의 URL (Base64 or Firebase Storage URL)
    photoUrl?: string;

    // ☁️ 감정 기록 (선택 - 물 주기나 기록 시 함께 저장)
    mood?: Mood;

    // ✍️ 메모 (선택)
    content?: string;
}

/**
 * 🌱 식물 객체 타입
 * 내 반려 식물의 모든 정보를 담습니다.
 */
export interface Plant {
    id: string; // 식물 고유 ID
    name: string; // 애칭 (예: 몬몬이)
    species: string; // 품종 (예: 몬스테라)
    adoptedDate: string; // 입양일 (YYYY-MM-DD)
    delYn?: 'Y' | 'N'; // 삭제 여부
    // 📷 대표 사진
    // 가장 최근에 찍은 사진이나, 사용자가 설정한 '인생샷'
    coverImage?: string | null;

    // 💧 물 주기 주기 (일 단위)
    waterCycle: number;

    // 🗓️ 마지막으로 물 준 날짜 (D-Day 계산용)
    lastWateredDate: string;

    // 📖 성장 기록 (히스토리)
    // 최신순으로 정렬하여 저장합니다.
    logs: CareLog[];
}
