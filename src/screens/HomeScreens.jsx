import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SUMMARY, INVESTMENT_BARS } from '../data';
import { inr, signedInr } from '../format';
import { useStore } from '../store';
import { useTheme } from '../ThemeContext';
import { useBackHeader, useMainHeader } from '../components/AppHeader';
import { AddButton, Avatar, BackRow, BarRow, fonts, Icon, SectionHead, useStyles } from '../ui';
function HeroStat({ label, value, color }) {
    const { palette } = useTheme();
    return (<View style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 4 }}>
      <Text style={{ fontFamily: fonts.sansBold, fontSize: 10.5, color: palette.muted2, letterSpacing: 0.4, textTransform: 'uppercase' }}>{label}</Text>
      <Text style={{ fontFamily: fonts.sansBold, fontSize: 15, color: color ?? palette.text, marginTop: 4, letterSpacing: -0.2 }}>{value}</Text>
    </View>);
}
export function DashboardScreen() {
    useMainHeader();
    const { palette, styles } = useStyles();
    const navigation = useNavigation();
  const { capital, projects, selectProject } = useStore();
    return (<View style={styles.screen}>
      <View style={[styles.card, { padding: 20, marginBottom: 8 }]}>
        <Text style={styles.label}>Total capital invested</Text>
        <Text style={styles.big}>{inr(capital)}</Text>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: palette.border, marginTop: 16 }}>
          <HeroStat label="Revenue (FY)" value={inr(SUMMARY.revenue)}/>
          <HeroStat label="Net profit (FY)" value={signedInr(SUMMARY.profit)} color={palette.green}/>
        </View>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: palette.border }}>
          <HeroStat label="Expenses (FY)" value={inr(SUMMARY.expenses)}/>
          <HeroStat label="Active projects" value={String(SUMMARY.activeProjects)}/>
        </View>
      </View>

      <SectionHead title="Investment by partner" right="4 partners"/>
      {INVESTMENT_BARS.map((b) => (<BarRow key={b.name} name={b.name} value={`${b.pct}%`} width={b.pct}/>))}

      <SectionHead title="Projects" right="tap to open"/>
      <View style={styles.card}>
        {projects.map((p, i) => (<Pressable key={p.id} onPress={() => { selectProject(p.id); navigation.navigate('ProjectDetail'); }} style={{ paddingVertical: 16, paddingHorizontal: 14, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: palette.border }}>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.name}>{p.title}</Text>
                <Text style={[styles.muted, { marginTop: 2 }]}>{p.location}</Text>
              </View>
              <Text style={[styles.pill, { backgroundColor: p.status === 'ongoing' ? palette.greenSoft : palette.claySoft, color: p.status === 'ongoing' ? palette.green : palette.clay }]}>
                {p.status === 'ongoing' ? 'Ongoing' : 'On hold'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 20, marginTop: 13 }}>
              <View>
                <Text style={styles.hint}>Invested</Text>
                <Text style={{ fontFamily: fonts.sansBold, color: palette.text, marginTop: 2 }}>{inr(p.invested)}</Text>
              </View>
              <View>
                <Text style={styles.hint}>P&L</Text>
                <Text style={{ fontFamily: fonts.mono, color: p.profit >= 0 ? palette.green : palette.clay, marginTop: 2 }}>{signedInr(p.profit)}</Text>
              </View>
            </View>
          </Pressable>))}
      </View>
    </View>);
}
export function PartnersScreen() {
    useMainHeader();
    const { styles, palette } = useStyles();
    const navigation = useNavigation();
  const { partners, selectPartner, openPartnerSheet } = useStore();
    return (<View style={styles.screen}>
      <SectionHead title="Partners" right={<AddButton label="+ Add partner" onPress={() => openPartnerSheet('global')}/>}/>
      <View style={styles.card}>
        {partners.map((p, i) => (<Pressable key={p.id} onPress={() => { selectPartner(p.id); navigation.navigate('PartnerDetail'); }} style={{ flexDirection: 'row', gap: 13, alignItems: 'center', paddingVertical: 16, paddingHorizontal: 14, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: palette.border }}>
            <Avatar initials={p.initials} color={p.color}/>
            <View style={{ flex: 1 }}>
              <View style={styles.rowBetween}>
                <Text style={{ fontFamily: fonts.sansBold, fontSize: 14, color: palette.text }}>{p.name}</Text>
                <Text style={styles.muted}>{p.shareLabel ?? `${p.projectCount} project${p.projectCount === 1 ? '' : 's'}`}</Text>
              </View>
              <View style={[styles.rowBetween, { marginTop: 8 }]}>
                <Text style={{ fontFamily: fonts.mono, fontSize: 12.5, color: palette.muted }}>Invested {inr(p.invested)}</Text>
                <Text style={{ fontFamily: fonts.mono, fontSize: 12.5, color: p.joinedLabel ? palette.muted : p.pl >= 0 ? palette.green : palette.clay }}>
                  {p.joinedLabel ? 'New' : signedInr(p.pl)}
                </Text>
              </View>
              {p.joinedLabel ? (<Text style={{ fontFamily: fonts.sansSemi, fontSize: 10.5, color: palette.muted2, marginTop: 4 }}>
                  Joined {p.joinedLabel} · active {p.fyActivePct}% of this FY, prorated
                </Text>) : null}
            </View>
          </Pressable>))}
      </View>
    </View>);
}
export function LedgerScreen() {
    useMainHeader();
    const { styles, palette } = useStyles();
    const { transactions, projects, ledgerProject, setLedgerProject } = useStore();
    const names = ['all', ...projects.map((p) => p.title)];
    const visible = transactions.filter((t) => ledgerProject === 'all' || t.project === ledgerProject);
    const groups = [];
    visible.forEach((tx) => {
        const label = tx.date;
        const last = groups[groups.length - 1];
        if (last && last.label === label)
            last.rows.push(tx);
        else
            groups.push({ label, rows: [tx] });
    });
    return (<View style={styles.screen}>
      <SectionHead title="Transactions" right={ledgerProject === 'all' ? 'All projects' : ledgerProject}/>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
        {names.map((name) => {
            const active = ledgerProject === name;
            return (<Pressable key={name} onPress={() => setLedgerProject(name)} style={{
                    borderWidth: 1,
                    borderColor: active ? palette.text : palette.borderStrong,
                    backgroundColor: active ? palette.text : 'transparent',
                    borderRadius: 20,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                }}>
              <Text style={{ color: active ? palette.onAccent : palette.muted, fontFamily: fonts.sansSemi, fontSize: 12 }}>
                {name === 'all' ? 'All projects' : name}
              </Text>
            </Pressable>);
        })}
      </View>
      {groups.length === 0 ? (<Text style={{ textAlign: 'center', color: palette.muted2, marginTop: 30, fontFamily: fonts.sans }}>No transactions for this project yet.</Text>) : (groups.map((g) => (<View key={g.label}>
            <Text style={[styles.hint, { marginTop: 16, marginBottom: 6 }]}>
              {new Date(g.label + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </Text>
            <View style={styles.card}>
              {g.rows.map((tx, i) => {
                const inflow = tx.amount >= 0;
                return (<View key={tx.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 13, paddingHorizontal: 14, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: palette.border }}>
                    <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: inflow ? palette.greenSoft : palette.claySoft, alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={inflow ? 'arrow-down' : 'arrow-up'} size={16} color={inflow ? palette.green : palette.clay}/>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontFamily: fonts.sansBold, fontSize: 13.5, color: palette.text }}>{tx.description}</Text>
                      <Text style={[styles.muted, { marginTop: 2 }]}>{tx.detail.includes(tx.project) ? tx.detail : `${tx.detail} · ${tx.project}`}</Text>
                    </View>
                    <Text style={{ fontFamily: fonts.mono, fontSize: 13, color: inflow ? palette.green : palette.clay }}>{signedInr(tx.amount)}</Text>
                  </View>);
            })}
            </View>
          </View>)))}
    </View>);
}
export function ProjectDetailScreen() {
    const { styles, palette } = useStyles();
    const navigation = useNavigation();
    const { projects, activeProjectId, setLedgerProject, openPartnerSheet } = useStore();
    const project = projects.find((p) => p.id === activeProjectId);
    useBackHeader(project?.title ?? 'Project');
    if (!project)
        return null;
    return (<View style={styles.screen}>
      <View style={[styles.card, { padding: 18, marginBottom: 8 }]}>
        <Text style={styles.label}>{project.locDetail}</Text>
        <View style={{ borderTopWidth: 1, borderTopColor: palette.border, marginTop: 12 }}>
          <HeroStat label="Total invested to date" value={inr(project.invested)}/>
        </View>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: palette.border }}>
          <HeroStat label="Cumulative revenue" value={inr(project.revenue)}/>
          <HeroStat label="Cumulative expenses" value={inr(project.expenses)}/>
        </View>
        <View style={{ borderTopWidth: 1, borderTopColor: palette.border }}>
          <HeroStat label="Net profit — life of project" value={signedInr(project.profit)} color={project.profit >= 0 ? palette.green : palette.clay}/>
        </View>
      </View>
      <SectionHead title="Partners in this project" right={<View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={styles.hint}>{project.partners.length} partners</Text>
            <AddButton label="+ Add" onPress={() => openPartnerSheet('project')}/>
          </View>}/>
      <View style={styles.card}>
        {project.partners.map((p, i) => (<View key={p.name + i} style={{ flexDirection: 'row', gap: 12, paddingVertical: 14, paddingHorizontal: 14, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: palette.border }}>
            <Avatar initials={p.initials} color={p.color}/>
            <View style={{ flex: 1 }}>
              <View style={styles.rowBetween}>
                <Text style={{ fontFamily: fonts.sansBold, color: palette.text }}>{p.name}</Text>
                <Text style={styles.muted}>{p.pct}% of this project</Text>
              </View>
              <View style={[styles.rowBetween, { marginTop: 8 }]}>
                <Text style={{ fontFamily: fonts.mono, color: palette.muted, fontSize: 12.5 }}>Invested {inr(p.invested)}</Text>
                <Text style={{ fontFamily: fonts.mono, color: p.pl >= 0 ? palette.green : palette.clay }}>{signedInr(p.pl)}</Text>
              </View>
            </View>
          </View>))}
      </View>
      <SectionHead title="Year-by-year P&L" right={`${project.years.length} year${project.years.length === 1 ? '' : 's'}`}/>
      <View style={[styles.card, { padding: 14 }]}>
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          {['FY', 'Revenue', 'Expenses', 'Profit'].map((h, idx) => (<Text key={h} style={[styles.hint, { flex: idx === 0 ? 1.2 : 1, textAlign: idx === 0 ? 'left' : 'right' }]}>{h}</Text>))}
        </View>
        {project.years.map((y) => (<View key={y.fy} style={{ flexDirection: 'row', paddingVertical: 10, borderTopWidth: 1, borderTopColor: palette.border }}>
            <Text style={{ flex: 1.2, fontFamily: fonts.sansSemi, fontSize: 12, color: palette.text }}>{y.fy}</Text>
            <Text style={{ flex: 1, textAlign: 'right', fontFamily: fonts.mono, fontSize: 11, color: palette.text }}>{inr(y.rev)}</Text>
            <Text style={{ flex: 1, textAlign: 'right', fontFamily: fonts.mono, fontSize: 11, color: palette.text }}>{inr(y.exp)}</Text>
            <Text style={{ flex: 1, textAlign: 'right', fontFamily: fonts.mono, fontSize: 11, color: y.profit >= 0 ? palette.green : palette.clay }}>{signedInr(y.profit)}</Text>
          </View>))}
      </View>
      <Text style={{ fontFamily: fonts.sans, fontSize: 11.5, color: palette.muted2, lineHeight: 18, marginTop: 10 }}>
        Each project keeps its own partner roster and split. Profit is revenue minus expenses for each financial year.
      </Text>
      <Pressable onPress={() => {
            setLedgerProject(project.title);
            navigation.navigate('Tabs', { screen: 'Ledger' });
        }} style={{ borderWidth: 1, borderColor: palette.borderStrong, borderRadius: 4, paddingVertical: 13, alignItems: 'center', marginTop: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ fontFamily: fonts.sansBold, color: palette.text }}>View this project's transactions</Text>
          <Icon name="arrow-right" size={16} color={palette.text}/>
        </View>
      </Pressable>
    </View>);
}
export function PartnerDetailScreen() {
    const { styles, palette } = useStyles();
    const navigation = useNavigation();
    const { partners, projects, activePartnerId } = useStore();
    const partner = partners.find((p) => p.id === activePartnerId);
    if (!partner)
        return null;
    const involvement = projects.flatMap((proj) => {
        const match = proj.partners.find((x) => x.name === partner.name);
        return match ? [{ title: proj.title, ...match }] : [];
    });
    const rows = involvement.length > 0
        ? involvement
        : partner.id === 'dev'
            ? [{ title: 'Koramangala Retail Block', pct: 0, invested: 824000, pl: -23000, name: partner.name, initials: partner.initials, color: partner.color }]
            : [];
    const totalInvested = rows.reduce((s, x) => s + x.invested, 0) || partner.invested;
    const totalPl = rows.reduce((s, x) => s + x.pl, 0) || partner.pl;
    return (<View style={styles.screen}>
      <BackRow title="Partner" onPress={() => navigation.navigate('Tabs', { screen: 'Partners' })}/>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <Avatar initials={partner.initials} color={partner.color} size={68}/>
        <Text style={{ fontFamily: fonts.serif, fontSize: 19, color: palette.text, marginTop: 12 }}>{partner.name}</Text>
        <Text style={{ fontFamily: fonts.sansSemi, color: palette.muted, marginTop: 3 }}>{partner.role}</Text>
      </View>
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: palette.border }}>
        <HeroStat label="Total invested" value={inr(totalInvested)}/>
        <HeroStat label="Net P&L, all projects" value={signedInr(totalPl)} color={totalPl >= 0 ? palette.green : palette.clay}/>
      </View>
      <SectionHead title="Projects" right={`${rows.length} project${rows.length === 1 ? '' : 's'}`}/>
      <View style={styles.card}>
        {rows.length === 0 ? (<Text style={{ padding: 16, color: palette.muted2, fontFamily: fonts.sans }}>Not yet allocated to a project.</Text>) : (rows.map((x, i) => (<View key={x.title} style={{ padding: 14, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: palette.border }}>
              <Text style={styles.name}>{x.title}</Text>
              <Text style={styles.muted}>{x.pct ? `${x.pct}% share` : 'Share pending'}</Text>
              <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
                <View>
                  <Text style={styles.hint}>Invested</Text>
                  <Text style={{ fontFamily: fonts.sansBold, color: palette.text, marginTop: 2 }}>{inr(x.invested)}</Text>
                </View>
                <View>
                  <Text style={styles.hint}>P&L</Text>
                  <Text style={{ fontFamily: fonts.mono, color: x.pl >= 0 ? palette.green : palette.clay, marginTop: 2 }}>{signedInr(x.pl)}</Text>
                </View>
              </View>
            </View>)))}
      </View>
    </View>);
}
