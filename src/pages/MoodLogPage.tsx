import React from 'react';
import { useMoodAnalysis } from '../hooks/useMoodAnalysis.ts';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Cloud } from 'lucide-react';

const MoodLogPage: React.FC = () => {
    const { moodCounts, totalLogs } = useMoodAnalysis();

    if (totalLogs === 0) {
        return (
            <div className="p-12 text-center bg-surface rounded-3xl shadow-lg">
                <Cloud size={48} className="mx-auto text-stone-400 mb-4" />
                <h2 className="text-xl font-semibold text-stone-600">아직 기록된 마음 날씨가 없어요.</h2>
                <p className="text-stone-500 mt-2">물을 주며 감정을 기록하면 여기에 그래프가 나타납니다.</p>
            </div>
        );
    }

    // Pie Chart에 표시될 데이터와 Label을 커스텀하는 컴포넌트
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-2 border border-stone-300 rounded-lg shadow-md text-sm">
                    <p className="font-bold" style={{ color: data.color }}>{data.mood}</p>
                    <p>기록 횟수: {data.count}회</p>
                    <p>비율: {(data.percent * 100).toFixed(1)}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-extrabold text-primary-800 mb-2 flex items-center">
                <Cloud size={32} className="mr-2 fill-primary-200 text-primary-600" />
                마음 기록 분석
            </h1>
            <p className="text-stone-500 mb-8">내가 식물을 돌보던 기간 동안 기록한 감정의 분포입니다.</p>

            <div className="bg-surface p-6 rounded-3xl shadow-xl border border-stone-100">
                <h3 className="text-xl font-semibold mb-6">총 기록 {totalLogs}개 중 감정 빈도</h3>

                {/* 📊 파이 차트 영역 */}
                <div className="h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={moodCounts}
                                dataKey="count"
                                nameKey="mood"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                labelLine={false}
                            >
                                {moodCounts.map((entry, index) => (
                                    // 정의한 커스텀 색상을 Cell에 적용
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* 분석 텍스트 (추후 추가) */}
                <div className="mt-8 pt-4 border-t border-stone-100 text-sm text-stone-600">
                    <p className="font-semibold mb-2">총평:</p>
                    <p>가장 높은 비중을 차지한 감정은 **{moodCounts[0]?.mood}** ({moodCounts[0]?.count}회) 입니다.
                        부정적인 감정(Sad, Angry)의 기록도 당신의 정원을 자라게 하는 밑거름이 되었습니다. 🌱</p>
                </div>
            </div>
        </div>
    );
};

export default MoodLogPage;