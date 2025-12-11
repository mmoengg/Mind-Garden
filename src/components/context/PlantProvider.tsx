import React, { useMemo, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import type { Plant, Mood, CareLog } from '../types/Plant';
import { PlantContext, type PlantContextType } from './plantContext';
import useLocalStorage from '../hooks/useLocalStorage';

interface PlantProviderProps {
    children: ReactNode;
}

export const PlantProvider: React.FC<PlantProviderProps> = ({ children }) => {
    // 인증 정보 접근
    const { uid, isLoading: authLoading } = useAuth(); // 인증 로딩 상태도 가져옵니다.

    // UID 기반의 스토리지 키 생성 (Fallback 처리)
    const storageKey = uid ? `mindGardenPlants-${uid}` : 'mindGardenPlants-anon-fallback';

    // UID 기반 키를 useLocalStorage에 전달
    // useAuth가 로딩 중이어도 최상위에서 훅을 호출해야 하므로, key에 UID를 포함시킵니다.
    const [plants, setPlants] = useLocalStorage<Plant[]>(storageKey, []);

    // 데이터 변경 함수 정의 (CRUD)
    const addPlant = (newPlant: Plant) => {
        setPlants(prev => [...prev, newPlant]);
    };

    const deletePlant = (id: string) => {
        setPlants(prev => prev.filter(plant => plant.id !== id));
    };

    const recordWatering = (plantId: string, mood: Mood, content?: string) => {
        const today = new Date().toISOString().slice(0, 10);

        const newLog: CareLog = {
            id: Date.now().toString(),
            date: today,
            type: 'water',
            mood: mood,
            content: content,
        };

        setPlants(prevPlants =>
            prevPlants.map(plant =>
                plant.id === plantId
                    ? {
                        ...plant,
                        lastWateredDate: today,
                        logs: [...plant.logs, newLog]
                    }
                    : plant
            )
        );
    };

    // Context에 전달할 최종 value 정의
    const value: PlantContextType = useMemo(() => ({
        plants,
        addPlant,
        deletePlant,
        recordWatering,
        isLoading: authLoading,
    }), [plants, authLoading]);

    // Context Provider에 value 전달
    return (
        <PlantContext.Provider value={value}>
            {children}
        </PlantContext.Provider>
    );
};