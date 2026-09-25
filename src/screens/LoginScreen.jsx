import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useStore } from '../store';
import { useTheme } from '../ThemeContext';
import { Field, fonts, Icon } from '../ui';
export function LoginScreen() {
    const { palette } = useTheme();
    const { login, skipLogin } = useStore();
    const [email, setEmail] = useState('karan@siteledger.app');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    return (<View style={{ flex: 1, backgroundColor: palette.bg, justifyContent: 'center', paddingHorizontal: 28 }}>
      <View style={{
            width: 54,
            height: 54,
            borderRadius: 27,
            backgroundColor: palette.text,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
        }}>
        <Text style={{ color: palette.onAccent, fontFamily: fonts.serifBold, fontSize: 21 }}>SL</Text>
      </View>
      <Text style={{ fontFamily: fonts.sansBold, fontSize: 28, color: palette.text, letterSpacing: -0.5 }}>Welcome back</Text>
      <Text style={{ fontFamily: fonts.sans, fontSize: 13.5, color: palette.muted, marginTop: 6, marginBottom: 28 }}>
        Sign in to SiteLedger to view your projects, partners and GST filings.
      </Text>
      <Field label="Email" value={email} onChangeText={setEmail} placeholder="you@company.com" keyboardType="email-address"/>
      <Field label="Password" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry/>
      <Text style={{ color: palette.clay, fontFamily: fonts.sans, fontSize: 12.5, minHeight: 18 }}>{error}</Text>
      <Pressable onPress={() => {
            const err = login(email, password);
            setError(err ?? '');
        }} style={{ backgroundColor: palette.text, borderRadius: 6, paddingVertical: 15, alignItems: 'center', marginTop: 8 }}>
        <Text style={{ color: palette.onAccent, fontFamily: fonts.sansBold, fontSize: 14 }}>Log in</Text>
      </Pressable>
      <Text style={{ textAlign: 'center', color: palette.muted2, fontFamily: fonts.sans, fontSize: 12.5, marginTop: 22, lineHeight: 20 }}>
        This is a demo — any password works.
      </Text>
      <Pressable onPress={skipLogin}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 6 }}>
          <Text style={{ color: palette.gold, fontFamily: fonts.sansBold, fontSize: 12.5 }}>Continue without logging in</Text>
          <Icon name="arrow-right" size={14} color={palette.gold}/>
        </View>
      </Pressable>
    </View>);
}
