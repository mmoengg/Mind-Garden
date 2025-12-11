import React, { useState } from 'react';
import { usePlants } from '../hooks/usePlants';
import type Plant from '../types/Plant';

interface PlantFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PlantFormModal: React.FC<PlantFormModalProps> = ({ isOpen, onClose }) => {
    // Context API에서 addPlant 함수 가져오기
    const { addPlant } = usePlants();

    // 폼 입력 상태 관리
    const [name, setName] = useState('');
    const [waterCycle, setWaterCycle] = useState(7); // 기본값 7일

    if (!isOpen) return null; // 모달이 닫혀있으면 아무것도 렌더링하지 않음

    // 폼 제출 핸들러
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 새 식물 객체 생성 (UUID는 임시로 Date.now()로 생성)
        const newPlant: Plant = {
            id: Date.now().toString(), // 임시 ID
            name,
            adoptedDate: new Date().toISOString().slice(0, 10), // 오늘 날짜
            careCycle: {
                water: waterCycle,
                fertilizer: 30, // 임시값
                pruning: 90,    // 임시값
            },
            lastCare: {
                watered: new Date().toISOString().slice(0, 10), // 등록 시 오늘 물 준 것으로 간주
                fertilized: '2025-01-01', // 임시값
            },
            history: [{ type: 'watered', date: new Date().toISOString().slice(0, 10), memo: '식물 등록 시 초기 물 주기' }],
        };

        // Context API를 통해 전역 상태에 식물 추가
        addPlant(newPlant);

        // 폼 초기화 및 모달 닫기
        setName('');
        setWaterCycle(7);
        onClose();
    };

    return (
        // 모달 배경 및 중앙 정렬 (배경색은 유지하되, 부드러운 그림자 효과)
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg border border-gray-200 w-full max-w-md">

                {/* 타이틀 (Plant-Keeper의 주 색상 사용) */}
                <h2 className="text font-bold mb-6 text-green-800 border-b pb-4">식물 등록</h2>

                <form onSubmit={handleSubmit}>

                    {/* 입력 필드 공통 스타일 적용 */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">이름</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-500 transition duration-150"
                        />
                    </div>

                    {/*/!* 식물 종류 *!/*/}
                    {/*<div className="mb-4">*/}
                    {/*    <label className="block text-sm text-gray-500 mb-1">종류</label>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        placeholder="예: 몬스테라, 스투키"*/}
                    {/*        value={species}*/}
                    {/*        onChange={(e) => setSpecies(e.target.value)}*/}
                    {/*        required*/}
                    {/*        className="w-full p-3 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-lime-300 focus:border-lime-500 transition duration-150"*/}
                    {/*    />*/}
                    {/*</div>*/}

                    {/* 물 주기 주기 */}
                    <div className="mb-8">
                        <label className="block text-sm text-gray-500 mb-1">물 주기 주기 (일)</label>
                        <input
                            type="number"
                            value={waterCycle}
                            onChange={(e) => setWaterCycle(parseInt(e.target.value))}
                            min="1"
                            required
                            className="w-full p-3 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-lime-300 focus:border-lime-500 transition duration-150"
                        />
                    </div>

                    {/* 버튼 영역 */}
                    <div className="flex justify-center space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-24 bg-white border-[1px] border-lime-500 text-lime-500  hover:border-lime-600 hover:text-lime-600 y-2 px-4 rounded transition duration-300"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="w-24 bg-lime-500 hover:bg-lime-600 text-white text-sm py-2 px-4 rounded transition duration-300"
                        >
                            등록
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlantFormModal;