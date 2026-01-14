// src/context/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextType {
    currentUser: User | null;
    isLoading: boolean;
    uid: string | null;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true); // 초기 로딩 시작

    useEffect(() => {
        // Firebase 연결 상태 감지 (앱 켜지자마자 실행됨)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                console.log('✅ 로그인 됨:', user.uid);
            } else {
                setCurrentUser(null);
                console.log('👋 로그아웃 됨');
            }
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    // 구글 로그인 함수
    const loginWithGoogle = async () => {
        try {
            setIsLoading(true); // ⭐ 로그인 시도하면 로딩 켜기! (화면 깜빡임 방지)
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            // 로그인 성공하면 위 useEffect가 감지해서 로딩을 다시 꺼줍니다.
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인에 실패했습니다.');
            setIsLoading(false); // ⭐ 실패해도 로딩은 꺼줘야 함!
        }
    };

    // 로그아웃 함수
    const logout = async () => {
        try {
            setIsLoading(true); // 로그아웃 하는 동안 로딩
            await signOut(auth);
            setCurrentUser(null);
        } catch (error) {
            console.error('로그아웃 실패:', error);
        } finally {
            setIsLoading(false); // 끝나면 로딩 끄기
        }
    };

    const value: AuthContextType = {
        currentUser,
        isLoading,
        uid: currentUser ? currentUser.uid : null,
        loginWithGoogle,
        logout,
    };

    // 로딩 화면
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center flex-col gap-4 bg-main">
                <span className="text animate-bounce">😊</span>
                <p className="text-stone-700 ">로그인 중</p>
            </div>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
