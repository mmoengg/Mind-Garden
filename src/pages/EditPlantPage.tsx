// src/pages/EditPlantPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePlants } from '../hooks/usePlants'; // 경로 수정 완료 (../)
import { useAuth } from '../context/AuthContext'; // 경로 수정 완료 (../)
import type { Plant } from '../types/Plant'; // 경로 수정 완료 (../)
import { Camera, Calendar, Hash, Leaf, Droplet, Loader2, ArrowLeft, type LucideIcon } from 'lucide-react';

import imageCompression from 'browser-image-compression';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // 경로 수정 완료 (../)

// UI 컴포넌트 (입력창) - 깜빡임 방지를 위해 밖으로 뺐습니다
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
        <label htmlFor={id} className="block text-sm font-semibold text-stone-700 mb-2">{label}</label>
        <div className="flex items-center border border-stone-300 rounded-xl p-3 bg-white focus-within:ring-2 focus-within:ring-primary-300 transition-all">
            <Icon className="w-5 h-5 text-stone-400 mr-3" />
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange as any}
                className="w-full outline-none text-stone-700"
                placeholder={placeholder}
                min={min}
            />
        </div>
    </div>
);

const EditPlantPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // URL에서 식물 ID 가져오기
    const navigate = useNavigate();
    const { plants, updatePlant } = usePlants();
    const { uid } = useAuth();

    // 1. 수정할 식물 찾기
    const targetPlant = plants.find(p => p.id === id);

    // 2. 상태 관리 (초기값은 비워두고, useEffect에서 채움)
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [waterCycle, setWaterCycle] = useState(7);
    const [adoptedDate, setAdoptedDate] = useState('');

    // 이미지 관련 상태
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null); // 기존 이미지 주소
    const [isUploading, setIsUploading] = useState(false);

    // 기존 데이터 불러와서 입력창에 채워넣기 (핵심!)
    useEffect(() => {
        if (targetPlant) {
            setName(targetPlant.name);
            setSpecies(targetPlant.species);
            setWaterCycle(targetPlant.waterCycle);
            setAdoptedDate(targetPlant.adoptedDate);
            setCurrentImageUrl(targetPlant.coverImage || null);
            setPreviewUrl(targetPlant.coverImage || null);
        }
    }, [targetPlant]);

    // 파일 선택 핸들러 (압축 포함)
    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
        try {
            const compressedFile = await imageCompression(file, options);
            setSelectedFile(compressedFile);
            setPreviewUrl(URL.createObjectURL(compressedFile));
        } catch (error) {
            console.error("이미지 압축 실패:", error);
            setSelectedFile(file);
        }
    };

    // 저장 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!targetPlant || !uid) return;

        setIsUploading(true);
        let finalImageUrl = currentImageUrl; // 기본값: 기존 이미지 유지

        try {
            // 새 이미지를 선택했다면 업로드 진행
            if (selectedFile) {
                const storageRef = ref(storage, `users/${uid}/plants/${Date.now()}_${selectedFile.name}`);
                const snapshot = await uploadBytes(storageRef, selectedFile);
                finalImageUrl = await getDownloadURL(snapshot.ref);
            }

            // 업데이트할 객체 생성
            const updatedPlant: Plant = {
                ...targetPlant, // id, logs, lastWateredDate 등 기존 정보 유지
                name,
                species,
                waterCycle,
                adoptedDate,
                coverImage: finalImageUrl, // 새 이미지 or 기존 이미지
            };

            // 수정 요청
            await updatePlant(updatedPlant);

            alert("수정되었습니다!");
            navigate(`/plants/${id}`); // 상세 페이지로 돌아가기

        } catch (error) {
            console.error("수정 실패:", error);
            alert("수정 중 오류가 발생했습니다.");
        } finally {
            setIsUploading(false);
        }
    };

    // 식물을 못 찾았을 때 (새로고침 직후 등)
    if (!targetPlant) return <div className="p-10 text-center text-stone-500">데이터를 불러오는 중입니다...</div>;

    return (
        <div className="max-w-xl mx-auto py-6 px-4">
            {/* 헤더 */}
            <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="mr-4 text-stone-500 hover:text-stone-800">
                    <ArrowLeft />
                </button>
                <h1 className="text-2xl font-bold text-stone-800">식물 정보 수정 📝</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-lg border border-stone-100">
                {/* 사진 수정 영역 */}
                <div className="mb-8 flex justify-center">
                    <label className="cursor-pointer group relative">
                        <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

                        {/* 이미지 미리보기 */}
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-stone-100 shadow-inner bg-stone-50 relative">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-stone-300">
                                    <Camera size={32} />
                                </div>
                            )}

                            {/* 호버 시 카메라 아이콘 표시 */}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="text-white" size={24} />
                            </div>
                        </div>
                        <p className="text-center text-xs text-stone-400 mt-2 font-medium group-hover:text-primary-600">사진 변경</p>
                    </label>
                </div>

                <InputField label="이름 (별명)" id="name" value={name} onChange={(e) => setName(e.target.value)} icon={Hash} />
                <InputField label="품종" id="species" value={species} onChange={(e) => setSpecies(e.target.value)} icon={Leaf} />
                <InputField label="물 주기 (일)" id="waterCycle" value={waterCycle} onChange={(e) => setWaterCycle(Number(e.target.value))} type="number" icon={Droplet} min={1} />
                <InputField label="입양일" id="adoptedDate" value={adoptedDate} onChange={(e) => setAdoptedDate(e.target.value)} type="date" icon={Calendar} />

                <div className="flex gap-3 mt-8">
                    <button type="button" onClick={() => navigate(-1)} className="flex-1 py-3 text-stone-500 font-bold bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors">
                        취소
                    </button>
                    <button type="submit" disabled={isUploading} className="flex-1 py-3 text-white font-bold bg-primary-600 rounded-xl hover:bg-primary-700 shadow-md shadow-primary-200 transition-colors flex justify-center items-center">
                        {isUploading ? <Loader2 className="animate-spin" /> : '수정 완료'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPlantPage;