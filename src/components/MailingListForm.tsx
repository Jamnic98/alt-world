'use client'

import { useState } from 'react'

interface MailingListFormProps {
  title?: string
}

const MailingListForm = ({ title }: MailingListFormProps) => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !lastName || !email) return

    setLoading(true)
    try {
      const res = await fetch('/api/mailingList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email }),
      })

      if (res.ok) {
        setSuccess(true)
        setFirstName('')
        setLastName('')
        setEmail('')
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setSuccess(false)
      }
    } catch (err) {
      setSuccess(false)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3">
      {title && <h1 className="text-xl font-semibold mb-2">{title}</h1>}

      {success && <p className="text-green-400">Successfully joined!</p>}

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
          className="shrink-0 w-full sm:w-auto px-6 py-2 rounded-md bg-amber-400 hover:bg-amber-500 cursor-pointer text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? 'Joining...' : 'Join'}
        </button>
      </div>
    </form>
  )
}

export default MailingListForm
