'use client';

import { useEffect, useState } from 'react';
import FeedCard from '../components/FeedCard';
import { getFeed } from '../lib/api';

export default function FeedPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFeed(20)
      .then(data => setItems(data.items))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: '720px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
          Feed
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Latest AI & tech updates, curated 4× daily
        </p>
      </div>

      {/* States */}
      {loading && (
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Loading...</p>
      )}
      {error && (
        <p style={{ color: 'var(--source-rss)', fontSize: '14px' }}>Error: {error}</p>
      )}

      {/* Cards */}
      {!loading && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No items yet.</p>
          ) : (
            items.map(item => <FeedCard key={item.id} item={item} />)
          )}
        </div>
      )}
    </div>
  );
}