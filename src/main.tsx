import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { PlantProvider } from './context/PlantProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* <App />을 <PlantProvider>로 감싸서 Context를 주입 */}
        <PlantProvider>
            <App />
        </PlantProvider>
    </StrictMode>
)