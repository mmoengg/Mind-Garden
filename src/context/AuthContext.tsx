import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { signInAnonymously, type User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.ts'; // 이전에 정의한 auth 객체 임포트

// Context 타입 정의
interface AuthContextType {
    currentUser: User | null;
    isLoading: boolean;
    uid: string | null; // 사용자 데이터 분리에 사용할 UID
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider 컴포넌트
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Firebase 인증 상태 변경 구독
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // 사용자가 존재하면 상태 업데이트
                setCurrentUser(user);
                setIsLoading(false);
                console.log("✅ 기존 로그인 유저 감지됨:", user.uid);
            } else {
                // 사용자가 없거나 로그아웃 상태일 때 익명 로그인 시도
                signInAnonymously(auth)
                    .then((credentials) => {
                        console.log("Anonymous user signed in:", credentials.user.uid);
                        setCurrentUser(credentials.user);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        console.error("Anonymous sign-in failed:", error);
                        setIsLoading(false);
                    });
            }
        });

        // 컴포넌트 unmount 시 구독 해제 (클린업)
        return unsubscribe;
    }, []);

    const value: AuthContextType = {
        currentUser,
        isLoading,
        uid: currentUser ? currentUser.uid : null,
    };

    // 로딩 중일 때 로딩 UI 표시 (선택 사항)
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <p className="text-xl text-primary-600">정원을 불러오는 중...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// 사용자 정의 훅
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        return {
            currentUser: null,
            isLoading: true,
            uid: null
        } as AuthContextType;
    }
    return context;
};