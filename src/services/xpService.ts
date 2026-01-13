// src/services/xpService.ts
import { doc, getDoc, setDoc, increment, FieldValue } from 'firebase/firestore';
import { db } from '../firebase.ts';

export const addXP = async (userId: string, amount: number) => {
    if (!userId) {
        console.error('[addXP] ❌ 유저 ID가 없습니다! 함수를 종료합니다.');
        return;
    }

    try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const updateData = {
                currentXP: increment(amount),
                lastUpdated: new Date(),
            } as { currentXP: FieldValue; lastUpdated: Date };

            await setDoc(userRef, updateData, { merge: true });
            console.log(`[addXP] ✅ 기존 유저 경험치 업데이트 완료! (+${amount})`);
        } else {
            await setDoc(userRef, {
                currentXP: amount,
                level: 1,
                title: '새싹 정원사 🌱',
                lastUpdated: new Date(),
            });

            console.log(`[addXP] ✨ 새로운 유저 문서 생성 완료! (첫 경험치: ${amount})`);
        }
    } catch (error) {
        console.error('[addXP] 🔥 에러 발생:', error);
    }
};
