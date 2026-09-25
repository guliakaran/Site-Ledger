import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { FAQS, USER } from '../data';
import { inr } from '../format';
import { useStore } from '../store';
import { useTheme } from '../ThemeContext';
import { AddButton, Avatar, BackRow, InfoRow, LinkRow, fonts, Icon, SectionHead, SwitchRow, useStyles } from '../ui';
export function ProfileScreen() {
    const { styles, palette } = useStyles();
    const { mode, setMode } = useTheme();
    const { go, logout, lastTab, openTab } = useStore();
    const modes = [
        { id: 'light', icon: 'white-balance-sunny', label: 'Light' },
        { id: 'dark', icon: 'moon-waning-crescent', label: 'Dark' },
        { id: 'system', icon: 'theme-light-dark', label: 'System' },
    ];
    return (<View style={styles.screen}>
      <BackRow title="Profile" onPress={() => openTab(lastTab)}/>
      <View style={{ alignItems: 'center', marginBottom: 8 }}>
        <Avatar initials={USER.initials} color={palette.ink} size={68}/>
        <Text style={{ fontFamily: fonts.serif, fontSize: 19, color: palette.text, marginTop: 12 }}>{USER.name}</Text>
        <Text style={{ fontFamily: fonts.sansSemi, color: palette.muted, marginTop: 3 }}>{USER.role}</Text>
        <Text style={{ fontFamily: fonts.sans, color: palette.muted2, marginTop: 6, fontSize: 12 }}>{USER.email}</Text>
      </View>
      <SectionHead title="Appearance"/>
      <View style={{ flexDirection: 'row', backgroundColor: palette.surface2, borderWidth: 1, borderColor: palette.border, borderRadius: 6, padding: 3 }}>
        {modes.map((m) => {
            const active = mode === m.id;
            return (<Pressable key={m.id} onPress={() => setMode(m.id)} style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 4, backgroundColor: active ? palette.surface : 'transparent' }}>
              <Icon name={m.icon} size={16} color={active ? palette.text : palette.muted}/>
              <Text style={{ fontFamily: fonts.sansSemi, fontSize: 12, color: active ? palette.text : palette.muted, marginTop: 4 }}>{m.label}</Text>
            </Pressable>);
        })}
      </View>
      <SectionHead title="Account"/>
      <View style={[styles.card, { paddingHorizontal: 16 }]}>
        <InfoRow label="Full name" value={USER.name}/>
        <View style={styles.divider}/>
        <InfoRow label="Email" value={USER.email}/>
        <View style={styles.divider}/>
        <InfoRow label="Phone" value={USER.phone}/>
        <View style={styles.divider}/>
        <InfoRow label="GSTIN" value={USER.gstin}/>
      </View>
      <SectionHead title="Preferences"/>
      <View style={[styles.card, { paddingHorizontal: 14 }]}>
        <LinkRow icon="bell-outline" label="Notifications" onPress={() => go('notifications')}/>
        <View style={styles.divider}/>
        <LinkRow icon="lock-outline" label="Security & login" onPress={() => go('security')}/>
        <View style={styles.divider}/>
        <LinkRow icon="account-multiple-outline" label="Manage partners" onPress={() => go('managePartners')}/>
        <View style={styles.divider}/>
        <LinkRow icon="help-circle-outline" label="Help & support" onPress={() => go('help')}/>
      </View>
      <Pressable onPress={logout} style={{ marginTop: 18, borderWidth: 1, borderColor: palette.clay, borderRadius: 4, paddingVertical: 14, alignItems: 'center' }}>
        <Text style={{ color: palette.clay, fontFamily: fonts.sansBold }}>Log out</Text>
      </Pressable>
    </View>);
}
export function NotificationsScreen() {
    const { styles } = useStyles();
    const { go } = useStore();
    const [flags, setFlags] = useState({ pay: true, exp: true, gst: true, partner: false, weekly: true, monthly: true });
    const set = (key) => setFlags((f) => ({ ...f, [key]: !f[key] }));
    return (<View style={styles.screen}>
      <BackRow title="Notifications" onPress={() => go('profile')}/>
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
    const { styles, palette } = useStyles();
    const { go, sessions, endSession, showToast } = useStore();
    const [twofa, setTwofa] = useState(true);
    const [bio, setBio] = useState(false);
    return (<View style={styles.screen}>
      <BackRow title="Security & login" onPress={() => go('profile')}/>
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
    const { styles, palette } = useStyles();
    const { go, partners, openPartnerSheet, showToast } = useStore();
    return (<View style={styles.screen}>
      <BackRow title="Manage partners" onPress={() => go('profile')}/>
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
    const { styles, palette } = useStyles();
    const { go, showToast } = useStore();
    const [open, setOpen] = useState(null);
    const contacts = [
        { icon: 'chat-outline', title: 'Chat with support' },
        { icon: 'email-outline', title: 'Email us' },
        { icon: 'bug-outline', title: 'Report an issue' },
    ];
    return (<View style={styles.screen}>
      <BackRow title="Help & support" onPress={() => go('profile')}/>
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
