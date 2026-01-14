import React, { useMemo } from 'react';
import type { CareLog, Mood } from '../../types/Plant';
import { Droplet, PenTool, Zap, Smile, Cloud, Heart, Frown, type LucideIcon, Leaf } from 'lucide-react';
import clsx from 'clsx';

interface TimelineLogProps {
    log: CareLog;
}

// 감정 아이콘, 색상, 배경 매핑 (배경색 추가)
const moodMap: Record<NonNullable<Mood>, { icon: LucideIcon; color: string; bgColor: string }> = {
    happy: { icon: Heart, color: 'text-red-500', bgColor: 'bg-red-50' }, // 기쁨은 활력의 빨간색 계열
    calm: { icon: Smile, color: 'text-primary-600', bgColor: 'bg-primary-50' }, // 평온은 메인 녹색 계열
    tired: { icon: Cloud, color: 'text-stone-500', bgColor: 'bg-stone-100' },
    sad: { icon: Frown, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    angry: { icon: Zap, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
};

const TimelineLog: React.FC<TimelineLogProps> = ({ log }) => {
    // 로그 타입별 아이콘 설정 (재사용성을 위해 useMemo 사용)
    const logDetails = useMemo(() => {
        switch (log.type) {
            case 'water':
                return { icon: Droplet, text: '물 주기 완료', color: 'bg-blue-500' };
            case 'repot':
                return { icon: Leaf, text: '분갈이 기록', color: 'bg-amber-600' };
            case 'prune':
                return { icon: PenTool, text: '가지치기', color: 'bg-purple-500' };
            case 'note':
            default:
                return { icon: PenTool, text: '일반 기록', color: 'bg-stone-500' };
        }
    }, [log.type]);

    const MoodIcon = log.mood ? moodMap[log.mood].icon : null;
    const moodBgColor = log.mood ? moodMap[log.mood].bgColor : 'bg-white';

    return (
        <div className="relative border-l-2 border-stone-200 pl-8 pb-8">
            {/* 타임라인 원형 마커 */}
            <div
                className={clsx(
                    'absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-sm',
                    logDetails.color // 로그 타입별 색상 적용
                )}
            >
                {React.createElement(logDetails.icon, { size: 12 })}
            </div>

            {/* 로그 내용 박스: 감정 배경색 적용 */}
            <div
                className={clsx(
                    'bg-surface p-4 rounded-xl shadow-sm transition-all hover:shadow-sm border',
                    moodBgColor, // 감정 배경색 적용
                    log.mood ? 'border-primary-100' : 'border-stone-100'
                )}
            >
                <div className="flex justify-between items-center mb-3 border-b border-stone-100 pb-2">
                    <span className="text-sm font-semibold text-stone-600">{log.date}</span>

                    {/* 감정 기록 표시 (뱃지 디자인 강화) */}
                    {log.mood && MoodIcon && (
                        <div
                            className={clsx(
                                'flex items-center text-xs font-medium px-2 py-1 rounded-full border',
                                moodMap[log.mood].bgColor.replace('bg', 'border') // 배경색과 비슷한 테두리
                            )}
                        >
                            {React.createElement(MoodIcon, { size: 14, className: moodMap[log.mood].color })}
                            <span className="ml-1 text-stone-700 capitalize">{log.mood}</span>
                        </div>
                    )}
                </div>

                {/* 사진 기록 (사진이 있으면 크게 표시) */}
                {log.photoUrl && (
                    <div className="w-full h-40 rounded-lg overflow-hidden mb-3 bg-stone-100 shadow-inner">
                        <img src={log.photoUrl} alt="기록 사진" className="w-full h-full object-cover" />
                    </div>
                )}

                {/* 메모 내용 */}
                {log.content && <p className="text-stone-700 whitespace-pre-wrap mb-2">{log.content}</p>}

                {/* 로그 타입 표시 */}
                <span
                    className={clsx(
                        'mt-1 inline-block text-xs font-bold uppercase',
                        logDetails.color.replace('bg', 'text') // 로그 타입 색상 적용
                    )}
                >
                    {logDetails.text}
                </span>
            </div>
        </div>
    );
};

export default TimelineLog;
