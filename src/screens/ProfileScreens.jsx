import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useBackHeader } from '../components/AppHeader';
import { FAQS } from '../data';
import { inr } from '../format';
import { useStore } from '../store';
import { useTheme } from '../ThemeContext';
import { AddButton, Avatar, Field, Icon, LinkRow, Sheet, fonts, SectionHead, SwitchRow, useStyles } from '../ui';
export function ProfileScreen() {
    useBackHeader('Profile');
    const { styles, palette } = useStyles();
    const { mode, setMode } = useTheme();
    const navigation = useNavigation();
    const { logout, profile, updateProfile } = useStore();
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phone);
    const [gstin, setGstin] = useState(profile.gstin);
    const modes = [
        { id: 'light', icon: 'white-balance-sunny', label: 'Light' },
        { id: 'dark', icon: 'moon-waning-crescent', label: 'Dark' },
        { id: 'system', icon: 'theme-light-dark', label: 'System' },
    ];
    const links = [
        { icon: 'bell-outline', label: 'Notifications', screen: 'Notifications' },
        { icon: 'lock-outline', label: 'Security & login', screen: 'Security' },
        { icon: 'account-multiple-outline', label: 'Manage partners', screen: 'ManagePartners' },
        { icon: 'help-circle-outline', label: 'Help & support', screen: 'Help' },
    ];
    const details = [
        { icon: 'account-outline', label: 'Full name', value: profile.name },
        { icon: 'email-outline', label: 'Email', value: profile.email },
        { icon: 'phone-outline', label: 'Phone', value: profile.phone },
        { icon: 'file-document-outline', label: 'GSTIN', value: profile.gstin },
    ];
    const openEdit = useCallback(() => {
        setName(profile.name);
        setEmail(profile.email);
        setPhone(profile.phone);
        setGstin(profile.gstin);
        setEditing(true);
    }, [profile]);
    return (<View style={styles.screen}>
      <View style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 8 }}>
        <View style={{ padding: 4, borderRadius: 48, backgroundColor: palette.greenSoft }}>
          <Avatar initials={profile.initials} color={palette.ink} size={84}/>
        </View>
        <Text style={{ fontFamily: fonts.sansBold, fontSize: 24, color: palette.text, marginTop: 14, letterSpacing: -0.5 }}>{profile.name}</Text>
        <View style={{ marginTop: 8, backgroundColor: palette.inkSoft, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 }}>
          <Text style={{ fontFamily: fonts.sansSemi, fontSize: 12, color: palette.ink }}>{profile.role}</Text>
        </View>
        <Pressable onPress={openEdit} style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: palette.text, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10 }}>
          <Icon name="pencil-outline" size={16} color={palette.onAccent}/>
          <Text style={{ color: palette.onAccent, fontFamily: fonts.sansBold, fontSize: 13 }}>Edit profile</Text>
        </Pressable>
      </View>

      <Text style={{ fontFamily: fonts.sansBold, fontSize: 13, color: palette.muted, marginTop: 22, marginBottom: 10, letterSpacing: 0.4 }}>APPEARANCE</Text>
      <View style={{ flexDirection: 'row', backgroundColor: palette.surface, borderRadius: 16, padding: 4, borderWidth: 1, borderColor: palette.border }}>
        {modes.map((m) => {
            const active = mode === m.id;
            return (<Pressable key={m.id} onPress={() => setMode(m.id)} style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 12, backgroundColor: active ? palette.greenSoft : 'transparent' }}>
              <Icon name={m.icon} size={18} color={active ? palette.green : palette.muted}/>
              <Text style={{ fontFamily: fonts.sansSemi, fontSize: 12, color: active ? palette.green : palette.muted, marginTop: 4 }}>{m.label}</Text>
            </Pressable>);
        })}
      </View>

      <Text style={{ fontFamily: fonts.sansBold, fontSize: 13, color: palette.muted, marginTop: 22, marginBottom: 10, letterSpacing: 0.4 }}>ACCOUNT</Text>
      <View style={{ backgroundColor: palette.surface, borderRadius: 16, borderWidth: 1, borderColor: palette.border, paddingHorizontal: 14 }}>
        {details.map((item, index) => (<View key={item.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderTopWidth: index === 0 ? 0 : 1, borderTopColor: palette.border }}>
          <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: palette.surface2, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={item.icon} size={18} color={palette.text}/>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.sansMed, fontSize: 12, color: palette.muted2 }}>{item.label}</Text>
            <Text style={{ fontFamily: fonts.sansSemi, fontSize: 15, color: palette.text, marginTop: 2 }}>{item.value}</Text>
          </View>
        </View>))}
      </View>

      <Text style={{ fontFamily: fonts.sansBold, fontSize: 13, color: palette.muted, marginTop: 22, marginBottom: 10, letterSpacing: 0.4 }}>SETTINGS</Text>
      <View style={{ backgroundColor: palette.surface, borderRadius: 16, borderWidth: 1, borderColor: palette.border, paddingHorizontal: 14 }}>
        {links.map((item, index) => (<Pressable key={item.screen} onPress={() => navigation.navigate(item.screen)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderTopWidth: index === 0 ? 0 : 1, borderTopColor: palette.border }}>
          <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: palette.goldSoft, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={item.icon} size={18} color={palette.gold}/>
          </View>
          <Text style={{ flex: 1, fontFamily: fonts.sansSemi, fontSize: 15, color: palette.text }}>{item.label}</Text>
          <Icon name="chevron-right" size={22} color={palette.muted2}/>
        </Pressable>))}
      </View>

      <Pressable onPress={logout} style={{ marginTop: 20, backgroundColor: palette.claySoft, borderRadius: 16, paddingVertical: 15, alignItems: 'center' }}>
        <Text style={{ color: palette.clay, fontFamily: fonts.sansBold, fontSize: 15 }}>Log out</Text>
      </Pressable>

      <Sheet visible={editing} title="Edit profile" onClose={() => setEditing(false)}>
        <Field flex={0} label="Full name" value={name} onChangeText={setName} placeholder="Your name"/>
        <Field flex={0} label="Email" value={email} onChangeText={setEmail} placeholder="you@company.com" keyboardType="email-address"/>
        <Field flex={0} label="Phone" value={phone} onChangeText={setPhone} placeholder="+91" keyboardType="phone-pad"/>
        <Field flex={0} label="GSTIN" value={gstin} onChangeText={setGstin} placeholder="29ABCDE1234F1Z5"/>
        <Pressable onPress={() => {
            if (!name.trim() || !email.trim())
                return;
            updateProfile({ name: name.trim(), email: email.trim(), phone: phone.trim(), gstin: gstin.trim() });
            setEditing(false);
        }} style={[styles.submit, { borderRadius: 14 }]}>
          <Text style={styles.submitText}>Save changes</Text>
        </Pressable>
        <View style={{ height: 12 }}/>
      </Sheet>
    </View>);
}
export function NotificationsScreen() {
    useBackHeader('Notifications');
    const { styles } = useStyles();
    const [flags, setFlags] = useState({ pay: true, exp: true, gst: true, partner: false, weekly: true, monthly: true });
    const set = (key) => setFlags((f) => ({ ...f, [key]: !f[key] }));
    return (<View style={styles.screen}>
      <SectionHead title="Push"/>
      <View style={[styles.card, { paddingHorizontal: 16 }]}>
        <SwitchRow title="Payment received" detail="When a client or partner payment lands" value={flags.pay} onChange={() => set('pay')}/>
        <View style={styles.divider}/>
        <SwitchRow title="Expense logged" detail="When a partner records a new expense" value={flags.exp} onChange={() => set('exp')}/>
        <View style={styles.divider}/>
        <SwitchRow title="GST due reminders" detail="3 days before each filing deadline" value={flags.gst} onChange={() => set('gst')}/>
        <View style={styles.divider}/>
        <SwitchRow title="New partner added" detail="When someone joins a project" value={flags.partner} onChange={() => set('partner')}/>
      </View>
      <SectionHead title="Email"/>
      <View style={[styles.card, { paddingHorizontal: 16 }]}>
        <SwitchRow title="Weekly summary" detail="P&L and ledger digest every Monday" value={flags.weekly} onChange={() => set('weekly')}/>
        <View style={styles.divider}/>
        <SwitchRow title="Monthly GST statement" detail="Filing status across all partners" value={flags.monthly} onChange={() => set('monthly')}/>
      </View>
    </View>);
}
export function SecurityScreen() {
    useBackHeader('Security & login');
    const { styles, palette } = useStyles();
    const { sessions, endSession, showToast } = useStore();
    const [twofa, setTwofa] = useState(true);
    const [bio, setBio] = useState(false);
    return (<View style={styles.screen}>
      <SectionHead title="Login"/>
      <View style={[styles.card, { paddingHorizontal: 16 }]}>
        <LinkRow icon="key-outline" label="Change password" onPress={() => showToast('Password change is a demo')}/>
        <View style={styles.divider}/>
        <SwitchRow title="Two-factor authentication" detail="Require an OTP on new devices" value={twofa} onChange={setTwofa}/>
        <View style={styles.divider}/>
        <SwitchRow title="Biometric login" detail="Face / fingerprint unlock on this device" value={bio} onChange={setBio}/>
      </View>
      <SectionHead title="Active sessions"/>
      <View style={[styles.card, { paddingHorizontal: 16 }]}>
        {sessions.map((s, i) => (<View key={s.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 13, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: palette.border }}>
            <Icon name={s.icon} size={20} color={palette.text}/>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <Text style={{ fontFamily: fonts.sansBold, color: palette.text }}>{s.device}</Text>
                {s.current ? (<Text style={{ fontSize: 9, fontFamily: fonts.sansBold, color: palette.green, backgroundColor: palette.greenSoft, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, overflow: 'hidden' }}>THIS DEVICE</Text>) : null}
              </View>
              <Text style={{ fontFamily: fonts.sans, fontSize: 11, color: palette.muted2, marginTop: 2 }}>{s.meta}</Text>
            </View>
            {s.current ? null : (<Pressable onPress={() => endSession(s.id)}>
                <Text style={{ color: palette.clay, fontFamily: fonts.sansBold, fontSize: 12 }}>End</Text>
              </Pressable>)}
          </View>))}
      </View>
    </View>);
}
export function ManagePartnersScreen() {
    useBackHeader('Manage partners');
    const { styles, palette } = useStyles();
    const { partners, openPartnerSheet, showToast } = useStore();
    return (<View style={styles.screen}>
      <SectionHead title="All partners" right={<AddButton label="+ Add partner" onPress={() => openPartnerSheet('global')}/>}/>
      {partners.map((p) => (<View key={p.id} style={[styles.card, { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, marginBottom: 10 }]}>
          <Avatar initials={p.initials} color={p.color}/>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fonts.sansBold, color: palette.text }}>{p.name}</Text>
            <Text style={styles.muted}>{p.shareLabel ?? `${p.projectCount} project${p.projectCount === 1 ? '' : 's'}`}</Text>
            <Text style={{ fontFamily: fonts.mono, color: palette.muted, marginTop: 4, fontSize: 12 }}>Invested {inr(p.invested)}</Text>
          </View>
          <Pressable onPress={() => showToast('Editing partners is a demo')} style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: palette.borderStrong, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="pencil-outline" size={16} color={palette.text}/>
          </Pressable>
        </View>))}
    </View>);
}
export function HelpScreen() {
    useBackHeader('Help & support');
    const { styles, palette } = useStyles();
    const { showToast } = useStore();
    const [open, setOpen] = useState(null);
    const contacts = [
        { icon: 'chat-outline', title: 'Chat with support' },
        { icon: 'email-outline', title: 'Email us' },
        { icon: 'bug-outline', title: 'Report an issue' },
    ];
    return (<View style={styles.screen}>
      <SectionHead title="Contact"/>
      <View style={[styles.card, { paddingHorizontal: 14 }]}>
        {contacts.map((c, i) => (<Pressable key={c.title} onPress={() => showToast('Support inbox is a demo')} style={{ flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 13, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: palette.border }}>
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: palette.goldSoft, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={c.icon} size={16} color={palette.gold}/>
            </View>
            <Text style={{ flex: 1, fontFamily: fonts.sansBold, color: palette.text }}>{c.title}</Text>
            <Icon name="chevron-right" size={20} color={palette.muted2}/>
          </Pressable>))}
      </View>
      <SectionHead title="FAQs"/>
      <View style={[styles.card, { paddingHorizontal: 16 }]}>
        {FAQS.map((item, i) => (<View key={item.q} style={{ borderTopWidth: i === 0 ? 0 : 1, borderTopColor: palette.border }}>
            <Pressable onPress={() => setOpen(open === i ? null : i)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, gap: 12 }}>
              <Text style={{ flex: 1, fontFamily: fonts.sansBold, color: palette.text, fontSize: 13.5 }}>{item.q}</Text>
              <Icon name={open === i ? 'chevron-up' : 'chevron-right'} size={18} color={palette.muted2}/>
            </Pressable>
            {open === i ? <Text style={{ color: palette.muted, fontFamily: fonts.sans, fontSize: 12.5, lineHeight: 20, marginBottom: 14 }}>{item.a}</Text> : null}
          </View>))}
      </View>
      <Text style={{ textAlign: 'center', color: palette.muted2, fontFamily: fonts.sans, fontSize: 11, marginTop: 18 }}>SiteLedger · v1.0.0</Text>
    </View>);
}
