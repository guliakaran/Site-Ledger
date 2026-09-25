export function inr(n) {
    return '₹' + Math.abs(Math.round(n)).toLocaleString('en-IN');
}
export function signedInr(n) {
    return (n >= 0 ? '+' : '−') + inr(n);
}
export function initials(name) {
    return name
        .trim()
        .split(/\s+/)
        .map((w) => w[0] ?? '')
        .slice(0, 2)
        .join('')
        .toUpperCase();
}
export function shortDate(iso) {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}
export function longDate(iso) {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
/** Indian FY is 1 Apr–31 Mar. Returns how much of the year remains after joinDate, as a percent. */
export function fyProration(joinIso) {
    const joinDate = new Date(joinIso + 'T00:00:00');
    const fyStart = joinDate.getMonth() >= 3
        ? new Date(joinDate.getFullYear(), 3, 1)
        : new Date(joinDate.getFullYear() - 1, 3, 1);
    const fyEnd = new Date(fyStart.getFullYear() + 1, 2, 31);
    const totalDays = Math.round((fyEnd.getTime() - fyStart.getTime()) / 86400000) + 1;
    const daysActive = Math.round((fyEnd.getTime() - joinDate.getTime()) / 86400000) + 1;
    return Math.max(1, Math.min(100, Math.round((daysActive / totalDays) * 100)));
}
export function todayIso() {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
}
