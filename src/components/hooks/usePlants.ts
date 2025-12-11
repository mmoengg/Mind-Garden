import { useContext } from "react";
import { PlantContext, type PlantContextType } from '../context/plantContext';

export const usePlants = (): PlantContextType => {
    const context = useContext(PlantContext);

    if (context === undefined) {
        throw new Error('usePlants must be used within a PlantProvider');
    }

    return context;
};