// src/pages/AddPlantPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlants } from '../hooks/usePlants';
import type { Plant } from '../types/Plant';
import {Camera, Calendar, Hash, Leaf, Droplet, type LucideIcon} from 'lucide-react';

const AddPlantPage: React.FC = () => {
    const navigate = useNavigate();
    const { addPlant } = usePlants();

    // 폼 상태 관리
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [description, setDescription] = useState(''); // 설명 필드 추가
    const [waterCycle, setWaterCycle] = useState(7); // 기본값 7일
    const [adoptedDate, setAdoptedDate] = useState(new Date().toISOString().slice(0, 10)); // 오늘 날짜 기본값
    const [coverImage, setCoverImage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 필수 필드 유효성 검사 (이름, 품종, 물주기)
        if (!name.trim() || !species.trim() || waterCycle <= 0) {
            alert('식물의 이름, 종류, 물 주기 주기는 필수 항목입니다.');
            return;
        }

        // 새 식물 객체 생성
        const newPlant: Plant = {
            id: Date.now().toString(), // 임시 고유 ID
            name,
            species,
            adoptedDate,
            waterCycle,
            coverImage: coverImage.trim() || undefined, // 비어있으면 undefined
            lastWateredDate: adoptedDate, // 처음 등록 시 입양일을 마지막 물 준 날로 설정
            logs: [
                {
                    id: Date.now().toString() + '-init',
                    date: adoptedDate,
                    type: 'note',
                    content: description || '새로운 정원 생활을 시작합니다. 🌱'
                }
            ],
        };

        addPlant(newPlant);
        alert(`${name}의 정원 생활을 시작합니다!`);
        navigate('/'); // 등록 후 대시보드로 이동
    };

    // 폼 입력 필드 컴포넌트 (반복되는 디자인 간소화)
    const InputField: React.FC<{
        label: string;
        id: string;
        value: string | number;
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
        type?: string;
        icon: LucideIcon;
        placeholder?: string;
        min?: number;
    }> = ({ label, id, value, onChange, type = 'text', icon: Icon, placeholder, min }) => (
        <div className="mb-6">
            <label htmlFor={id} className="block text-sm font-semibold text-stone-700 mb-2">
                {label}
            </label>
            <div className="flex items-center border border-stone-300 rounded-xl p-3 bg-white focus-within:ring-2 focus-within:ring-primary-300">
                <Icon className="w-5 h-5 text-stone-400 mr-3" />
                {type === 'textarea' ? (
                    <textarea
                        id={id}
                        value={value}
                        onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
                        rows={3}
                        className="w-full focus:outline-none resize-none"
                        placeholder={placeholder}
                    />
                ) : (
                    <input
                        id={id}
                        type={type}
                        value={value}
                        onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
                        className="w-full focus:outline-none"
                        placeholder={placeholder}
                        min={min}
                    />
                )}
            </div>
        </div>
    );


    return (
        <div className="max-w-xl py-8">
            <h1 className="text-3xl font-extrabold text-primary-800 mb-2">➕ 새로운 정원 친구 등록</h1>
            <p className="text-stone-500 mb-8">나의 반려 식물 정보를 기록하고, 마음 정원을 시작해보세요.</p>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100">

                {/* 1. 기본 정보 */}
                <InputField
                    label="별명 (필수)"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={Hash}
                    placeholder="예: 몬몬이, 초록이"
                />

                <InputField
                    label="종류/품종 (필수)"
                    id="species"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    icon={Leaf}
                    placeholder="예: 몬스테라, 스투키, 산세베리아"
                />

                {/* 2. 관리 정보 */}
                <InputField
                    label="물 주기 주기 (일 단위, 필수)"
                    id="waterCycle"
                    value={waterCycle}
                    onChange={(e) => setWaterCycle(parseInt(e.target.value) || 0)}
                    type="number"
                    icon={Droplet} // Droplet 아이콘은 lucide-react에서 가져와야 함
                    min={1}
                />

                <InputField
                    label="입양일 (선택)"
                    id="adoptedDate"
                    value={adoptedDate}
                    onChange={(e) => setAdoptedDate(e.target.value)}
                    type="date"
                    icon={Calendar}
                />

                {/* 3. 사진 및 메모 */}
                <InputField
                    label="대표 사진 URL (선택)"
                    id="coverImage"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    icon={Camera}
                    placeholder="사진 URL을 직접 입력 (나중에 파일 업로드로 대체됩니다)"
                />

                <InputField
                    label="식물 설명/입양 메모 (선택)"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    icon={Hash} // 임시 아이콘
                    type="textarea"
                    placeholder="어디서 왔는지, 특별한 특징이 있는지 기록해 보세요."
                />

                {/* 등록 버튼 */}
                <button
                    type="submit"
                    className="w-full bg-primary-600 text-white font-bold py-3 rounded-xl hover:bg-primary-700 transition-colors mt-6 shadow-md shadow-primary-200"
                >
                    정원 친구 추가하기
                </button>
            </form>

            <button
                onClick={() => navigate(-1)}
                className="mt-4 w-full text-stone-500 hover:text-stone-700 py-2"
            >
                취소하고 돌아가기
            </button>
        </div>
    );
};

export default AddPlantPage;