'use client';

import { useEffect, useState } from 'react';
import FeedCard from '../components/FeedCard';
import { getFeed } from '../lib/api';

export default function FeedPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFeed(40)
      .then(data => setItems(data.items))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '32px 40px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Feed
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Latest AI &amp; tech updates, curated 4× daily
        </p>
      </div>

      {/* States */}
      {loading && (
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading...</p>
      )}
      {error && (
        <p style={{ color: 'var(--source-rss)', fontSize: '14px' }}>Error: {error}</p>
      )}

      {/* 2-column grid */}
      {!loading && !error && (
        items.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No items yet.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            alignItems: 'start',      /* cards don't stretch to match sibling height */
          }}>
            {items.map(item => <FeedCard key={item.id} item={item} />)}
          </div>
        )
      )}
    </div>
  );
}