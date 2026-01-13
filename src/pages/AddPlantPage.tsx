import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlants } from '../hooks/usePlants.ts';
import { useAuth } from '../context/AuthContext.tsx';
import type { Plant } from '../types/Plant';
import { Camera, Calendar, Hash, Leaf, Droplet, Upload, Loader2, type LucideIcon, ArrowLeft } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase.ts';

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
        <label htmlFor={id} className="block font-semibold text-stone-700 mb-2">
            {label}
        </label>
        <div className="flex items-center border border-stone-300 rounded-xl px-3 py-2.5 bg-white focus-within:ring-2 focus-within:ring-primary-300">
            <Icon className="w-5 h-5 text-stone-400 mr-3" />
            {type === 'textarea' ? <textarea id={id} value={value} onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void} rows={3} className="w-full focus:outline-none resize-none" placeholder={placeholder} /> : <input id={id} type={type} value={value} onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void} className="w-full focus:outline-none" placeholder={placeholder} min={min} />}
        </div>
    </div>
);

const AddPlantPage: React.FC = () => {
    const navigate = useNavigate();
    const { addPlant } = usePlants();
    const { uid } = useAuth();

    // 폼 상태 관리
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [description, setDescription] = useState(''); // 설명 필드 추가
    const [waterCycle, setWaterCycle] = useState(7); // 기본값 7일
    const [adoptedDate, setAdoptedDate] = useState(new Date().toISOString().slice(0, 10));

    // 이미지 관련
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // 실제 업로드할 파일
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 화면에 보여줄 미리보기
    const [isUploading, setIsUploading] = useState(false); // 로딩 상태

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 압축 옵션
        const options = {
            maxSizeMB: 1, // 1MB 이하로 제한
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        try {
            console.log(`원본 크기: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

            // 이미지 압축 시도
            const compressedFile = await imageCompression(file, options);

            console.log(`압축 후 크기: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

            setSelectedFile(compressedFile); // 압축된 파일 저장
            setPreviewUrl(URL.createObjectURL(compressedFile)); // 미리보기 생성
        } catch (error) {
            console.error('이미지 압축 실패:', error);
            // 압축 실패 시 원본 사용
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 필수 필드 유효성 검사 (이름, 품종, 물주기)
        if (!name.trim() || !species.trim() || waterCycle <= 0) {
            alert('식물의 이름, 종류, 물 주기 주기는 필수 항목입니다.');
            switch (!name.trim()) {
                case true:
                    document.getElementById('name')?.focus();
                    break;
                case false:
                    switch (!species.trim()) {
                        case true:
                            document.getElementById('species')?.focus();
                            break;
                        case false:
                            if (waterCycle <= 0) {
                                document.getElementById('waterCycle')?.focus();
                            }
                            break;
                    }
                    break;
            }
            return;
        }

        if (!uid) {
            alert('로그인이 필요합니다.');
            return;
        }

        setIsUploading(true); // 로딩 시작 (버튼 비활성화)

        let downloadUrl: string | null = null;

        try {
            // 이미지가 있다면 Firebase Storage에 업로드
            if (selectedFile) {
                // 저장 경로: users/내UID/plants/시간_파일명
                const storageRef = ref(storage, `users/${uid}/plants/${Date.now()}_${selectedFile.name}`);

                // 업로드
                const snapshot = await uploadBytes(storageRef, selectedFile);
                // 다운로드 주소(URL) 받기
                downloadUrl = await getDownloadURL(snapshot.ref);
                console.log('이미지 업로드 완료:', downloadUrl);
            }

            // 새 식물 객체 생성 (URL 포함)
            const newPlant: Plant = {
                id: Date.now().toString(),
                name,
                species,
                adoptedDate,
                waterCycle,
                coverImage: downloadUrl, // ⭐ 여기에 Storage URL이 들어갑니다
                lastWateredDate: adoptedDate,
                logs: [
                    {
                        id: Date.now().toString() + '-init',
                        date: adoptedDate,
                        type: 'note',
                        content: description || '새로운 정원 생활을 시작합니다. 🌱',
                    },
                ],
            };

            // Firestore에 저장 요청
            await addPlant(newPlant);

            alert(`${name}의 정원 생활을 시작합니다!`);
            navigate('/my-plants');
        } catch (error) {
            console.error('등록 중 오류 발생:', error);
            alert('식물 등록에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsUploading(false); // 로딩 끝
        }
    };

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         if (file.size > 1024 * 1024 * 3) { // 3MB 제한 (localStorage 보호를 위해)
    //             alert('파일 크기가 너무 큽니다. 3MB 이하의 이미지를 사용해주세요.');
    //             return;
    //         }
    //
    //         const reader = new FileReader();
    //
    //         // 파일 읽기가 완료되면 Base64 문자열로 저장
    //         reader.onloadend = () => {
    //             setCoverImage(reader.result as string);
    //         };
    //
    //         // 파일을 Base64 데이터 URL 형태로 읽습니다.
    //         reader.readAsDataURL(file);
    //     } else {
    //         setCoverImage('');
    //     }
    // };

    return (
        <div className="w-full h-full p-4 pb-20 lg:pb-0 overflow-y-auto no-scrollbar">
            {/* 상단 제목 */}
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => navigate(-1)} className="flex items-center text-stone-500 ">
                    <ArrowLeft size={14} className="mr-1" />
                    <span className="text-sm">돌아가기</span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 bg-white/50 border border-white rounded-3xl shadow-sm overflow-hidden">
                {/* 기본 정보 */}
                <InputField label="별명 (필수)" id="name" value={name} onChange={(e) => setName(e.target.value)} icon={Hash} placeholder="예: 몬몬이, 초록이" />

                <InputField label="종류/품종 (필수)" id="species" value={species} onChange={(e) => setSpecies(e.target.value)} icon={Leaf} placeholder="예: 몬스테라, 스투키, 산세베리아" />

                {/* 관리 정보 */}
                <InputField label="물 주기 주기 (일 단위, 필수)" id="waterCycle" value={waterCycle} onChange={(e) => setWaterCycle(parseInt(e.target.value) || 0)} type="number" icon={Droplet} min={1} />

                <InputField label="입양일 (선택)" id="adoptedDate" value={adoptedDate} onChange={(e) => setAdoptedDate(e.target.value)} type="date" icon={Calendar} />

                {/* 사진 및 메모 */}
                <div className="mb-6">
                    <label className="block font-semibold text-stone-700 mb-2">대표 사진 등록 (선택)</label>
                    <div className="flex flex-col items-center border border-stone-300 rounded-xl px-3 py-2.5 bg-white">
                        {/* 숨겨진 파일 인풋 + 커스텀 버튼 */}
                        <label className="w-full cursor-pointer">
                            <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                            {previewUrl ? (
                                <div className="w-full h-48 rounded-lg overflow-hidden border border-primary-200 relative group">
                                    <img src={previewUrl} alt="미리보기" className="w-full h-full object-cover" />
                                    {/* 호버 시 변경 안내 */}
                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-white font-bold flex items-center gap-2">
                                            <Camera size={20} /> 사진 변경하기
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-stone-400 hover:text-primary-600 transition-colors">
                                    <Upload size={32} className="mb-2" />
                                    <p className="text-sm">클릭하여 식물 사진 업로드</p>
                                </div>
                            )}
                        </label>
                    </div>
                </div>

                <InputField label="식물 설명/입양 메모 (선택)" id="description" value={description} onChange={(e) => setDescription(e.target.value)} icon={Hash} type="textarea" placeholder="어디서 왔는지, 특별한 특징이 있는지 기록해 보세요." />

                {/* 등록 버튼 */}
                <div className="flex gap-3 mt-8">
                    <button type="button" onClick={() => navigate(-1)} className="flex-1 py-3 text-stone-500 font-bold bg-stone-200 rounded-full hover:bg-stone-300 transition-colors">
                        취소
                    </button>
                    <button type="submit" disabled={isUploading} className="flex-1 py-3 text-white font-bold bg-primary-600 rounded-full hover:bg-primary-700 transition-colors flex justify-center items-center">
                        {isUploading ? <Loader2 className="animate-spin" /> : '등록 완료'}
                    </button>
                </div>
                {/*<button*/}
                {/*    type="submit"*/}
                {/*    disabled={isUploading}*/}
                {/*    className={`w-full font-bold py-3 rounded-full transition-colors mt-6 flex justify-center items-center gap-2*/}
                {/*        ${isUploading ? 'bg-stone-300 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'}`}*/}
                {/*>*/}
                {/*    {isUploading ? (*/}
                {/*        <>*/}
                {/*            <Loader2 className="animate-spin" /> 저장 중...*/}
                {/*        </>*/}
                {/*    ) : (*/}
                {/*        '등록 완료'*/}
                {/*    )}*/}
                {/*</button>*/}
            </form>

            {/*<button onClick={() => navigate(-1)} className="mt-4 w-full text-stone-500 hover:text-stone-700 py-2">*/}
            {/*    취소하고 돌아가기*/}
            {/*</button>*/}
        </div>
    );
};

export default AddPlantPage;
