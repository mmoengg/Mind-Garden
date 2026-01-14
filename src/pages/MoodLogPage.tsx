import React from 'react';
import { useMoodAnalysis } from '../hooks/useMoodAnalysis.ts';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const MoodLogPage: React.FC = () => {
    const { moodCounts, totalLogs } = useMoodAnalysis();

    if (totalLogs === 0) {
        return (
            <div className="overflow-y-auto no-scrollbar relative pt-20 p-4 pb-20 lg:pt-28 lg:pb-4 w-full h-full ">
                <h2 className="font-bold text-stone-600">아직 기록된 마음 날씨가 없어요.</h2>
                <p className="text-sm text-stone-500 mt-2">물을 주며 감정을 기록하면 여기에 그래프가 나타납니다.</p>
            </div>
        );
    }

    // Pie Chart에 표시될 데이터와 Label을 커스텀하는 컴포넌트
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-2 border border-stone-300 rounded-lg shadow-md text-sm">
                    <p className="font-bold" style={{ color: data.color }}>
                        {data.mood}
                    </p>
                    <p>기록 횟수: {data.count}회</p>
                    <p>비율: {(data.percent * 100).toFixed(1)}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="overflow-y-auto no-scrollbar relative pt-20 p-4 pb-20 lg:pt-28 lg:pb-4 w-full h-full ">
            <header className="absolute top-3 flex justify-between items-center w-[calc(100%-40px)] h-11">
                <h2 className="text-xl font-bold">마음 기록</h2>
            </header>
            <div className="flex flex-col items-center gap-4 flex-1 h-full p-3 lg:p-5 bg-white/50 border border-white rounded-3xl shadow-sm overflow-hidden">
                <h3 className="font-bold">총 기록 {totalLogs}개 중 감정 빈도</h3>

                {/* 파이 차트 영역 */}
                <div className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={moodCounts} dataKey="count" nameKey="mood" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" labelLine={false}>
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

                {/* 분석 텍스트 */}
                <div className="text-stone-600">
                    <p className="font-bold mb-2">총평:</p>
                    <p>
                        가장 높은 비중을 차지한 감정은 **{moodCounts[0]?.mood}** ({moodCounts[0]?.count}회) 입니다. 부정적인 감정(Sad, Angry)의 기록도 당신의 정원을 자라게 하는 밑거름이 되었습니다. 🌱
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MoodLogPage;
