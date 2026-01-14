import React, { useMemo, useEffect, useState, type ReactNode } from 'react';
import {
    // getFirestore,
    collection,
    where,
    doc,
    setDoc,
    updateDoc,
    onSnapshot,
    query,
    arrayUnion,
} from 'firebase/firestore';
import { db } from '../firebase.ts';
import { useAuth } from './AuthContext.tsx';
import type { Plant, Mood, CareLog } from '../types/Plant';
import { PlantContext, type PlantContextType } from './plantContext.ts';

interface PlantProviderProps {
    children: ReactNode;
}

export const PlantProvider: React.FC<PlantProviderProps> = ({ children }) => {
    // 인증 정보 접근 (인증 로딩 상태도 가져옴)
    const { uid, isLoading: authLoading } = useAuth();

    const [plants, setPlants] = useState<Plant[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(true);

    useEffect(() => {
        // 인증이 안되었거나 UID가 없으면 중단
        if (authLoading || !uid) {
            setPlants([]);
            return;
        }

        setIsDataLoading(true);

        // 데이터 구조: users -> [UID] -> plants -> [식물ID]
        // 해당 사용자의 'plants' 컬렉션 구독
        const q = query(collection(db, 'users', uid, 'plants'), where('delYn', '==', 'N'));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const fetchedPlants: Plant[] = [];
                snapshot.forEach((doc) => {
                    fetchedPlants.push(doc.data() as Plant);
                });

                // 데이터 정렬 (예: 등록순, 필요 시 sort 추가)
                fetchedPlants.sort((a, b) => Number(a.id) - Number(b.id));

                setPlants(fetchedPlants);
                setIsDataLoading(false);
                console.log('🔥 Firestore 데이터 동기화 완료:', fetchedPlants.length, '개');
            },
            (error) => {
                console.error('Firestore 구독 에러:', error);
                setIsDataLoading(false);
            }
        );

        // 컴포넌트가 꺼질 때 구독 해제 (메모리 누수 방지)
        return () => unsubscribe();
    }, [uid, authLoading]);

    // 데이터 변경 함수 정의 (CRUD)
    const addPlant = async (newPlant: Plant): Promise<boolean> => {
        if (!uid) {
            console.error('❌ 로그인이 되어있지 않아 저장할 수 없습니다.');
            return false;
        }

        try {
            const plantRef = doc(db, 'users', uid, 'plants', newPlant.id);
            await setDoc(plantRef, newPlant);
            console.log('✅ 식물 등록 성공:', newPlant.name);
            return true; // 성공 시 true 반환
        } catch (error) {
            console.error('❌ 식물 등록 실패 원인:', error);
            // 여기서 alert를 띄우지 않고, false만 반환하여 페이지에서 처리하도록 함
            return false;
        }
    };

    const deleteDocPlant = async (id: string) => {
        // 로그인 체크
        if (!uid) {
            alert('로그인이 필요한 기능입니다.');
            return;
        }

        // 삭제 확인 (실수 방지)
        if (!window.confirm('정말로 삭제하시겠습니까? \n삭제된 식물은 복구할 수 없습니다.')) {
            return;
        }

        try {
            // delYn 플래그 삭제
            const plantDocRef = doc(db, 'users', uid, 'plants', id);
            await updateDoc(plantDocRef, { delYn: 'Y' });
            // await deleteDoc(plantDocRef);

            console.log('🗑️ 식물 삭제 완료:', id);
        } catch (error) {
            console.error('삭제 중 오류 발생:', error);
            alert('삭제에 실패했습니다. 다시 시도해주세요.');
        }
    };

    // 물 주기
    const waterPlant = async (plantId: string) => {
        if (!uid) return;

        try {
            const plantRef = doc(db, 'users', uid, 'plants', plantId);
            const today = new Date().toISOString().slice(0, 10); // "2024-05-20" 형식

            // Firestore 업데이트 (날짜 갱신 + 로그 추가)
            await updateDoc(plantRef, {
                lastWateredDate: today,
                logs: arrayUnion({
                    id: Date.now().toString(), // 유니크한 ID
                    date: today,
                    type: 'water', // 타입: 물 주기
                    content: '시원하게 물을 주었어요! 💧',
                }),
            });

            console.log('💧 물 주기 완료!');
        } catch (error) {
            console.error('물 주기 실패:', error);
            alert('오류가 발생했습니다.');
        }
    };

    // 수정
    const updatePlant = async (updatedPlant: Plant) => {
        if (!uid) return;

        try {
            const plantRef = doc(db, 'users', uid, 'plants', updatedPlant.id);
            // 전체 필드 업데이트
            await updateDoc(plantRef, { ...updatedPlant });
            console.log('식물 정보 수정 완료!');
        } catch (error) {
            console.error('수정 실패:', error);
            alert('정보 수정 중 오류가 발생했습니다.');
        }
    };

    const recordWatering = async (plantId: string, mood: Mood, content?: string) => {
        if (!uid) return;
        const today = new Date().toISOString().slice(0, 10);

        const newLog: CareLog = {
            id: Date.now().toString(),
            date: today,
            type: 'water',
            mood: mood,
            content: content,
        };

        try {
            const plantRef = doc(db, 'users', uid, 'plants', plantId);

            // updateDoc을 사용하여 특정 필드만 업데이트
            // arrayUnion: 배열에 요소를 추가하는 Firestore 전용 함수
            await updateDoc(plantRef, {
                lastWateredDate: today,
                logs: arrayUnion(newLog),
            });
            console.log('💧 물 주기 기록 성공');
        } catch (error) {
            console.error('물 주기 기록 실패:', error);
        }
    };

    // Context에 전달할 최종 value 정의
    const value: PlantContextType = useMemo(
        () => ({
            plants,
            addPlant,
            deletePlant: deleteDocPlant, // 이름 매핑,
            waterPlant,
            updatePlant,
            recordWatering,
            isLoading: authLoading || isDataLoading, // 인증 로딩 + 데이터 로딩
        }),
        [plants, authLoading, isDataLoading, uid]
    ); // uid 의존성 추가

    // Context Provider에 value 전달
    return <PlantContext.Provider value={value}>{children}</PlantContext.Provider>;
};
