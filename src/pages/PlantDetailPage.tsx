// src/pages/PlantDetailPage.tsx

import React from 'react'; // useEffect 삭제 (불필요)
import { useParams, useNavigate } from 'react-router-dom';
import {Droplet, Calendar, Hash, ArrowLeft, Trash2, Edit} from 'lucide-react';
import { usePlants } from '../hooks/usePlants.ts';
import { formatDDay, getDDay } from '../utils/date.ts';
import TimelineLog from '../components/plant/TimelineLog.tsx';

const PlantDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { plants, deletePlant, waterPlant } = usePlants();

    // ID에 맞는 식물 찾기 (Context가 업데이트되면 자동으로 다시 계산됨)
    const plant = plants.find(p => p.id === id);

    // 식물이 없을 때 (삭제 직후거나 주소가 잘못되었을 때)
    if (!plant) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-stone-50">
                <h1 className="text-2xl font-bold text-stone-400 mb-4">식물을 찾을 수 없습니다.</h1>
                <button onClick={() => navigate('/my-plants')} className="text-primary-600 hover:underline font-bold">
                    나의 정원으로 돌아가기
                </button>
            </div>
        );
    }

    // D-Day 및 상태 계산
    const dDay = getDDay(plant.lastWateredDate, plant.waterCycle);
    const dDayStatus = formatDDay(dDay);
    const isThirsty = dDay >= 0;


    // 물 주기 핸들러
    const handleWater = async () => {
        if (!plant) return;
        if (window.confirm("식물에게 물을 주시겠어요? 💧")) {
            await waterPlant(plant.id);
            // alert("식물이 기뻐합니다! 🌱"); // 선택 사항
        }
    };

    // 삭제 핸들러
    const handleDelete = async () => {
        if (!plant) return;

        // deletePlant 내부에서 window.confirm을 수행한다고 가정
        // (만약 Provider에 confirm이 없다면 여기서 if (!window.confirm(...)) return; 추가)

        await deletePlant(plant.id);
        navigate('/my-plants'); // 삭제 후 목록으로 이동
    };

    // (useEffect 삭제함 - plants가 바뀌면 알아서 리렌더링 됩니다)

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            {/* 상단 액션 및 제목 */}
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-stone-500 hover:text-stone-800 transition-colors p-2 rounded-lg hover:bg-stone-100"
                >
                    <ArrowLeft size={20} className="mr-1" />
                    <span className="font-semibold">돌아가기</span>
                </button>

                <div className="flex items-center gap-2">
                    {/* 수정 버튼 */}
                    <button
                        className="flex items-center gap-1 text-stone-400 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                        title="식물 수정하기"
                        onClick={() => navigate(`/plants/${id}/edit`)}>
                        <Edit size={18} />
                        <span className="text-sm font-medium">수정</span>
                    </button>

                    {/* 삭제 버튼 */}
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-1 text-stone-400 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                        title="식물 삭제하기"
                    >
                        <Trash2 size={18} />
                        <span className="text-sm font-medium">삭제</span>
                    </button>
                </div>
            </div>

            {/* 식물 정보 개요 */}
            <div className="bg-white p-6 rounded-3xl shadow-xl mb-8 border border-stone-100">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* 대표 사진 영역 */}
                    <div className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 rounded-2xl overflow-hidden bg-stone-100 shadow-inner border border-stone-100">
                        {plant.coverImage ? (
                            <img src={plant.coverImage} alt={plant.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-6xl opacity-50">🌿</div>
                        )}
                    </div>

                    {/* 기본 정보 */}
                    <div className="relative w-full text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-stone-800 mb-2">{plant.name}</h1>
                        <p className="text-lg text-primary-600 font-medium mb-6 bg-primary-50 inline-block px-3 py-1 rounded-lg">
                            {plant.species}
                        </p>

                        {/* 물주기 버튼 */}
                        <p className="flex w-full items-center justify-center mb-6 md:absolute top-4 right-4 md:w-auto">
                            <button
                                onClick={handleWater}
                                className=" bg-white/90 backdrop-blur-sm text-blue-500 hover:bg-blue-50 hover:text-blue-600 px-4 py-2 flex items-center gap-2 rounded-full shadow-sm transition-all font-bold text-sm border border-blue-100 z-10"
                                title="물 주기"
                            >
                                <Droplet size={18} className={isThirsty ? "animate-bounce" : ""} />
                                <span>물 주기</span>
                            </button>
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm bg-stone-50 p-4 rounded-xl">
                            <span className="flex items-center text-stone-600">
                                <Droplet size={18} className="mr-2 text-blue-500" />
                                물주기: <b className="ml-1">{plant.waterCycle}일마다</b>
                            </span>
                            <span className="flex items-center text-stone-600">
                                <Calendar size={18} className="mr-2 text-green-500" />
                                입양일: <b className="ml-1">{plant.adoptedDate}</b>
                            </span>
                            <span className="flex items-center text-stone-600 col-span-1 sm:col-span-2 border-t border-stone-200 pt-3 mt-1">
                                <Hash size={18} className="mr-2 text-amber-500" />
                                상태:
                                <span className={`ml-2 font-bold px-2 py-0.5 rounded ${isThirsty ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                                    {dDayStatus}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 성장 타임라인 / 기록 영역 */}
            <div className="flex items-center gap-3 mb-6 border-b border-stone-200 pb-4">
                <h2 className="text-2xl font-bold text-stone-800">🌱 성장 기록</h2>
                <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-1 rounded-full">
                    {plant.logs.length}개의 기록
                </span>
            </div>

            <div className="space-y-6 relative pl-4 sm:pl-0">
                {/* 로그를 최신순으로 정렬하여 표시 */}
                {plant.logs.length > 0 ? (
                    [...plant.logs].reverse().map(log => (
                        <TimelineLog key={log.id} log={log} />
                    ))
                ) : (
                    <div className="text-center py-10 text-stone-400 bg-stone-50 rounded-2xl border-dashed border-2 border-stone-200">
                        아직 기록이 없어요. 첫 물주기를 기록해보세요! 💧
                    </div>
                )}

                {/* 등록 시작점 표시 */}
                <div className="flex items-center justify-center text-stone-400 pt-8 opacity-60">
                    <Calendar size={16} className="mr-2" />
                    <p className="text-sm font-medium">마음 정원 생활 시작 ({plant.adoptedDate})</p>
                </div>
            </div>

        </div>
    );
};

export default PlantDetailPage;