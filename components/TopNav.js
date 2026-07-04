'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
    { label: 'Feed',  href: '/' },
    { label: 'Chat',  href: '/chat' },
];

export default function TopNav() {
    const pathname = usePathname();

    return (
        <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            height: '56px',
            backgroundColor: 'var(--bg-primary)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 32px',
            gap: '24px',
        }}>
            {/* Logo — outside the pill */}
            <Link href="/" style={{
                fontSize: '18px',
                fontWeight: '700',
                color: 'var(--accent)',
                textDecoration: 'none',
                letterSpacing: '-0.5px',
                flexShrink: 0,
                marginRight: '8px',
            }}>
                FeedMind
            </Link>

            {/* Pill nav container */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '999px',
                padding: '4px',
            }}>
                {NAV_LINKS.map(({ label, href }) => {
                    const active = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            style={{
                                display: 'block',
                                padding: '5px 16px',
                                borderRadius: '999px',
                                fontSize: '13px',
                                fontWeight: active ? '600' : '400',
                                color: active ? '#0E1217' : 'var(--text-secondary)',
                                backgroundColor: active ? 'var(--accent)' : 'transparent',
                                textDecoration: 'none',
                                transition: 'background-color 0.15s ease, color 0.15s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {label}
                        </Link>
                    );
                })}
            </div>

            {/* Spacer — pushes future right-side items */}
            <div style={{ flex: 1 }} />
        </header>
    );
}
