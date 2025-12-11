// 식물 관리 주기 (CareCycle) 인터페이스
export interface CareCycle {
    water: number; // 물 주기 주기 (일 단위)
    fertilizer: number; // 비료 주기 주기 (일 단위)
    pruning: number; // 가지치기 주기 (일 단위)
}

export type MoodType = 'happy' | 'calm' | 'sad' | 'angry';

// 관리 활동 기록 (CareRecord) 인터페이스
export interface CareRecord {
    type: 'watered' | 'fertilized' | 'repotting' | 'pruning' | 'etc';
    date: string; // ISO 형식 (YYYY-MM-DD)
    memo?: string;
    mood?: MoodType; // 그날의 기분
    moodMemo?: string; // 감정 일기
}

// 메인 식물 (Plant) 인터페이스
export default interface Plant {
    id: string;
    name: string;
    photoUrl?: string; // 옵션
    adoptedDate: string; // YYYY-MM-DD

    careCycle: CareCycle;
    lastCare: {
        watered: string; // 마지막 물 준 날짜 (YYYY-MM-DD)
        fertilized: string; // 마지막 비료 준 날짜 (YYYY-MM-DD)
    };

    history: CareRecord[]; // 모든 관리 기록
}