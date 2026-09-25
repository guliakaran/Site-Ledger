import React, { useState } from 'react';
import { Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from './ThemeContext';

export function Icon({ name, size = 18, color }) {
    return <MaterialCommunityIcons name={name} size={size} color={color}/>;
}

const face = (android, ios) => (Platform.OS === 'android' ? android : ios);

export const fonts = {
    serif: face('Inter_600SemiBold', 'Inter-SemiBold'),
    serifBold: face('Inter_700Bold', 'Inter-Bold'),
    sans: face('Inter_400Regular', 'Inter-Regular'),
    sansMed: face('Inter_500Medium', 'Inter-Medium'),
    sansSemi: face('Inter_600SemiBold', 'Inter-SemiBold'),
    sansBold: face('Inter_700Bold', 'Inter-Bold'),
    mono: face('Inter_500Medium', 'Inter-Medium'),
};
export function useStyles() {
    const { palette, isDark } = useTheme();
    const styles = React.useMemo(() => makeStyles(palette), [palette]);
    return { palette, isDark, styles };
}
function makeStyles(c) {
    return StyleSheet.create({
        screen: { paddingHorizontal: 20, paddingBottom: 128, paddingTop: 12 },
        card: {
            backgroundColor: c.surface,
            borderWidth: 1,
            borderColor: c.border,
            borderRadius: 14,
            overflow: 'hidden',
        },
        label: {
            fontFamily: fonts.sansSemi,
            fontSize: 11,
            color: c.muted,
            letterSpacing: 1.1,
            textTransform: 'uppercase',
        },
        big: { fontFamily: fonts.sansBold, fontSize: 32, color: c.text, marginTop: 8, letterSpacing: -0.6, lineHeight: 38 },
        num: { fontFamily: fonts.mono },
        section: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginTop: 22,
            marginBottom: 12,
        },
        h2: { fontFamily: fonts.sansBold, fontSize: 17, color: c.text, letterSpacing: -0.2 },
        hint: {
            fontFamily: fonts.sansBold,
            fontSize: 11,
            color: c.muted2,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
        },
        rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        muted: { color: c.muted, fontFamily: fonts.sansMed, fontSize: 12 },
        name: { fontFamily: fonts.sansBold, fontSize: 15, color: c.text, letterSpacing: -0.2 },
        divider: { height: 1, backgroundColor: c.border },
        pill: {
            fontSize: 10,
            fontFamily: fonts.sansBold,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
            paddingHorizontal: 9,
            paddingVertical: 4,
            borderRadius: 20,
            overflow: 'hidden',
        },
        fieldLabel: {
            fontFamily: fonts.sansBold,
            fontSize: 11,
            color: c.muted,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
            marginBottom: 7,
        },
        input: {
            backgroundColor: c.surface2,
            borderWidth: 1,
            borderColor: c.border,
            borderRadius: 10,
            paddingHorizontal: 14,
            paddingVertical: 13,
            color: c.text,
            fontFamily: fonts.sans,
            fontSize: 14,
        },
        submit: {
            backgroundColor: c.text,
            borderRadius: 12,
            paddingVertical: 15,
            alignItems: 'center',
            marginTop: 6,
        },
        submitText: { color: c.onAccent, fontFamily: fonts.sansBold, fontSize: 14 },
    });
}
export function SectionHead({ title, right }) {
    const { styles } = useStyles();
    return (<View style={styles.section}>
      <Text style={styles.h2}>{title}</Text>
      {typeof right === 'string' ? <Text style={styles.hint}>{right}</Text> : right}
    </View>);
}
export function BarRow({ name, value, width }) {
    const { palette } = useTheme();
    return (<View style={{ marginBottom: 13 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
        <Text style={{ fontFamily: fonts.sansSemi, fontSize: 13, color: palette.text }}>{name}</Text>
        <Text style={{ fontFamily: fonts.mono, fontSize: 12, color: palette.muted }}>{value}</Text>
      </View>
      <View style={{ height: 6, borderRadius: 6, backgroundColor: palette.surface2, overflow: 'hidden' }}>
        <View style={{ height: 6, width: `${Math.max(width, 2)}%`, backgroundColor: palette.green, borderRadius: 6 }}/>
      </View>
    </View>);
}
export function Avatar({ initials, color, size = 38 }) {
    return (<View style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
      <Text style={{ color: '#fff', fontFamily: fonts.sansBold, fontSize: size > 50 ? 22 : 13 }}>{initials}</Text>
    </View>);
}
export function BackRow({ title, onPress }) {
    const { palette } = useTheme();
    return (<Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 18, marginTop: 4 }}>
      <View style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: palette.borderStrong,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        <Icon name="arrow-left" size={16} color={palette.text}/>
      </View>
      <Text style={{ fontFamily: fonts.sansBold, fontSize: 16, color: palette.text, letterSpacing: -0.2 }}>{title}</Text>
    </Pressable>);
}
export function AddButton({ label, onPress }) {
    const { palette } = useTheme();
    return (<Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderColor: palette.green, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 }}>
      <Icon name="plus" size={14} color={palette.green}/>
      <Text style={{ color: palette.green, fontFamily: fonts.sansBold, fontSize: 12 }}>{label.replace(/^\+\s*/, '')}</Text>
    </Pressable>);
}
export function Chip({ label, active, onPress }) {
    const { palette } = useTheme();
    return (<Pressable onPress={onPress} style={{
            borderWidth: 1,
            borderColor: active ? palette.text : palette.borderStrong,
            backgroundColor: active ? palette.text : 'transparent',
            borderRadius: 20,
            paddingHorizontal: 14,
            paddingVertical: 8,
            marginRight: 8,
        }}>
      <Text style={{ color: active ? palette.onAccent : palette.muted, fontFamily: fonts.sansSemi, fontSize: 12.5 }}>{label}</Text>
    </Pressable>);
}
export function Field({ label, value, onChangeText, placeholder, keyboardType, secureTextEntry, }) {
    const { styles } = useStyles();
    return (<View style={{ marginBottom: 14, flex: 1 }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={styles.muted.color} keyboardType={keyboardType} secureTextEntry={secureTextEntry} autoCapitalize="none" style={styles.input}/>
    </View>);
}
export function Choice({ label, value, options, onChange, }) {
    const { palette, styles } = useStyles();
    const [open, setOpen] = useState(false);
    return (<View style={{ marginBottom: 14, flex: 1 }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Pressable onPress={() => setOpen(true)} style={styles.input}>
        <Text style={{ color: palette.text, fontFamily: fonts.sans, fontSize: 14 }}>{value}</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(20,16,8,0.4)', justifyContent: 'flex-end' }} onPress={() => setOpen(false)}>
          <View style={{ backgroundColor: palette.surface, borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, maxHeight: '60%' }}>
            <Text style={[styles.h2, { marginBottom: 10 }]}>{label}</Text>
            <ScrollView>
              {options.map((opt) => (<Pressable key={opt} onPress={() => {
                onChange(opt);
                setOpen(false);
            }} style={{ paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: palette.border }}>
                  <Text style={{ color: opt === value ? palette.green : palette.text, fontFamily: fonts.sansSemi, fontSize: 15 }}>{opt}</Text>
                </Pressable>))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>);
}
export function SwitchRow({ title, detail, value, onChange, }) {
    const { palette } = useTheme();
    return (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 13, gap: 12 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fonts.sansBold, fontSize: 13.5, color: palette.text }}>{title}</Text>
        <Text style={{ fontFamily: fonts.sansMed, fontSize: 11.5, color: palette.muted2, marginTop: 2 }}>{detail}</Text>
      </View>
      <Pressable onPress={() => onChange(!value)} style={{
            width: 42,
            height: 24,
            borderRadius: 20,
            backgroundColor: value ? palette.green : palette.surface2,
            borderWidth: 1,
            borderColor: value ? palette.green : palette.borderStrong,
            justifyContent: 'center',
            paddingHorizontal: 2,
        }}>
        <View style={{
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: '#fff',
            alignSelf: value ? 'flex-end' : 'flex-start',
        }}/>
      </Pressable>
    </View>);
}
export function InfoRow({ label, value }) {
    const { palette } = useTheme();
    return (<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 13 }}>
      <Text style={{ fontFamily: fonts.sansSemi, fontSize: 11.5, color: palette.muted2 }}>{label}</Text>
      <Text style={{ fontFamily: fonts.sansBold, fontSize: 13.5, color: palette.text }}>{value}</Text>
    </View>);
}
export function LinkRow({ icon, label, onPress }) {
    const { palette } = useTheme();
    return (<Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 11 }}>
        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: palette.surface2, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={15} color={palette.text}/>
        </View>
        <Text style={{ fontFamily: fonts.sansSemi, fontSize: 13.5, color: palette.text }}>{label}</Text>
      </View>
      <Icon name="chevron-right" size={20} color={palette.muted2}/>
    </Pressable>);
}
export function Sheet({ visible, title, onClose, children, }) {
    const { palette } = useTheme();
    return (<Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: 'rgba(20,16,8,0.4)', justifyContent: 'flex-end' }} onPress={onClose}>
        <Pressable onPress={() => undefined} style={{
            backgroundColor: palette.surface,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            borderWidth: 1,
            borderColor: palette.borderStrong,
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 28,
            maxHeight: '88%',
        }}>
          <View style={{ width: 34, height: 4, borderRadius: 3, backgroundColor: palette.borderStrong, alignSelf: 'center', marginBottom: 16 }}/>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontFamily: fonts.sansBold, fontSize: 18, color: palette.text, letterSpacing: -0.3 }}>{title}</Text>
            <Pressable onPress={onClose} style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: palette.surface2, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="close" size={16} color={palette.muted}/>
            </Pressable>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
        </Pressable>
      </Pressable>
    </Modal>);
}
export function cardPad(extra) {
    return { paddingHorizontal: 16, paddingVertical: 2, ...extra };
}
