export default function FeedCard({ item }) {
    const sourceColors = {
        rss: 'var(--source-rss)',
        reddit: 'var(--source-reddit)',
        web: 'var(--source-web)',
    };

    const sourceLabels = {
        rss: 'RSS',
        reddit: 'Reddit',
        web: 'Web',
    };

    const color = sourceColors[item.source_type] || 'var(--text-muted)';
    const label = sourceLabels[item.source_type] || item.source_type;

    const timeAgo = (dateStr) => {
        if (!dateStr) return 'Unknown date';
        const diff = Date.now() - new Date(dateStr).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return 'Just now';
    };

    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'block',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '20px',
                textDecoration: 'none',
                transition: 'border-color 0.15s ease, background-color 0.15s ease',
                cursor: 'pointer',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.backgroundColor = 'var(--bg-card)';
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                    {label}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {timeAgo(item.published_at)}
                </span>
            </div>

            {/* Title */}
            <h3 style={{
                fontSize: '15px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                lineHeight: '1.5',
                marginBottom: '8px',
            }}>
                {item.title}
            </h3>

            {/* Summary */}
            {item.summary && (
                <p style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {item.summary}
                </p>
            )}

            {/* Footer */}
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                    fontSize: '12px',
                    color: 'var(--accent)',
                    fontWeight: '500',
                }}>
                    Score: {item.relevance_score?.toFixed(1)}
                </span>
            </div>
        </a>
    );
}