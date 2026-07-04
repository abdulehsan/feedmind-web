const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export async function getFeed(limit = 20) {
    const res = await fetch(`${BASE_URL}/api/feed?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch feed');
    return res.json(); // { items: [...] }
}

export async function sendMessage(message, history = []) {
    const res = await fetch(`${BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history }),
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json(); // { response, sources }
}
