import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { FY_REPORTS, GST, REVENUE_BARS, SUMMARY } from '../data';
import { inr, signedInr } from '../format';
import { useStore } from '../store';
import { useTheme } from '../ThemeContext';
import { useMainHeader } from '../components/AppHeader';
import { BarRow, Chip, fonts, Icon, SectionHead, useStyles } from '../ui';
export function RevenueScreen() {
    useMainHeader();
    const { styles, palette } = useStyles();
    const income = useStore().transactions.filter((t) => t.type === 'income');
    return (<View style={styles.screen}>
      <View style={[styles.card, { padding: 20, marginTop: 8 }]}>
        <Text style={styles.label}>Total revenue this FY</Text>
        <Text style={styles.big}>{inr(SUMMARY.revenue)}</Text>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: palette.border, marginTop: 16 }}>
          <View style={{ flex: 1, paddingTop: 12 }}>
            <Text style={styles.hint}>From client payments</Text>
            <Text style={{ fontFamily: fonts.mono, color: palette.text, marginTop: 4 }}>{inr(SUMMARY.clientPayments)}</Text>
          </View>
          <View style={{ flex: 1, paddingTop: 12 }}>
            <Text style={styles.hint}>From deposits/other</Text>
            <Text style={{ fontFamily: fonts.mono, color: palette.text, marginTop: 4 }}>{inr(SUMMARY.deposits)}</Text>
          </View>
        </View>
      </View>
      <SectionHead title="Revenue by project" right="FY 2026–27"/>
      {REVENUE_BARS.map((b) => (<BarRow key={b.name} name={b.name} value={inr(b.amount)} width={b.width}/>))}
      <SectionHead title="Revenue entries" right="from the ledger"/>
      <View style={styles.card}>
        {income.length === 0 ? (<Text style={{ textAlign: 'center', color: palette.muted2, padding: 20, fontFamily: fonts.sans }}>No revenue entries logged yet.</Text>) : (income.map((tx, i) => (<View key={tx.id} style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 14, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: palette.border }}>
              <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: palette.greenSoft, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="arrow-down" size={16} color={palette.green}/>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: fonts.sansBold, color: palette.text }}>{tx.description}</Text>
                <Text style={styles.muted}>{tx.detail} · {tx.project}</Text>
              </View>
              <Text style={{ fontFamily: fonts.mono, color: palette.green }}>{signedInr(tx.amount)}</Text>
            </View>)))}
      </View>
    </View>);
}
export function GstScreen() {
    useMainHeader();
    const { styles, palette } = useStyles();
    return (<View style={styles.screen}>
      <SectionHead title="GST filing" right="FY 2026–27"/>
      <View style={[styles.card, { padding: 18 }]}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>Net GST liability</Text>
            <Text style={{ fontFamily: fonts.serif, fontSize: 22, color: palette.text, marginTop: 5 }}>{inr(GST.liability)}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.label}>Due date</Text>
            <Text style={{ fontFamily: fonts.serif, fontSize: 14, color: palette.gold, marginTop: 8 }}>{GST.due}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: palette.border, marginTop: 15, paddingTop: 13, gap: 16 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.hint}>Output tax</Text>
            <Text style={{ fontFamily: fonts.sansBold, color: palette.text, marginTop: 2 }}>{inr(GST.output)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.hint}>Input credit</Text>
            <Text style={{ fontFamily: fonts.sansBold, color: palette.text, marginTop: 2 }}>{inr(GST.itc)}</Text>
          </View>
        </View>
      </View>
      <SectionHead title="Per-partner filing" right="4 partners"/>
      <View style={styles.card}>
        {GST.rows.map((row, i) => (<View key={row.gstin} style={{ padding: 16, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: palette.border }}>
            <View style={styles.rowBetween}>
              <View>
                <Text style={{ fontFamily: fonts.sansBold, fontSize: 14, color: palette.text }}>{row.name}</Text>
                <Text style={{ fontFamily: fonts.mono, fontSize: 11, color: palette.muted2, marginTop: 2 }}>{row.gstin}</Text>
              </View>
              <Text style={[styles.pill, { backgroundColor: row.status === 'filed' ? palette.greenSoft : palette.goldSoft, color: row.status === 'filed' ? palette.green : palette.gold }]}>
                {row.status}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 20, marginTop: 12 }}>
              <View>
                <Text style={styles.hint}>Liability</Text>
                <Text style={{ fontFamily: fonts.sansBold, color: palette.text, marginTop: 2 }}>{inr(row.liability)}</Text>
              </View>
              <View>
                <Text style={styles.hint}>ITC claimed</Text>
                <Text style={{ fontFamily: fonts.sansBold, color: palette.text, marginTop: 2 }}>{inr(row.itc)}</Text>
              </View>
            </View>
          </View>))}
      </View>
    </View>);
}
export function ReportsScreen() {
    useMainHeader();
    const { styles, palette } = useStyles();
    const { showToast } = useStore();
    const [fy, setFy] = useState('2026');
    const report = FY_REPORTS[fy];
    return (<View style={styles.screen}>
      <SectionHead title="Reports" right="By financial year"/>
      <View style={{ flexDirection: 'row', marginBottom: 14 }}>
        {Object.entries(FY_REPORTS).map(([key, value]) => (<Chip key={key} label={value.label} active={fy === key} onPress={() => setFy(key)}/>))}
      </View>
      <View style={[styles.card, { paddingHorizontal: 16, paddingVertical: 8 }]}>
        <Line label="Total revenue" value={inr(report.revenue)}/>
        <Line label="Total expenses" value={inr(report.expenses)}/>
        <Line label="Net profit" value={signedInr(report.profit)} emphasize color={report.profit >= 0 ? palette.green : palette.clay}/>
      </View>
      <SectionHead title="Partner-wise P&L" right={report.label}/>
      <View style={[styles.card, { padding: 14 }]}>
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          {['Partner', 'Invested', 'Share', 'Net P&L'].map((h, idx) => (<Text key={h} style={[styles.hint, { flex: idx === 0 ? 1.4 : 1, textAlign: idx === 0 ? 'left' : 'right' }]}>{h}</Text>))}
        </View>
        {report.partners.map((p) => (<View key={p.name} style={{ flexDirection: 'row', paddingVertical: 10, borderTopWidth: 1, borderTopColor: palette.border }}>
            <Text style={{ flex: 1.4, fontFamily: fonts.sansSemi, fontSize: 12, color: palette.text }}>{p.name}</Text>
            <Text style={{ flex: 1, textAlign: 'right', fontFamily: fonts.mono, fontSize: 10.5, color: palette.text }}>{p.invested}</Text>
            <Text style={{ flex: 1, textAlign: 'right', fontFamily: fonts.sansSemi, fontSize: 12, color: palette.text }}>{p.share}</Text>
            <Text style={{ flex: 1, textAlign: 'right', fontFamily: fonts.mono, fontSize: 10.5, color: p.positive ? palette.green : palette.clay }}>{p.pl}</Text>
          </View>))}
      </View>
      <Pressable onPress={() => showToast('Export is a demo in this prototype')} style={{ borderWidth: 1, borderColor: palette.borderStrong, borderRadius: 4, paddingVertical: 13, alignItems: 'center', marginTop: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Icon name="download" size={16} color={palette.text}/>
          <Text style={{ fontFamily: fonts.sansBold, color: palette.text }}>Export FY report</Text>
        </View>
      </Pressable>
    </View>);
}
function Line({ label, value, emphasize, color }) {
    const { palette } = useTheme();
    return (<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: emphasize ? 1 : 0, borderTopColor: palette.borderStrong }}>
      <Text style={{ fontFamily: emphasize ? fonts.sansBold : fonts.sansSemi, color: emphasize ? palette.text : palette.muted, fontSize: emphasize ? 14.5 : 13.5 }}>{label}</Text>
      <Text style={{ fontFamily: fonts.mono, color: color ?? palette.text, fontSize: emphasize ? 14.5 : 13.5 }}>{value}</Text>
    </View>);
}
