import { useState, useEffect } from 'react';

/**
 * 로컬 스토리지에 값을 저장하고 읽어오는 커스텀 훅
 * @param key 로컬 스토리지에 저장될 키
 * @param initialValue 초기 값
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {

    // 초기 상태 설정: 로컬 스토리지에서 기존 값을 읽어옵니다.
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // 브라우저 환경이 아닐 경우(SSR) 예외 처리
            if (typeof window === 'undefined') {
                return initialValue;
            }

            // 로컬 스토리지에서 키에 해당하는 값을 가져옵니다.
            const item = window.localStorage.getItem(key);

            // 값이 있으면 JSON.parse를 통해 객체로 변환하여 사용
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // 에러 발생 시 초기 값 사용
            console.error('Error reading from localStorage:', error);
            return initialValue;
        }
    });

    // 값 변경 시 로컬 스토리지에 저장하는 useEffect
    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                // 새로운 값을 JSON 문자열로 변환합니다.
                const valueToStore = storedValue;

                // 로컬 스토리지에 저장합니다.
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }, [key, storedValue]); // 키와 저장된 값이 변경될 때마다 실행

    // 상태와 setter 함수를 반환
    return [storedValue, setStoredValue];
}

export default useLocalStorage;