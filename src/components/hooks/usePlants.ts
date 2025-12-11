// Custom Hook 생성 (Context 사용 용이)
import { useContext } from "react";
import { PlantContext } from '../context/plantContext';

export const usePlants = () => {
    const context = useContext(PlantContext);
    if (!context) {
        throw new Error('usePlants must be used within a PlantProvider');
    }
    return context;
};