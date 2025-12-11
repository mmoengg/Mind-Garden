import { createContext } from 'react';
import type { Plant, Mood } from '../types/Plant';

export interface PlantContextType {
    plants: Plant[];
    addPlant: (newPlant: Plant) => void;
    deletePlant: (id: string) => void;
    recordWatering: (plantId: string, mood: Mood, content?: string) => void;
    isLoading: boolean;
}

export const PlantContext = createContext<PlantContextType | undefined>(undefined);