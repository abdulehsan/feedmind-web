'use client';
import { useState } from 'react';

/* ── Source-type metadata ─────────────────────────────────────── */
function RssIcon({ color }) {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1" fill={color} stroke="none" />
        </svg>
    );
}

function RedditIcon({ color }) {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill={color}>
            <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />
            <path d="M16.5 11.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5" stroke={color} strokeWidth="1.5" fill="none" />
            <path d="M7.5 11.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5" stroke={color} strokeWidth="1.5" fill="none" />
            <path d="M9.5 16c.7.5 1.5.8 2.5.8s1.8-.3 2.5-.8" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="9.5" cy="12.5" r="1.2" fill={color} />
            <circle cx="14.5" cy="12.5" r="1.2" fill={color} />
            <path d="M12 8c1 0 2-.4 2.5-1l1.2.6" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
    );
}

function GlobeIcon({ color }) {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}

const SOURCE_META = {
    rss:    { label: 'RSS',    color: 'var(--source-rss)',    Icon: RssIcon },
    reddit: { label: 'Reddit', color: 'var(--source-reddit)', Icon: RedditIcon },
    web:    { label: 'Web',    color: 'var(--source-web)',    Icon: GlobeIcon },
};

/* ── FeedCard ─────────────────────────────────────────────────── */
export default function FeedCard({ item }) {
    const [hovered, setHovered] = useState(false);

    const meta = SOURCE_META[item.source_type] ?? {
        label: item.source_type ?? 'Unknown',
        color: 'var(--text-muted)',
        Icon: GlobeIcon,
    };
    const { label, color, Icon } = meta;

    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'block',
                backgroundColor: 'var(--bg-card)',
                border: `1px solid ${hovered ? 'rgba(0, 255, 148, 0.3)' : 'var(--border)'}`,
                borderRadius: '14px',
                padding: '22px 26px 24px',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
                boxShadow: hovered
                    ? '0 0 0 1px rgba(0, 255, 148, 0.08), 0 6px 28px rgba(0, 0, 0, 0.45)'
                    : '0 1px 3px rgba(0, 0, 0, 0.25)',
            }}
        >
            {/* Source row: icon + label */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                marginBottom: '11px',
            }}>
                <Icon color={color} />
                <span style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    lineHeight: 1,
                }}>
                    {label}
                </span>
            </div>

            {/* Title — always 2-line clamped */}
            <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                lineHeight: '1.45',
                marginBottom: '10px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                letterSpacing: '-0.01em',
            }}>
                {item.title}
            </h3>

            {/* Summary — 3-line default, expands on hover */}
            {item.summary && (
                <p style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.7',
                    display: '-webkit-box',
                    WebkitLineClamp: hovered ? 'unset' : 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: hovered ? 'visible' : 'hidden',
                    transition: 'color 0.18s ease',
                    ...(hovered && { color: 'var(--text-primary)', display: 'block' }),
                }}>
                    {item.summary}
                </p>
            )}

            {/* Source pill — bottom-right, visible on hover only */}
            <div style={{
                marginTop: '16px',
                display: 'flex',
                justifyContent: 'flex-end',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.18s ease',
            }}>
                <span style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    border: '1px solid var(--border)',
                    letterSpacing: '0.02em',
                }}>
                    {(() => { try { return new URL(item.url).hostname.replace('www.', ''); } catch { return ''; } })()}
                </span>
            </div>
        </a>
    );
}