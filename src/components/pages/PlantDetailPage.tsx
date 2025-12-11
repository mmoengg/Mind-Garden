import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Droplet, Calendar, Hash, ArrowLeft } from 'lucide-react';
import { usePlants } from '../hooks/usePlants';
import { formatDDay, getDDay } from '../utils/date';
import TimelineLog from '../pages/TimelineLog';

const PlantDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // URL에서 ID 가져오기
    const navigate = useNavigate();
    const { plants } = usePlants();

    // ID에 맞는 식물 찾기
    const plant = plants.find(p => p.id === id);

    if (!plant) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-3xl text-red-500 mb-4">식물을 찾을 수 없습니다.</h1>
                <button onClick={() => navigate(-1)} className="text-primary-600 hover:underline">
                    이전 페이지로 돌아가기
                </button>
            </div>
        );
    }

    // D-Day 및 상태 계산
    const dDay = getDDay(plant.lastWateredDate, plant.waterCycle);
    const dDayStatus = formatDDay(dDay);
    const isThirsty = dDay >= 0;

    return (
        <div className="max-w-4xl mx-auto py-8">
            {/* 상단 액션 및 제목 */}
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => navigate(-1)} className="flex items-center text-stone-500 hover:text-primary-600 transition-colors">
                    <ArrowLeft size={20} className="mr-1" />
                    <span className="text-sm">나의 정원으로</span>
                </button>
                {/* 추후 여기에 수정/삭제 버튼 추가 */}
            </div>

            {/* 식물 정보 개요 */}
            <div className="bg-surface p-6 rounded-3xl shadow-lg mb-8 border border-stone-100">
                <div className="flex items-start gap-6">
                    {/* 대표 사진 영역 */}
                    <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-stone-100">
                        {plant.coverImage ? (
                            <img src={plant.coverImage} alt={plant.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-4xl text-stone-400">🌿</div>
                        )}
                    </div>

                    {/* 기본 정보 */}
                    <div>
                        <h1 className="text-4xl font-extrabold text-primary-800">{plant.name}</h1>
                        <p className="text-lg text-stone-500 mb-4">{plant.species}</p>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                            <span className="flex items-center text-stone-600"><Droplet size={16} className="mr-1 text-blue-400" /> 물주기 주기: {plant.waterCycle}일</span>
                            <span className="flex items-center text-stone-600"><Calendar size={16} className="mr-1 text-green-400" /> 입양일: {plant.adoptedDate}</span>
                            <span className="flex items-center text-stone-600">
                                <Hash size={16} className="mr-1 text-amber-400" />
                                <span className={isThirsty ? "text-red-500 font-bold" : "text-primary-600 font-bold"}>
                                    다음 물 주기: {dDayStatus}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 성장 타임라인 / 기록 영역 (핵심) */}
            <h2 className="text-2xl font-bold text-primary-700 mb-6 border-b pb-2">🌱 성장 타임라인</h2>

            <div className="space-y-8">
                {/* 로그를 최신순으로 정렬하여 표시 */}
                {plant.logs.slice().reverse().map(log => (
                    <TimelineLog key={log.id} log={log} />
                ))}

                {/* 등록 시작점 표시 */}
                <div className="flex items-center text-stone-400 pt-4">
                    <Calendar size={20} className="mr-2" />
                    <p className="font-semibold">마음 정원 생활 시작 ({plant.adoptedDate})</p>
                </div>
            </div>

        </div>
    );
};

export default PlantDetailPage;