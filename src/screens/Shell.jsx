import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { todayIso } from '../format';
import { useStore } from '../store';
import { useTheme } from '../ThemeContext';
import { Choice, Field, fonts, Icon, Sheet, useStyles } from '../ui';
const TABS = [
    { id: 'dashboard', icon: 'view-dashboard-outline', label: 'Home' },
    { id: 'partners', icon: 'account-group-outline', label: 'Partners' },
    { id: 'ledger', icon: 'format-list-bulleted', label: 'Ledger' },
    { id: 'revenue', icon: 'currency-inr', label: 'Revenue' },
    { id: 'gst', icon: 'file-document-outline', label: 'GST' },
    { id: 'reports', icon: 'chart-box-outline', label: 'Reports' },
];
const MENU = [
    { id: 'dashboard', icon: 'view-dashboard-outline', label: 'Dashboard' },
    { id: 'partners', icon: 'account-group-outline', label: 'Partners' },
    { id: 'ledger', icon: 'format-list-bulleted', label: 'Ledger' },
    { id: 'revenue', icon: 'currency-inr', label: 'Revenue' },
    { id: 'gst', icon: 'file-document-outline', label: 'GST' },
    { id: 'reports', icon: 'chart-box-outline', label: 'Reports' },
    { id: 'profile', icon: 'account-circle-outline', label: 'Profile' },
];
const HIDE_FAB = new Set(['profile', 'notifications', 'security', 'managePartners', 'help', 'projectDetail', 'partnerDetail']);
export function Header() {
    const { palette } = useTheme();
    const insets = useSafeAreaInsets();
    const { screen, openTab, go } = useStore();
    const [menu, setMenu] = useState(false);
    return (<View style={{ paddingTop: insets.top + 8, paddingHorizontal: 20, paddingBottom: 12, backgroundColor: palette.bg, borderBottomWidth: 1, borderBottomColor: palette.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: palette.text, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: palette.onAccent, fontFamily: fonts.serifBold, fontSize: 13 }}>SL</Text>
        </View>
        <Text style={{ fontFamily: fonts.sansBold, fontSize: 18, color: palette.text, letterSpacing: -0.3 }}>SiteLedger</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
        <Text style={{ fontSize: 11, color: palette.muted, borderWidth: 1, borderColor: palette.borderStrong, borderRadius: 20, paddingHorizontal: 11, paddingVertical: 6, fontFamily: fonts.sansSemi }}>FY 2026–27</Text>
        <View>
          <Pressable onPress={() => setMenu((v) => !v)} style={iconBtn(palette.borderStrong)}>
            <Icon name="menu" size={18} color={palette.text}/>
          </Pressable>
          {menu ? (<View style={{ position: 'absolute', top: 40, right: 0, width: 196, backgroundColor: palette.surface, borderWidth: 1, borderColor: palette.borderStrong, borderRadius: 12, padding: 6, zIndex: 20 }}>
              {MENU.map((item) => {
                const active = screen === item.id;
                return (<Pressable key={item.id} onPress={() => {
                        setMenu(false);
                        if (item.id === 'profile')
                            go('profile');
                        else
                            openTab(item.id);
                    }} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 9, paddingHorizontal: 10, borderRadius: 8, backgroundColor: active ? palette.goldSoft : 'transparent' }}>
                    <Icon name={item.icon} size={16} color={active ? palette.gold : palette.text}/>
                    <Text style={{ fontFamily: fonts.sansSemi, fontSize: 13, color: active ? palette.gold : palette.text }}>{item.label}</Text>
                  </Pressable>);
            })}
            </View>) : null}
        </View>
        <Pressable onPress={() => go('profile')} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: palette.ink, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#fff', fontFamily: fonts.sansBold, fontSize: 12 }}>KG</Text>
        </Pressable>
      </View>
    </View>);
}
function iconBtn(border) {
    return { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: border, alignItems: 'center', justifyContent: 'center' };
}
export function TabBar() {
    const { palette } = useTheme();
    const insets = useSafeAreaInsets();
    const { screen, lastTab, openTab } = useStore();
    const active = TABS.some((t) => t.id === screen) ? screen : lastTab;
    return (<View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: palette.border, backgroundColor: palette.bg, paddingTop: 8, paddingBottom: Math.max(insets.bottom, 8), paddingHorizontal: 4 }}>
      {TABS.map((tab) => {
            const on = active === tab.id;
            return (<Pressable key={tab.id} onPress={() => openTab(tab.id)} style={{ flex: 1, alignItems: 'center', paddingVertical: 4 }}>
            <Icon name={tab.icon} size={20} color={on ? palette.green : palette.muted2}/>
            <Text style={{ fontSize: 10, fontFamily: fonts.sansMed, color: on ? palette.green : palette.muted2, marginTop: 3, letterSpacing: 0.1 }}>{tab.label}</Text>
          </Pressable>);
        })}
    </View>);
}
export function Fab() {
    const { palette } = useTheme();
    const { screen, setTxSheet } = useStore();
    if (HIDE_FAB.has(screen))
        return null;
    return (<Pressable onPress={() => setTxSheet(true)} style={{ position: 'absolute', right: 18, bottom: 92, width: 52, height: 52, borderRadius: 26, backgroundColor: palette.text, alignItems: 'center', justifyContent: 'center', elevation: 6 }}>
      <Icon name="plus" size={26} color={palette.onAccent}/>
    </Pressable>);
}
export function Toast() {
    const { palette } = useTheme();
    const { toast } = useStore();
    if (!toast)
        return null;
    return (<View pointerEvents="none" style={{ position: 'absolute', left: 24, right: 24, bottom: 120, backgroundColor: palette.text, borderRadius: 6, paddingVertical: 12, paddingHorizontal: 18, alignItems: 'center' }}>
      <Text style={{ color: palette.onAccent, fontFamily: fonts.sansSemi, fontSize: 13 }}>{toast.message}</Text>
    </View>);
}
export function TransactionSheet() {
    const { txSheet, setTxSheet, addTransaction, projects, partners } = useStore();
    const { palette } = useTheme();
    const [type, setType] = useState('investment');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(todayIso());
    const [partner, setPartner] = useState(partners[0]?.name ?? '— Not partner-specific —');
    const [project, setProject] = useState(projects[0]?.title ?? '');
    const [gst, setGst] = useState('18%');
    const types = [
        { id: 'investment', label: 'Investment' },
        { id: 'income', label: 'Income' },
        { id: 'expense', label: 'Expense' },
    ];
    const reset = () => {
        setDescription('');
        setAmount('');
        setDate(todayIso());
        setType('investment');
        setGst('18%');
    };
    return (<Sheet visible={txSheet} title="Add transaction" onClose={() => setTxSheet(false)}>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
        {types.map((t) => {
            const active = type === t.id;
            const inflow = t.id !== 'expense';
            return (<Pressable key={t.id} onPress={() => setType(t.id)} style={{
                    flex: 1,
                    paddingVertical: 11,
                    borderRadius: 6,
                    borderWidth: 1,
                    alignItems: 'center',
                    borderColor: active ? (inflow ? palette.green : palette.clay) : palette.border,
                    backgroundColor: active ? (inflow ? palette.greenSoft : palette.claySoft) : palette.surface2,
                }}>
              <Text style={{ fontFamily: fonts.sansBold, fontSize: 12, color: active ? (inflow ? palette.green : palette.clay) : palette.muted }}>{t.label}</Text>
            </Pressable>);
        })}
      </View>
      <Field label="Description" value={description} onChangeText={setDescription} placeholder="e.g. Capital contribution — Ravi Shankar"/>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Field label="Amount (₹)" value={amount} onChangeText={setAmount} placeholder="0" keyboardType="numeric"/>
        <Field label="Date" value={date} onChangeText={setDate} placeholder="YYYY-MM-DD"/>
      </View>
      <Choice label="Partner" value={partner} options={[...partners.map((p) => p.name), '— Not partner-specific —']} onChange={setPartner}/>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Choice label="Project" value={project} options={projects.map((p) => p.title)} onChange={setProject}/>
        {type === 'investment' ? <View style={{ flex: 1 }}/> : <Choice label="GST rate" value={gst} options={['No GST', '5%', '12%', '18%', '28%']} onChange={setGst}/>}
      </View>
      <Pressable onPress={() => {
            const n = parseFloat(amount);
            if (!description.trim() || !n || n < 1)
                return;
            const gstValue = gst === 'No GST' ? '0' : gst.replace('%', '');
            addTransaction({ description: description.trim(), amount: n, date, partner, project, gst: gstValue, type });
            reset();
        }} style={{ backgroundColor: palette.text, borderRadius: 6, paddingVertical: 15, alignItems: 'center', marginTop: 6, marginBottom: 12 }}>
        <Text style={{ color: palette.onAccent, fontFamily: fonts.sansBold }}>Save transaction</Text>
      </Pressable>
    </Sheet>);
}
export function PartnerSheet() {
    const { partnerSheet, closePartnerSheet, addPartner } = useStore();
    const { styles } = useStyles();
    const [name, setName] = useState('');
    const [join, setJoin] = useState(todayIso());
    const [share, setShare] = useState('');
    const [invest, setInvest] = useState('');
    const [gstin, setGstin] = useState('');
    return (<Sheet visible={partnerSheet !== 'closed'} title="Add partner" onClose={closePartnerSheet}>
      <Field label="Full name" value={name} onChangeText={setName} placeholder="e.g. Dev Malhotra"/>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Field label="Joining date" value={join} onChangeText={setJoin} placeholder="YYYY-MM-DD"/>
        <Field label="Profit share (%)" value={share} onChangeText={setShare} placeholder="e.g. 10" keyboardType="numeric"/>
      </View>
      <Field label="Opening investment (₹)" value={invest} onChangeText={setInvest} placeholder="0" keyboardType="numeric"/>
      <Field label="GSTIN (optional)" value={gstin} onChangeText={setGstin} placeholder="29ABCDE1234F1Z5"/>
      <Pressable onPress={() => {
            const n = parseFloat(invest);
            const s = parseFloat(share);
            if (!name.trim() || !join || !s || !n)
                return;
            addPartner({ name: name.trim(), join, share: s, invest: n, gstin: gstin.trim() });
            setName('');
            setShare('');
            setInvest('');
            setGstin('');
            setJoin(todayIso());
        }} style={styles.submit}>
        <Text style={styles.submitText}>Add partner</Text>
      </Pressable>
      <View style={{ height: 16 }}/>
    </Sheet>);
}
