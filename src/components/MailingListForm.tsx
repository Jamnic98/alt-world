'use client'

import { useState } from 'react'

const MailingListForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !lastName || !email) return

    setLoading(true)
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email }),
    })

    setLoading(false)
    if (res.ok) {
      setSuccess(true)
      setFirstName('')
      setLastName('')
      setEmail('')
      setTimeout(() => setSuccess(false), 3000)
    } else {
      setSuccess(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3">
      {/* First row: First + Last Name */}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="flex-1 min-w-0 px-3 py-2 rounded-md border border-white/30 bg-transparent text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="flex-1 min-w-0 px-3 py-2 rounded-md border border-white/30 bg-transparent text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        />
      </div>

      {/* Second row: Email + Button */}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 min-w-0 px-3 py-2 rounded-md border border-white/30 bg-transparent text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex-shrink-0 w-full sm:w-auto px-6 py-2 rounded-md bg-amber-400 hover:bg-amber-500 cursor-pointer text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? 'Joining...' : 'Join'}
        </button>
      </div>
    </form>
  )
}

export default MailingListForm
