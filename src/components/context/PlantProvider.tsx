import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { PlantContext } from './plantContext';
import type { Plant, CareLog, Mood } from '../types/Plant';

// Context에서 제공할 값의 타입 정의 (여기에 유지)
export interface PlantContextType {
    plants: Plant[];
    addPlant: (newPlant: Plant) => void;
    deletePlant: (id: string) => void;
    recordWatering: (id: string, mood: Mood, content?: string) => void;
}

// Provider 컴포넌트 생성
interface PlantProviderProps {
    children: ReactNode;
}

export const PlantProvider: React.FC<PlantProviderProps> = ({ children }) => {
    const [plants, setPlants] = useState<Plant[]>([]);

    // --- 구현할 핵심 로직 ---
    const addPlant = (newPlant: Plant) => {
        setPlants(prev => [...prev, newPlant]);
    };

    const deletePlant = (id: string) => {
        setPlants(prev => prev.filter(plant => plant.id !== id));
    };

    const recordWatering = (plantId: string, mood: Mood, content?: string) => {
        const today = new Date().toISOString().slice(0, 10);

        // 새로운 CareLog 객체 생성
        const newLog: CareLog = {
            id: Date.now().toString(), // 임시 ID
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
                        lastWateredDate: today, // 마지막 물 준 날짜 업데이트
                        logs: [...plant.logs, newLog] // 새로운 로그 추가
                    }
                    : plant
            )
        );
    };
    // -------------------------

    const value: PlantContextType = { plants, addPlant, deletePlant, recordWatering };

    // Context Provider에 value 전달
    return (
        <PlantContext.Provider value={value}>
            {children}
        </PlantContext.Provider>
    );
};