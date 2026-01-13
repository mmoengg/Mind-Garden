// src/hooks/useUserLevel.ts
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.ts'; // 설정 파일 경로 확인
import { useAuth } from '../context/AuthContext.tsx';

export const useUserLevel = () => {
    const { currentUser } = useAuth(); // 로그인한 유저 정보
    const [currentXP, setCurrentXP] = useState(0); // 경험치 상태 (기본 0)
    const [loading, setLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        // 로그인이 안 되어 있으면 중단
        if (!currentUser) {
            setLoading(false);
            return;
        }

        // 실시간 감시 시작 (onSnapshot)
        const userDocRef = doc(db, 'users', currentUser.uid);

        const unsubscribe = onSnapshot(
            userDocRef,
            (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    // DB에 있는 currentXP 값을 가져오거나, 없으면 0으로 설정
                    setCurrentXP(data.currentXP || 0);
                } else {
                    // 유저 문서가 아직 없으면 (첫 가입 직후 등)
                    setCurrentXP(0);
                }
                setLoading(false);
            },
            (error) => {
                console.error('레벨 정보 가져오기 실패:', error);
                setLoading(false);
            }
        );

        // 청소하기 (컴포넌트가 사라질 때 감시 중단)
        return () => unsubscribe();
    }, [currentUser]); // user가 바뀔 때마다 다시 실행

    return { currentXP, loading };
};
