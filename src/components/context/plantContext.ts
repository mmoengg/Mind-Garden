import { createContext } from 'react';
import type { PlantContextType } from './PlantProvider';

export const PlantContext = createContext<PlantContextType | null>(null);