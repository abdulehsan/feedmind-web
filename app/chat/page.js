'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { sendMessage } from '../../lib/api';

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { role: 'user', content: input.trim() };
        const history = messages.map(m => ({ role: m.role, content: m.content }));

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const data = await sendMessage(userMessage.content, history);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response,
                sources: data.sources,
            }]);
        } catch (err) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Something went wrong. Please try again.',
                sources: [],
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div style={{ padding: '0 40px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 72px)' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>Chat</h1>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Ask anything about recent AI & tech
                </p>
            </div>

            {/* Messages */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                paddingBottom: '16px',
            }}>
                {messages.length === 0 && (
                    <div style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', marginTop: '80px' }}>
                        Ask something like &quot;What&apos;s new with GPT-5?&quot; or &quot;Any updates on open source models?&quot;
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div key={i}>
                        {/* Role label */}
                        <div style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: msg.role === 'user' ? 'var(--accent)' : 'var(--text-muted)',
                            marginBottom: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                        }}>
                            {msg.role === 'user' ? 'You' : 'FeedMind'}
                        </div>

                        {/* Content */}
                        {msg.role === 'assistant' ? (
                            <div className="prose-dark">
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                        ) : (
                            <div style={{
                                fontSize: '14px',
                                color: 'var(--text-primary)',
                                lineHeight: '1.7',
                                whiteSpace: 'pre-wrap',
                            }}>
                                {msg.content}
                            </div>
                        )}

                        {/* Sources */}
                        {msg.sources && msg.sources.length > 0 && (
                            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Sources
                                </div>
                                {msg.sources.map(source => (
                                    <a
                                        key={source.number}
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            fontSize: '13px',
                                            color: 'var(--text-secondary)',
                                            textDecoration: 'none',
                                            padding: '8px 12px',
                                            backgroundColor: 'var(--bg-card)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '8px',
                                            transition: 'border-color 0.15s ease',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                                    >
                                        <span style={{
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            color: 'var(--accent)',
                                            minWidth: '20px',
                                        }}>
                                            [{source.number}]
                                        </span>
                                        <span style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {source.title}
                                        </span>
                                        <span style={{
                                            marginLeft: 'auto',
                                            fontSize: '11px',
                                            color: 'var(--text-muted)',
                                            textTransform: 'uppercase',
                                            flexShrink: 0,
                                        }}>
                                            {source.source_type}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {loading && (
                    <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                        Thinking...
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
                display: 'flex',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border)',
            }}>
                <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about recent AI & tech..."
                    rows={1}
                    style={{
                        flex: 1,
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        resize: 'none',
                        outline: 'none',
                        fontFamily: 'inherit',
                        lineHeight: '1.5',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    style={{
                        backgroundColor: loading || !input.trim() ? 'var(--bg-hover)' : 'var(--accent)',
                        color: loading || !input.trim() ? 'var(--text-muted)' : '#0E1217',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                        transition: 'all 0.15s ease',
                        whiteSpace: 'nowrap',
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}