'use client'
import { useState } from 'react'

const MailingListForm = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    setLoading(false)
    if (res.ok) {
      setSuccess(true)
      setEmail('')
      setTimeout(() => setSuccess(false), 3000)
    } else {
      setSuccess(false)
    }
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-lg max-w-md mx-auto"
    >
      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        className="flex-1 px-4 py-2 rounded-md border border-white/30 bg-transparent text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 rounded-md bg-amber-400 hover:bg-amber-500 text-white font-semibold transition disabled:opacity-50"
      >
        {loading ? 'Joining...' : 'Join'}
      </button>
    </form>
  )
}

export default MailingListForm
