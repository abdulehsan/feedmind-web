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
            <div style={{ marginBottom: '12px' }}>
                <span style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                    {label}
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


        </a>
    );
}