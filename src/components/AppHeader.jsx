import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../ThemeContext';
import { fonts, Icon } from '../ui';

const HeaderContext = createContext(null);

export function HeaderProvider({ children }) {
  const [header, setHeader] = useState(null);
  return <HeaderContext.Provider value={{ header, setHeader }}>{children}</HeaderContext.Provider>;
}

export function useAppHeader(renderHeader, deps) {
  const isFocused = useIsFocused();
  const { setHeader } = useContext(HeaderContext);
  const renderRef = useRef(renderHeader);
  renderRef.current = renderHeader;

  useEffect(() => {
    if (!isFocused) return;
    setHeader(renderRef.current());
  }, [isFocused, setHeader, ...deps]);
}

export function useMainHeader() {
  const navigation = useNavigation();
  const { palette } = useTheme();

  useAppHeader(
    () => (
      <>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: palette.text, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: palette.onAccent, fontFamily: fonts.sansBold, fontSize: 13 }}>SL</Text>
          </View>
          <Text style={{ fontFamily: fonts.sansBold, fontSize: 18, color: palette.text, letterSpacing: -0.3 }}>SiteLedger</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
          <Text style={{ fontSize: 11, color: palette.muted, borderWidth: 1, borderColor: palette.borderStrong, borderRadius: 20, paddingHorizontal: 11, paddingVertical: 6, fontFamily: fonts.sansSemi }}>FY 2026–27</Text>
          <Pressable onPress={() => navigation.navigate('ProfileStack')} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: palette.ink, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontFamily: fonts.sansBold, fontSize: 12 }}>KG</Text>
          </Pressable>
        </View>
      </>
    ),
    [navigation, palette],
  );
}

export function useBackHeader(title) {
  const navigation = useNavigation();
  const { palette } = useTheme();

  useAppHeader(
    () => (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8} style={{ marginRight: 6 }}>
          <Icon name="chevron-left" size={28} color={palette.text} />
        </Pressable>
        <Text numberOfLines={1} style={{ flex: 1, fontFamily: fonts.sansBold, fontSize: 18, color: palette.text, letterSpacing: -0.3 }}>{title}</Text>
      </View>
    ),
    [navigation, palette, title],
  );
}

export function AppHeader() {
  const { header } = useContext(HeaderContext);
  const { palette } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + 8,
        paddingHorizontal: 20,
        paddingBottom: 12,
        backgroundColor: palette.bg,
        borderBottomWidth: 1,
        borderBottomColor: palette.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 5,
        minHeight: insets.top + 52,
      }}
    >
      {header}
    </View>
  );
}
