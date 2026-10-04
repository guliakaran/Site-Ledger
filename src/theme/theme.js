import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper';

export const fontFamilies = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
};

function buildMd3Fonts(baseFonts) {
  const mapped = {};
  Object.keys(baseFonts).forEach((variant) => {
    const current = baseFonts[variant];
    const weight = String(current.fontWeight || '400');
    let fontFamily = fontFamilies.regular;
    if (weight === '500' || weight === '600') {
      fontFamily = fontFamilies.medium;
    }
    if (weight === '700' || weight === '800' || weight === '900') {
      fontFamily = fontFamilies.bold;
    }
    mapped[variant] = {
      ...current,
      fontFamily,
    };
  });
  return mapped;
}

const md3Fonts = configureFonts({
  isV3: true,
  config: buildMd3Fonts(MD3LightTheme.fonts),
});

const lightColors = {
  ...MD3LightTheme.colors,
  primary: '#1f6f54',
  onPrimary: '#f6f2e9',
  primaryContainer: '#c8eadc',
  onPrimaryContainer: '#07382a',
  secondary: '#b3831f',
  onSecondary: '#141310',
  secondaryContainer: '#f4e3c0',
  onSecondaryContainer: '#8a6410',
  tertiary: '#3c4a6b',
  onTertiary: '#f6f2e9',
  tertiaryContainer: '#d9def0',
  onTertiaryContainer: '#1c2438',
  error: '#a34a2c',
  onError: '#f6f2e9',
  errorContainer: '#f6d7cd',
  onErrorContainer: '#5c2414',
  background: '#f6f2e9',
  onBackground: '#211d16',
  surface: '#f6f2e9',
  onSurface: '#211d16',
  surfaceVariant: '#efe8d8',
  onSurfaceVariant: '#6e6656',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f3eee4',
  surfaceContainer: '#efe8d8',
  surfaceContainerHigh: '#e8e0ce',
  surfaceContainerHighest: '#e0d7c3',
  outline: '#7d7666',
  outlineVariant: '#d4ccba',
  elevation: {
    ...MD3LightTheme.colors.elevation,
    level0: 'transparent',
    level1: '#f3eee4',
    level2: '#efe8d8',
    level3: '#e8e0ce',
  },
  profit: '#1f6f54',
  loss: '#a34a2c',
  muted: '#6e6656',
  muted2: '#a49b86',
  gold: '#b3831f',
  ink: '#3c4a6b',
};

const darkColors = {
  ...MD3DarkTheme.colors,
  primary: '#4eb48f',
  onPrimary: '#07382a',
  primaryContainer: '#1f6f54',
  onPrimaryContainer: '#c8eadc',
  secondary: '#d6a64a',
  onSecondary: '#141310',
  secondaryContainer: '#8a6410',
  onSecondaryContainer: '#f4e3c0',
  tertiary: '#8b9bc4',
  onTertiary: '#141310',
  tertiaryContainer: '#3c4a6b',
  onTertiaryContainer: '#d9def0',
  error: '#e0785a',
  onError: '#141310',
  errorContainer: '#7a321c',
  onErrorContainer: '#f6d7cd',
  background: '#141310',
  onBackground: '#f4efe2',
  surface: '#141310',
  onSurface: '#f4efe2',
  surfaceVariant: '#232019',
  onSurfaceVariant: '#aba48f',
  surfaceContainerLowest: '#0f0e0c',
  surfaceContainerLow: '#1c1a15',
  surfaceContainer: '#232019',
  surfaceContainerHigh: '#2a271f',
  surfaceContainerHighest: '#322e25',
  outline: '#8a8373',
  outlineVariant: '#3a362c',
  elevation: {
    ...MD3DarkTheme.colors.elevation,
    level0: 'transparent',
    level1: '#1c1a15',
    level2: '#232019',
    level3: '#2a271f',
  },
  profit: '#4eb48f',
  loss: '#e0785a',
  muted: '#aba48f',
  muted2: '#6c6656',
  gold: '#d6a64a',
  ink: '#8b9bc4',
};

export const lightTheme = {
  ...MD3LightTheme,
  version: 3,
  roundness: 16,
  fonts: md3Fonts,
  colors: lightColors,
};

export const darkTheme = {
  ...MD3DarkTheme,
  version: 3,
  roundness: 16,
  fonts: md3Fonts,
  colors: darkColors,
};

export function getPaperTheme(isDark) {
  return isDark ? darkTheme : lightTheme;
}

export function getNavigationTheme(isDark) {
  const colors = isDark ? darkColors : lightColors;
  return {
    dark: isDark,
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.surfaceContainer,
      text: colors.onBackground,
      border: colors.outlineVariant,
      notification: colors.error,
    },
    fonts: {
      regular: { fontFamily: fontFamilies.regular, fontWeight: '400' },
      medium: { fontFamily: fontFamilies.medium, fontWeight: '500' },
      bold: { fontFamily: fontFamilies.bold, fontWeight: '700' },
      heavy: { fontFamily: fontFamilies.bold, fontWeight: '700' },
    },
  };
}
