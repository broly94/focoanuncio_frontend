// hooks/useLocalStorage.ts
'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(initialValue);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key);
			setStoredValue(item ? JSON.parse(item) : initialValue);
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error);
			setStoredValue(initialValue);
		} finally {
			setIsLoaded(true);
		}
	}, [key, initialValue]);

	const setValue = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(`Error setting localStorage key "${key}":`, error);
		}
	};

	return [storedValue, setValue, isLoaded] as const;
}
