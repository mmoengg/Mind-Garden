import React from 'react';
import type { CareLog, Mood } from '../types/Plant';
import {Droplet, PenTool, Zap, Smile, Cloud, Heart, Frown, Calendar, type LucideIcon} from 'lucide-react';
import clsx from 'clsx';

interface TimelineLogProps {
    log: CareLog;
}

// 감정 아이콘 및 색상 매핑
const moodMap: Record<Mood, { icon: LucideIcon; color: string }> = {
    happy: { icon: Heart, color: 'text-red-500' },
    calm: { icon: Smile, color: 'text-primary-600' },
    tired: { icon: Cloud, color: 'text-stone-500' },
    sad: { icon: Frown, color: 'text-blue-500' },
    angry: { icon: Zap, color: 'text-yellow-600' },
};

const TimelineLog: React.FC<TimelineLogProps> = ({ log }) => {
    // 로그 타입별 아이콘 설정
    const LogIcon = log.type === 'water' ? Droplet : log.type === 'note' ? PenTool : Calendar;
    // const iconColor = log.type === 'water' ? 'text-blue-500' : 'text-stone-500';

    return (
        <div className="relative border-l-2 border-stone-200 pl-8 pb-8">

            {/* 타임라인 원형 마커 */}
            <div className={clsx(
                "absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center text-white",
                log.type === 'water' ? 'bg-blue-500' : 'bg-stone-400'
            )}>
                <LogIcon size={12} />
            </div>

            {/* 로그 내용 박스 */}
            <div className="bg-surface p-4 rounded-xl shadow-md transition-all hover:shadow-lg border border-stone-100">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-stone-600">{log.date}</span>

                    {/* 감정 기록 표시 */}
                    {log.mood && (
                        <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full bg-stone-50 border border-stone-200">
                            {React.createElement(moodMap[log.mood].icon, { size: 14, className: moodMap[log.mood].color })}
                            <span className="ml-1 text-stone-600 capitalize">{log.mood}</span>
                        </div>
                    )}
                </div>

                {/* 1. 사진 기록 */}
                {log.photoUrl && (
                    <div className="w-full h-32 rounded-lg overflow-hidden mb-3 bg-stone-100">
                        <img src={log.photoUrl} alt="기록 사진" className="w-full h-full object-cover" />
                    </div>
                )}

                {/* 2. 메모 내용 */}
                {log.content && (
                    <p className="text-stone-700 whitespace-pre-wrap">{log.content}</p>
                )}

                {/* 물 주기/노트 타입 표시 */}
                <span className="mt-3 inline-block text-xs font-bold uppercase text-stone-400">
                    {log.type === 'water' ? '물 주기 완료' : log.type === 'repot' ? '분갈이' : log.type === 'note' ? '일반 기록' : '관리 활동'}
                </span>
            </div>
        </div>
    );
};

export default TimelineLog;