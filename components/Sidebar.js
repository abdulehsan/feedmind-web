'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    {
        label: 'Feed',
        href: '/',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
    },
    {
        label: 'Chat',
        href: '/chat',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside style={{
            width: '240px',
            minHeight: '100vh',
            backgroundColor: 'var(--bg-card)',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 12px',
            position: 'fixed',
            top: 0,
            left: 0,
        }}>
            {/* Logo */}
            <div style={{ padding: '0 12px 32px' }}>
                <span style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: 'var(--accent)',
                    letterSpacing: '-0.5px',
                }}>
                    FeedMind
                </span>
            </div>

            {/* Nav */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: active ? '600' : '400',
                            color: active ? 'var(--accent)' : 'var(--text-secondary)',
                            backgroundColor: active ? 'rgba(0, 255, 148, 0.08)' : 'transparent',
                            transition: 'all 0.15s ease',
                        }}>
                            {item.icon}
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div style={{
                marginTop: 'auto',
                padding: '12px',
                fontSize: '12px',
                color: 'var(--text-muted)',
            }}>
                Updates 4× daily
            </div>
        </aside>
    );
}