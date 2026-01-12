import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface ChartData {
    subject: string;
    A: number;
    fullMark: number;
}

interface Props {
    data: ChartData[];
}

const GardenRadarChart: React.FC<Props> = ({ data }) => {
    return (
        <div className="w-full h-full">
            {' '}
            {/* 최소 높이 확보 중요! */}
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    {/* 육각형 격자선 */}
                    <PolarGrid stroke="#e5e7eb" />

                    {/* 축 이름 (성실함, 애정 등) */}
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 600 }} />

                    {/* 점수 축 (눈금은 안 보이게 설정) */}
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />

                    {/* 실제 그래프 영역 */}
                    <Radar
                        name="My Garden"
                        dataKey="A"
                        stroke="#10B981" // 테두리 색 (녹색)
                        fill="#10B981" // 채우기 색
                        fillOpacity={0.4} // 투명도
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GardenRadarChart;
