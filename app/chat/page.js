'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { sendMessage } from '../../lib/api';

const SUGGESTION_CHIPS = [
    "What's new with GPT-5?",
    "Any updates on open source models?",
    "Compare the latest reasoning models",
    "What's happening in AI safety research?",
];

/* Chat bubble icon */
function ChatBubbleIcon() {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    );
}

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);
    const textareaRef = useRef(null);

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

    const handleChipClick = (text) => {
        setInput(text);
        textareaRef.current?.focus();
    };

    const disabled = loading || !input.trim();

    return (
        <div style={{ padding: '0 40px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 72px)' }}>

            {/* ── Messages ──────────────────────────────────────────── */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                paddingTop: '24px',
                paddingBottom: '16px',
            }}>
                {/* Empty state */}
                {messages.length === 0 && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '80px',
                        gap: '16px',
                    }}>
                        {/* Icon */}
                        <div style={{ opacity: 0.8 }}>
                            <ChatBubbleIcon />
                        </div>

                        {/* Headline */}
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center' }}>
                            Ask anything about recent AI &amp; tech
                        </p>

                        {/* Suggestion chips */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '4px',
                            maxWidth: '560px',
                        }}>
                            {SUGGESTION_CHIPS.map(text => (
                                <button
                                    key={text}
                                    onClick={() => handleChipClick(text)}
                                    style={{
                                        backgroundColor: 'var(--bg-card)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '999px',
                                        padding: '7px 16px',
                                        fontSize: '13px',
                                        color: 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        fontFamily: 'inherit',
                                        transition: 'border-color 0.15s ease, color 0.15s ease',
                                        whiteSpace: 'nowrap',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = 'var(--accent)';
                                        e.currentTarget.style.color = 'var(--text-primary)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'var(--border)';
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                    }}
                                >
                                    {text}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Message list */}
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
                                        <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--accent)', minWidth: '20px' }}>
                                            [{source.number}]
                                        </span>
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {source.title}
                                        </span>
                                        <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', flexShrink: 0 }}>
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

            {/* ── Input bar — bordered card container ───────────────── */}
            <div style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '12px 12px 12px 16px',
                marginBottom: '16px',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-end',
            }}>
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about recent AI &amp; tech..."
                    rows={1}
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                        padding: '4px 0',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        resize: 'none',
                        fontFamily: 'inherit',
                        lineHeight: '1.6',
                        caretColor: 'var(--accent)',
                    }}
                />
                <button
                    onClick={handleSend}
                    disabled={disabled}
                    style={{
                        backgroundColor: disabled ? 'var(--bg-hover)' : 'var(--accent)',
                        color: disabled ? 'var(--text-muted)' : '#0E1217',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '8px 18px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.15s ease, color 0.15s ease',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        fontFamily: 'inherit',
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}