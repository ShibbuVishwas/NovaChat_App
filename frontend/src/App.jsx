import { useEffect, useRef, useState } from 'react'
import { sendMessage } from './api/chat'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const isEmpty = messages.length === 0 && !loading

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function handleSend() {
    const text = input.trim()
    if (!text || loading) return

    setMessages((prev) => [...prev, { from: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      const data = await sendMessage(text)
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: data.reply ?? 'No reply' },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: 'Server error. Is the backend running on port 8080?' },
      ])
    } finally {
      setLoading(false)
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="page">
      {/* Full-screen background image (grid + glass orb) */}
      <div className="bg" aria-hidden="true" />

      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">NovaChat</span>
        </div>
        <span className={`status ${loading ? 'busy' : 'ready'}`}>
          {loading ? 'Thinking…' : 'Online'}
        </span>
      </header>

      <main className={`main ${isEmpty ? 'empty' : 'filled'}`}>
        {isEmpty ? (
          <div className="hero">
            <h1>
              Hey!
              <br />
              What can I help with?
            </h1>
            <p className="hero-sub">Connected to Groq · Spring Boot + React</p>
          </div>
        ) : (
          <div className="chat">
            {messages.map((m, i) => (
              <div key={i} className={`row ${m.from}`}>
                <div className="bubble">
                  <pre className="text">{m.text}</pre>
                </div>
              </div>
            ))}

            {loading && (
              <div className="row bot">
                <div className="bubble typing">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </main>

      <footer className="composer-wrap">
        <div className="composer">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask me anything..."
            rows={1}
            disabled={loading}
          />
          <button
            type="button"
            className="send"
            onClick={handleSend}
            disabled={loading || !input.trim()}
            aria-label="Send"
          >
            ↑
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App
