import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { dark, light } from './theme';
const Ctx = createContext(null);
const KEY = 'sl-theme';
export function ThemeProvider({ children }) {
    const system = useColorScheme();
    const [mode, setModeState] = useState('light');
    useEffect(() => {
        AsyncStorage.getItem(KEY).then((saved) => {
            if (saved === 'light' || saved === 'dark' || saved === 'system')
                setModeState(saved);
        });
    }, []);
    const setMode = (next) => {
        setModeState(next);
        AsyncStorage.setItem(KEY, next).catch(() => undefined);
    };
    const isDark = mode === 'dark' || (mode === 'system' && system === 'dark');
    const value = useMemo(() => ({ mode, palette: isDark ? dark : light, setMode, isDark }), [mode, isDark]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useTheme() {
    const ctx = useContext(Ctx);
    if (!ctx)
        throw new Error('useTheme must be used inside ThemeProvider');
    return ctx;
}
