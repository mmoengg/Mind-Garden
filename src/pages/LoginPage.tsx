// src/pages/LoginPage.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 경로 확인 (../hooks 아님)
import { Loader2 } from 'lucide-react';

const LoginPage: React.FC = () => {
    const { loginWithGoogle, uid, isLoading } = useAuth();
    const navigate = useNavigate();

    // 1. 이미 로그인 된 상태라면? -> 메인으로 튕겨내기
    useEffect(() => {
        if (uid && !isLoading) {
            navigate('/my-plants'); // 로그인 되면 이동할 페이지
        }
    }, [uid, isLoading, navigate]);

    // 2. 구글 로그인 버튼 클릭 핸들러
    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            // 성공하면 위 useEffect가 감지해서 자동으로 이동시킵니다.
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-primary-600"/></div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-stone-100 text-center">

                {/* 로고 영역 */}
                <div className="mb-8">
                    <span className="text-5xl">🌿</span>
                    <h1 className="text-2xl font-bold text-stone-800 mt-4">마음 정원</h1>
                    <p className="text-stone-500 mt-2">나만의 식물 키우기 기록</p>
                </div>

                {/* 구글 로그인 버튼 */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-stone-300 text-stone-700 font-bold py-3 px-4 rounded-xl hover:bg-stone-50 transition-all hover:shadow-md active:scale-95"
                >
                    {/* 구글 G 로고 */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google 계정으로 시작하기
                </button>

                <p className="text-xs text-stone-400 mt-6">
                    로그인 시 서비스 이용약관에 동의하게 됩니다.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;