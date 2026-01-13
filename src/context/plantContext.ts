import { createContext } from 'react';
import type { Plant, Mood } from '../types/Plant';

export interface PlantContextType {
    plants: Plant[];
    addPlant: (newPlant: Plant) => void;
    deletePlant: (id: string) => Promise<void>;
    recordWatering: (plantId: string, mood: 'happy' | 'calm' | 'tired' | 'sad' | 'angry' | null, content?: string) => void;
    waterPlant: (id: string) => Promise<void>;
    updatePlant: (plant: Plant) => Promise<void>;
    isLoading: boolean;
}

export const PlantContext = createContext<PlantContextType | undefined>(undefined);