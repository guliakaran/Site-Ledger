import { useNavigation, useNavigationState } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { todayIso } from '../format';
import { useStore } from '../store';
import { useTheme } from '../ThemeContext';
import { Choice, Field, fonts, Icon, Sheet, useStyles } from '../ui';
const TAB_ROUTES = new Set(['Dashboard', 'Partners', 'Ledger', 'Revenue', 'Gst', 'Reports']);
function useFocusedRoute() {
    return useNavigationState((state) => {
        if (!state)
            return 'Dashboard';
        let route = state.routes[state.index];
        while (route?.state?.routes?.length) {
            route = route.state.routes[route.state.index ?? 0];
        }
        return route?.name ?? 'Dashboard';
    });
}
export function Fab() {
    const { palette } = useTheme();
    const { setTxSheet } = useStore();
    const routeName = useFocusedRoute();
    if (!TAB_ROUTES.has(routeName))
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
    const navigation = useNavigation();
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
            navigation.navigate('Tabs', { screen: 'Ledger' });
        }} style={{ backgroundColor: palette.text, borderRadius: 6, paddingVertical: 15, alignItems: 'center', marginTop: 6, marginBottom: 12 }}>
        <Text style={{ color: palette.onAccent, fontFamily: fonts.sansBold }}>Save transaction</Text>
      </Pressable>
    </Sheet>);
}
export function PartnerSheet() {
    const navigation = useNavigation();
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
            const stayOnProject = partnerSheet === 'project';
            addPartner({ name: name.trim(), join, share: s, invest: n, gstin: gstin.trim() });
            if (!stayOnProject)
                navigation.navigate('Tabs', { screen: 'Partners' });
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
