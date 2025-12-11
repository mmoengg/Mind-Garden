import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { PlantContext } from './plantContext';
import type Plant from '../types/Plant';

// Context에서 제공할 값의 타입 정의 (여기에 유지)
export interface PlantContextType {
    plants: Plant[];
    addPlant: (newPlant: Plant) => void;
    deletePlant: (id: string) => void;
    recordWatering: (id: string, date: string) => void;
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

    const recordWatering = (id: string, date: string) => {
        setPlants(prevPlants =>
            prevPlants.map(plant =>
                plant.id === id
                    ? {
                        ...plant,
                        lastCare: {...plant.lastCare, watered: date},
                        history: [...plant.history, {type: 'watered', date, memo: '물 주기 완료'}]
                    }
                    : plant
            )
        );
    }
    // -------------------------

    const value: PlantContextType = { plants, addPlant, deletePlant, recordWatering };

    // Context Provider에 value 전달
    return (
        <PlantContext.Provider value={value}>
            {children}
        </PlantContext.Provider>
    );
};