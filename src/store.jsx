import React, { createContext, useContext, useMemo, useState } from 'react';
import { AVATAR_COLORS, seedPartners, seedProjects, seedSessions, seedTransactions, SUMMARY } from './data';
import { fyProration, initials, longDate } from './format';
const Ctx = createContext(null);
export function StoreProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [screen, setScreen] = useState('dashboard');
    const [lastTab, setLastTab] = useState('dashboard');
    const [capital, setCapital] = useState(SUMMARY.capital);
    const [projects, setProjects] = useState(seedProjects);
    const [partners, setPartners] = useState(seedPartners);
    const [transactions, setTransactions] = useState(seedTransactions);
    const [ledgerProject, setLedgerProject] = useState('all');
    const [activeProjectId, setActiveProjectId] = useState(null);
    const [activePartnerId, setActivePartnerId] = useState(null);
    const [partnerSheet, setPartnerSheet] = useState('closed');
    const [txSheet, setTxSheet] = useState(false);
    const [sessions, setSessions] = useState(seedSessions);
    const [toast, setToast] = useState(null);
    const showToast = (message) => {
        const id = Date.now();
        setToast({ message, id });
        setTimeout(() => setToast((current) => (current?.id === id ? null : current)), 2200);
    };
    const go = (id) => setScreen(id);
    const openTab = (id) => {
        setLastTab(id);
        setScreen(id);
    };
    const value = useMemo(() => ({
        loggedIn,
        login: (email, password) => {
            if (!email.trim() || !password)
                return 'Enter your email and password.';
            setLoggedIn(true);
            return null;
        },
        skipLogin: () => setLoggedIn(true),
        logout: () => {
            setLoggedIn(false);
            setScreen('dashboard');
            setLastTab('dashboard');
        },
        screen,
        lastTab,
        go,
        openTab,
        capital,
        projects,
        partners,
        transactions,
        ledgerProject,
        setLedgerProject,
        activeProjectId,
        openProject: (id) => {
            setActiveProjectId(id);
            setScreen('projectDetail');
        },
        activePartnerId,
        openPartner: (id) => {
            setActivePartnerId(id);
            setScreen('partnerDetail');
        },
        partnerSheet,
        openPartnerSheet: (source) => setPartnerSheet(source),
        closePartnerSheet: () => setPartnerSheet('closed'),
        txSheet,
        setTxSheet,
        addTransaction: ({ description, amount, date, partner, project, gst, type }) => {
            const inflow = type === 'investment' || type === 'income';
            const signed = inflow ? amount : -amount;
            const sub = type === 'investment' ? partner : gst !== '0' ? `Invoice · GST ${gst}%` : 'No GST';
            const row = {
                id: 'tx-' + Date.now(),
                description,
                detail: `${sub} · ${project}`,
                amount: signed,
                type,
                project,
                date,
            };
            setTransactions((list) => [row, ...list]);
            if (type === 'investment')
                setCapital((n) => n + amount);
            setLedgerProject('all');
            setLastTab('ledger');
            setScreen('ledger');
            setTxSheet(false);
            showToast(inflow ? 'Transaction added' : 'Expense logged');
        },
        addPartner: ({ name, join, share, invest, gstin }) => {
            const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
            const ini = initials(name);
            if (partnerSheet === 'project' && activeProjectId) {
                setProjects((list) => list.map((p) => p.id === activeProjectId
                    ? {
                        ...p,
                        invested: p.invested + invest,
                        partners: [...p.partners, { name, initials: ini, color, pct: share, invested: invest, pl: 0 }],
                    }
                    : p));
                const title = projects.find((p) => p.id === activeProjectId)?.title ?? 'project';
                setPartnerSheet('closed');
                showToast(`${name} added to ${title}`);
                return;
            }
            const next = {
                id: 'p-' + Date.now(),
                name,
                initials: ini,
                color,
                role: 'Partner',
                projectCount: 0,
                invested: invest,
                pl: 0,
                shareLabel: `${share}% share`,
                joinedLabel: longDate(join),
                fyActivePct: fyProration(join),
                gstin: gstin || undefined,
            };
            setPartners((list) => [...list, next]);
            setPartnerSheet('closed');
            setLastTab('partners');
            setScreen('partners');
            showToast(`${name} added as a partner`);
        },
        sessions,
        endSession: (id) => {
            setSessions((list) => list.filter((s) => s.id !== id));
            showToast('Session signed out');
        },
        toast,
        showToast,
    }), [
        loggedIn,
        screen,
        lastTab,
        capital,
        projects,
        partners,
        transactions,
        ledgerProject,
        activeProjectId,
        activePartnerId,
        partnerSheet,
        txSheet,
        sessions,
        toast,
    ]);
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useStore() {
    const ctx = useContext(Ctx);
    if (!ctx)
        throw new Error('useStore must be used inside StoreProvider');
    return ctx;
}
